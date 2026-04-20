'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BADGE_STYLES } from '@/components/sections/Projects'
import { PROJECT_DETAILS, type ProjectDetail } from '@/lib/data'
import Navbar from '@/components/Navbar'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
})

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div
        className="text-[0.65rem] tracking-[1.5px] uppercase mb-3 pb-2"
        style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)', borderBottom: '1px solid var(--border)' }}
      >
        {label}
      </div>
      <p className="leading-[1.9] font-light" style={{ fontSize: '0.93rem', color: 'var(--muted)' }}>
        {children}
      </p>
    </div>
  )
}

export default function ProjectDetail({ project }: { project: ProjectDetail }) {
  const allSlugs = PROJECT_DETAILS.map(p => p.slug)
  const idx = allSlugs.indexOf(project.slug)
  const prev = idx > 0 ? PROJECT_DETAILS[idx - 1] : null
  const next = idx < PROJECT_DETAILS.length - 1 ? PROJECT_DETAILS[idx + 1] : null

  const badgeStyle = BADGE_STYLES[project.badgeVariant]

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 5vw' }}>

          {/* back */}
          <motion.div {...fade(0)} className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 no-underline transition-colors duration-200"
              style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.72rem', color: 'var(--muted)' }}
            >
              <span style={{ color: 'var(--green)' }}>←</span> back to projects
            </Link>
          </motion.div>

          {/* header */}
          <motion.div {...fade(0.06)} className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="text-[0.62rem] tracking-[0.5px] px-2 py-[3px] rounded-[4px]"
                style={{ fontFamily: 'var(--font-mono-var)', ...badgeStyle }}
              >
                {project.badge}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => (
                  <span
                    key={t.label}
                    className="text-[0.62rem] px-2 py-[3px] rounded-[4px]"
                    style={{ fontFamily: 'var(--font-mono-var)', color: t.color, background: `${t.color}18`, border: `1px solid ${t.color}40` }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="font-bold tracking-[-0.5px] mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
              {project.name}
            </h1>
            <p className="font-light" style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: 620, lineHeight: 1.7 }}>
              {project.headline}
            </p>
          </motion.div>

          {/* image */}
          {project.image && (
            <motion.div {...fade(0.12)} className="mb-10 overflow-hidden rounded-[8px]" style={{ border: '1px solid var(--border)' }}>
              <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            </motion.div>
          )}

          {/* two-col: content + specs */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">

            {/* left — narrative */}
            <motion.div {...fade(0.16)}>
              <Section label="overview">{project.overview}</Section>
              <Section label="the problem">{project.problem}</Section>
              <Section label="my role">{project.role}</Section>
              <Section label="outcome">{project.outcome}</Section>
            </motion.div>

            {/* right — specs */}
            <motion.div {...fade(0.20)}>
              <div
                className="rounded-[8px] overflow-hidden sticky top-[88px]"
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
              >
                <div
                  className="px-5 py-3 text-[0.62rem] tracking-[1.5px] uppercase"
                  style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                >
                  tech specs
                </div>
                <div className="px-5 py-4 flex flex-col gap-[14px]">
                  {project.specs.map(s => (
                    <div key={s.key}>
                      <div className="text-[0.60rem] tracking-[0.8px] uppercase mb-[3px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}>
                        {s.key}
                      </div>
                      <div className="text-[0.82rem] leading-[1.5]" style={{ color: 'var(--text)' }}>
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* prev / next */}
          <motion.div {...fade(0.24)} className="mt-14 pt-8 flex justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col gap-1 no-underline p-4 rounded-[6px] transition-colors duration-200"
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)', maxWidth: 260 }}
              >
                <span className="text-[0.62rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}>← previous</span>
                <span className="text-[0.82rem] font-medium" style={{ color: 'var(--text)' }}>{prev.name}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col gap-1 items-end no-underline p-4 rounded-[6px] transition-colors duration-200"
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)', maxWidth: 260 }}
              >
                <span className="text-[0.62rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}>next →</span>
                <span className="text-[0.82rem] font-medium" style={{ color: 'var(--text)' }}>{next.name}</span>
              </Link>
            ) : <div />}
          </motion.div>

        </div>
      </main>
    </>
  )
}
