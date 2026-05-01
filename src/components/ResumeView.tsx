'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { type RESUME } from '@/lib/data'

type ResumeData = typeof RESUME

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[0.63rem] tracking-[2px] uppercase mb-5 pb-2"
      style={{
        fontFamily: 'var(--font-mono-var)',
        color: 'var(--green)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {children}
    </div>
  )
}

function ExpCard({ item }: { item: ResumeData['experience'][number] }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
        <div className="font-semibold" style={{ fontSize: '0.95rem', color: 'var(--text)' }}>
          {item.role}
        </div>
        <span
          className="text-[0.63rem]"
          style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}
        >
          {item.period}
        </span>
      </div>
      <div className="mb-3" style={{ fontSize: '0.8rem', color: 'var(--blue)' }}>
        {item.org} · {item.location}
      </div>
      <ul className="list-none space-y-1 pl-0">
        {item.points.map((pt, i) => (
          <li
            key={i}
            className="flex gap-3 font-light leading-[1.75]"
            style={{ fontSize: '0.86rem', color: 'var(--muted)' }}
          >
            <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }}>›</span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResumeView({ resume }: { resume: ResumeData }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 5vw 80px' }}>
        {/* header */}
        <motion.div {...fade(0)} className="mb-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div
                className="text-[0.63rem] tracking-[2px] uppercase mb-2"
                style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)' }}
              >
                // resume
              </div>
              <h1 className="font-semibold mb-1" style={{ fontSize: '2rem', color: 'var(--text)' }}>
                Ishan Deshmukh
              </h1>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
                Mechatronics Engineering · MIT Manipal · Batch 2026
              </p>
            </div>
            <div className="flex gap-3 flex-wrap mt-1">
              <a
                href="mailto:ishanmechatronics@gmail.com"
                className="text-[0.68rem] px-3 py-[6px] rounded-[6px] no-underline transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono-var)',
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg2)',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text)'; el.style.borderColor = 'var(--border2)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.borderColor = 'var(--border)' }}
              >
                ✉ email
              </a>
              <a
                href="https://linkedin.com/in/ishan-deshmukh-3b7412247"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.68rem] px-3 py-[6px] rounded-[6px] no-underline transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono-var)',
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg2)',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text)'; el.style.borderColor = 'var(--border2)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.borderColor = 'var(--border)' }}
              >
                in linkedin
              </a>
              <a
                href="https://github.com/AutoM80r"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.68rem] px-3 py-[6px] rounded-[6px] no-underline transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono-var)',
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg2)',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text)'; el.style.borderColor = 'var(--border2)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.borderColor = 'var(--border)' }}
              >
                ⌥ github
              </a>
            </div>
          </div>
        </motion.div>

        {/* experience */}
        <motion.section {...fade(0.08)} className="mb-12">
          <SectionLabel>Experience</SectionLabel>
          {resume.experience.map((item, i) => (
            <ExpCard key={i} item={item} />
          ))}
        </motion.section>

        {/* education */}
        <motion.section {...fade(0.14)} className="mb-12">
          <SectionLabel>Education</SectionLabel>
          <div className="mb-3">
            <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
              <div className="font-semibold" style={{ fontSize: '0.95rem', color: 'var(--text)' }}>
                {resume.education.degree}
              </div>
              <span className="text-[0.63rem]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}>
                {resume.education.period}
              </span>
            </div>
            <div className="mb-4" style={{ fontSize: '0.8rem', color: 'var(--blue)' }}>
              {resume.education.institution}
            </div>
            <div className="flex flex-wrap gap-2">
              {resume.education.courses.map(c => (
                <span
                  key={c}
                  className="text-[0.65rem] px-2 py-[3px] rounded-[4px]"
                  style={{
                    fontFamily: 'var(--font-mono-var)',
                    color: 'var(--muted)',
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* achievements */}
        <motion.section {...fade(0.18)} className="mb-12">
          <SectionLabel>Achievements</SectionLabel>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {resume.achievements.map((a, i) => (
              <div
                key={i}
                className="p-4 rounded-[8px]"
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
              >
                <div className="font-semibold mb-1" style={{ fontSize: '0.85rem', color: 'var(--text)' }}>
                  {a.title}
                </div>
                <div className="font-light" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {a.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* skills */}
        <motion.section {...fade(0.22)} className="mb-12">
          <SectionLabel>Skills</SectionLabel>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {resume.skills.map((group, i) => (
              <div key={i}>
                <div
                  className="text-[0.65rem] uppercase tracking-[1px] mb-3"
                  style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--blue)' }}
                >
                  {group.category}
                </div>
                <div className="flex flex-col gap-[6px]">
                  {group.items.map(item => (
                    <div
                      key={item}
                      className="flex items-center gap-2 font-light"
                      style={{ fontSize: '0.83rem', color: 'var(--muted)' }}
                    >
                      <span style={{ color: 'var(--green)', fontSize: '0.6rem' }}>▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* footer nav */}
        <motion.div
          {...fade(0.28)}
          className="flex items-center justify-between pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <Link
            href="/"
            className="text-[0.72rem] no-underline transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--dimmed)' }}
          >
            ← back home
          </Link>
          <div
            className="text-[0.65rem]"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}
          >
            B.Tech Mechatronics · 2026
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
