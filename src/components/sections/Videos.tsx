'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { VIDEOS } from '@/lib/data'
import { SectionHeader } from './About'

export default function Videos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="videos" style={{ background: 'var(--bg2)', padding: '100px 5vw 80px' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <SectionHeader num="03" tag="demos" title="Robots" accent="In Action" sub="Actual footage — competition runs, mechanism demos, field tests." />
      </motion.div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
        {VIDEOS.map((v, i) => (
          <motion.div
            key={v.src}
            className="rounded-[8px] overflow-hidden transition-all duration-250"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border2)'; el.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = '' }}
          >
            <video
              src={v.src}
              className="w-full block"
              style={{ aspectRatio: '16/9', objectFit: 'cover' }}
              controls
              muted
              loop
              playsInline
            />
            <div className="px-[14px] py-3" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="font-medium text-[0.82rem] mb-[2px]">{v.title}</div>
              <div className="text-[0.65rem]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>{v.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
