'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { HERO } from '@/lib/data'

const RobotScene = dynamic(() => import('../three/RobotScene'), { ssr: false })

/* ── particle canvas ───────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    let W = 0, H = 0, raf = 0
    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const canvas = cv

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function mkPt() {
      return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.4 + 0.4 }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(63,185,80,0.55)'; ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(63,185,80,${0.13 * (1 - d / 130)})`;  ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    for (let i = 0; i < 60; i++) pts.push(mkPt())
    frame()
    window.addEventListener('resize', () => { resize(); pts.length = 0; for (let i = 0; i < 60; i++) pts.push(mkPt()) })
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
}

/* ── hero ──────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 4.3 + delay, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 items-center overflow-hidden"
      style={{ padding: '120px 5vw 80px' }}
    >
      <ParticleField />

      {/* ── LEFT ── */}
      <div className="relative z-10">
        <motion.div {...fadeUp(0)}>
          <div
            className="inline-flex items-center gap-2 mb-6 px-[14px] py-[5px] rounded-full text-[0.68rem] tracking-[1px]"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)', background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)' }}
          >
            <motion.div className="w-[6px] h-[6px] rounded-full" style={{ background: 'var(--green)' }} animate={{ opacity: [1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} />
            {HERO.chip}
          </div>
        </motion.div>

        <motion.h1 {...fadeUp(0.08)} className="font-bold leading-[1.05] tracking-[-1px] mb-4" style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}>
          {HERO.name}<br />
          <span style={{ color: 'var(--green)' }}>{HERO.surname}</span>
        </motion.h1>

        <motion.div {...fadeUp(0.14)} className="flex items-center gap-[10px] flex-wrap mb-7" style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.75rem', color: 'var(--muted)' }}>
          {HERO.roles.map((r, i) => (
            <span key={r} className="flex items-center gap-[10px]">
              <span style={{ color: 'var(--text)' }}>{r}</span>
              {i < HERO.roles.length - 1 && <span style={{ color: 'var(--border2)' }}>/</span>}
            </span>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.2)} className="mb-8 font-light leading-[1.85]" style={{ fontSize: '0.97rem', color: 'var(--muted)', maxWidth: 480 }}>
          I build things that <strong style={{ color: 'var(--text)', fontWeight: 500 }}>move, sense, and react.</strong> From competition robots at national level to smart hydroponics — driven by the idea that engineering should be creative, bold, and a little obsessive.
        </motion.p>

        {/* stats */}
        <motion.div {...fadeUp(0.26)} className="flex gap-5 flex-wrap mb-9">
          {HERO.stats.map(s => (
            <div key={s.label} className="rounded-[6px] px-5 py-[14px] min-w-[110px] transition-all duration-300 hover:border-[var(--border2)]" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-mono-var)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--green)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.68rem', color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.32)} className="flex gap-[10px] flex-wrap">
          <a href="#projects" className="inline-block rounded-[6px] px-5 py-2 text-[0.72rem] tracking-[0.5px] font-semibold transition-all duration-200 no-underline" style={{ fontFamily: 'var(--font-mono-var)', background: 'var(--green)', color: '#0d1117', border: '1px solid var(--green)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#46d058'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(63,185,80,0.35)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--green)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
          >
            view projects
          </a>
          <a href="/journal" className="inline-block rounded-[6px] px-5 py-2 text-[0.72rem] tracking-[0.5px] transition-all duration-200 no-underline" style={{ fontFamily: 'var(--font-mono-var)', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            read journal
          </a>
        </motion.div>
      </div>

      {/* ── RIGHT — 3D robot ── */}
      <motion.div
        className="relative z-10 hidden md:flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 4.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-[460px] rounded-[8px] overflow-hidden" style={{ aspectRatio: '4/5', background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <RobotScene />
        </div>
      </motion.div>
    </section>
  )
}
