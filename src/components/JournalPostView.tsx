'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { type JournalPost } from '@/lib/data'

const TAG_COLORS: Record<string, string> = {
  competition: '#3fb950',
  robocon: '#58a6ff',
  reflection: '#bc8cff',
  robotics: '#3fb950',
  mechanical: '#f78166',
  lessons: '#e3b341',
  personal: '#bc8cff',
  embedded: '#58a6ff',
  mindset: '#e3b341',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

export default function JournalPostView({
  post,
  prev,
  next,
}: {
  post: JournalPost
  prev: JournalPost | null
  next: JournalPost | null
}) {
  const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '120px 5vw 80px' }}>
        {/* back */}
        <motion.div {...fade(0)} className="mb-8">
          <Link
            href="/journal"
            className="text-[0.72rem] no-underline transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--dimmed)' }}
          >
            ← journal
          </Link>
        </motion.div>

        {/* header */}
        <motion.div {...fade(0.05)} className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="text-[0.63rem] tracking-[0.5px]"
              style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}
            >
              {date}
            </span>
            <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>
            <div className="flex gap-2 flex-wrap">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[0.6rem] px-2 py-[2px] rounded-full"
                  style={{
                    fontFamily: 'var(--font-mono-var)',
                    color: TAG_COLORS[tag] ?? 'var(--muted)',
                    background: `${TAG_COLORS[tag] ?? '#888'}18`,
                    border: `1px solid ${TAG_COLORS[tag] ?? '#888'}44`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="font-semibold leading-[1.35] mb-4" style={{ fontSize: '1.7rem', color: 'var(--text)' }}>
            {post.title}
          </h1>

          <p
            className="font-light leading-[1.8] pb-8"
            style={{ fontSize: '0.95rem', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}
          >
            {post.excerpt}
          </p>
        </motion.div>

        {/* body */}
        <motion.div {...fade(0.12)} className="mb-16">
          {post.content.map((para, i) => (
            <p
              key={i}
              className="font-light leading-[1.9] mb-6"
              style={{ fontSize: '0.97rem', color: 'var(--muted)', letterSpacing: '0.01em' }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* prev / next */}
        {(prev || next) && (
          <motion.div
            {...fade(0.2)}
            className="flex justify-between gap-4 pt-8"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {next ? (
              <Link
                href={`/journal/${next.slug}`}
                className="no-underline flex-1"
                style={{ maxWidth: '48%' }}
              >
                <div
                  className="p-4 rounded-[8px] transition-all duration-200 h-full"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border2)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)' }}
                >
                  <div className="text-[0.6rem] mb-2" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}>
                    ← newer
                  </div>
                  <div className="text-[0.8rem] font-medium leading-[1.4]" style={{ color: 'var(--text)' }}>
                    {next.title}
                  </div>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            {prev ? (
              <Link
                href={`/journal/${prev.slug}`}
                className="no-underline flex-1 text-right"
                style={{ maxWidth: '48%' }}
              >
                <div
                  className="p-4 rounded-[8px] transition-all duration-200 h-full"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border2)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)' }}
                >
                  <div className="text-[0.6rem] mb-2" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}>
                    older →
                  </div>
                  <div className="text-[0.8rem] font-medium leading-[1.4]" style={{ color: 'var(--text)' }}>
                    {prev.title}
                  </div>
                </div>
              </Link>
            ) : <div className="flex-1" />}
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  )
}
