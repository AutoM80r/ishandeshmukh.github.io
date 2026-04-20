'use client'

import React from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS, type BadgeVariant } from '@/lib/data'
import { SectionHeader } from './About'

export const BADGE_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  green:  { color: 'var(--green)',  borderColor: 'rgba(63,185,80,0.4)',   background: 'rgba(63,185,80,0.08)',   border: '1px solid rgba(63,185,80,0.4)'   },
  blue:   { color: 'var(--blue)',   borderColor: 'rgba(88,166,255,0.4)',  background: 'rgba(88,166,255,0.08)',  border: '1px solid rgba(88,166,255,0.4)'  },
  yellow: { color: 'var(--yellow)', borderColor: 'rgba(227,179,65,0.4)',  background: 'rgba(227,179,65,0.08)',  border: '1px solid rgba(227,179,65,0.4)'  },
  orange: { color: 'var(--orange)', borderColor: 'rgba(247,129,102,0.4)', background: 'rgba(247,129,102,0.08)', border: '1px solid rgba(247,129,102,0.4)' },
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" style={{ background: 'var(--bg)', padding: '100px 5vw 80px' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <SectionHeader num="02" tag="projects" title="Things I've" accent="Built" sub="Robots, embedded systems, simulations, and research. Four years of building things that move and react." />
      </motion.div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
        {PROJECTS.map((p, i) => {
          const badge = BADGE_STYLES[p.badgeVariant]
          return (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="block rounded-[8px] p-5 transition-all duration-250 no-underline group"
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border2)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = ''; el.style.boxShadow = 'none' }}
              >
                <div className="flex justify-between items-start mb-[10px]">
                  <div className="flex items-center gap-2 font-semibold text-[0.92rem]" style={{ color: 'var(--blue)' }}>
                    <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>⬡</span>
                    {p.name}
                  </div>
                  <span className="text-[0.6rem] px-2 py-[2px] rounded-full" style={{ fontFamily: 'var(--font-mono-var)', ...badge }}>
                    {p.badge}
                  </span>
                </div>

                <p className="text-[0.82rem] font-light leading-[1.7] mb-[14px]" style={{ color: 'var(--muted)' }}>{p.description}</p>

                <div className="flex items-center gap-4 flex-wrap">
                  {p.tags.map(t => (
                    <div key={t.label} className="flex items-center gap-[5px] text-[0.68rem]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>
                      <div className="w-[10px] h-[10px] rounded-full" style={{ background: t.color }} />
                      {t.label}
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/projects"
          className="inline-block rounded-[6px] px-5 py-2 text-[0.72rem] tracking-[0.5px] no-underline transition-all duration-200"
          style={{ fontFamily: 'var(--font-mono-var)', background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--surface)'; el.style.borderColor = 'var(--border2)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'var(--border)' }}
        >
          view all projects →
        </Link>
      </motion.div>
    </section>
  )
}
