'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ABOUT } from '@/lib/data'

function SectionHeader({ num, tag, title, accent, sub }: { num: string; tag: string; title: string; accent: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-[10px] text-[0.68rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>
        <span className="px-2 py-[2px] rounded-[4px] text-[var(--green)]" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>{num}</span>
        {tag}
      </div>
      <h2 className="font-bold tracking-[-0.5px]" style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)' }}>
        {title} <em className="not-italic" style={{ color: 'var(--green)' }}>{accent}</em>
      </h2>
      {sub && <p className="mt-2 font-light leading-[1.8] text-[0.9rem]" style={{ color: 'var(--muted)', maxWidth: 540 }}>{sub}</p>}
    </div>
  )
}

export { SectionHeader }

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    if (cardRef.current) cardRef.current.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }

  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <section id="about" style={{ background: 'var(--bg2)', padding: '100px 5vw 80px' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <SectionHeader num="01" tag="about" title="Engineer" accent="Profile" sub="MIT Manipal · Mechatronics · Class of 2026" />
      </motion.div>

      <div className="grid gap-12" style={{ gridTemplateColumns: 'clamp(220px,280px,300px) 1fr' }}>

        {/* photo card */}
        <motion.div
          ref={cardRef}
          className="rounded-[8px] overflow-hidden cursor-default"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
            <Image src="/ishan.jpeg" alt="Ishan Deshmukh" fill className="object-cover" style={{ objectPosition: '50% 15%', filter: 'grayscale(10%)' }} />
          </div>
          <div className="px-4 py-[14px]" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
            <div className="font-semibold text-[0.9rem]">Ishan Deshmukh</div>
            <div className="mt-1 text-[0.65rem]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)' }}>Mechatronics Engineer</div>
            <div className="flex gap-[5px] flex-wrap mt-2">
              {['Robotics', 'PCB Design', 'CAD', 'Embedded C'].map(t => (
                <span key={t} className="text-[0.58rem] px-2 py-[2px] rounded-[4px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)', background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* body */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {ABOUT.bio.map((p, i) => (
            <p key={i} className="mb-4 font-light leading-[1.9] text-[0.92rem]" style={{ color: 'var(--muted)' }}
              dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong style="color:var(--text);font-weight:500">') }}
            />
          ))}

          {/* skills */}
          <div className="mt-7 mb-3 text-[0.65rem] tracking-[2px] uppercase" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>// TECHNICAL STACK</div>
          <div className="grid gap-[6px]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}>
            {ABOUT.skills.map(s => (
              <div
                key={s.label}
                className="flex items-center gap-[7px] rounded-[6px] px-3 py-2 text-[0.68rem] cursor-default transition-all duration-200"
                style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)', background: 'var(--bg)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text)'; el.style.background = 'var(--surface)'; el.style.borderColor = 'var(--border2)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.background = 'var(--bg)'; el.style.borderColor = 'var(--border)' }}
              >
                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: s.color }} />
                {s.label}
              </div>
            ))}
          </div>

          {/* data table */}
          <div className="mt-5 rounded-[8px] overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <div className="px-4 py-[10px] flex items-center gap-[10px] text-[0.65rem] tracking-[2px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--green)' }}>▸</span> PROFILE
            </div>
            {ABOUT.table.map((row, i) => (
              <div
                key={row.key}
                className="flex items-center transition-colors duration-200"
                style={{ borderBottom: i < ABOUT.table.length - 1 ? '1px solid rgba(48,54,61,0.5)' : 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <div className="px-4 py-[10px] min-w-[120px] text-[0.65rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)', borderRight: '1px solid var(--border)' }}>{row.key}</div>
                <div className="px-4 py-[10px] text-[0.82rem] font-light">{row.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
