'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
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

function PostCard({ post, index }: { post: JournalPost; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/journal/${post.slug}`}
        className="block no-underline group"
        style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '2rem' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
      >
        <div className="flex items-center gap-3 mb-3 flex-wrap">
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

        <h2
          className="mb-2 font-semibold leading-[1.4] transition-colors duration-200 group-hover:text-[var(--blue)]"
          style={{ fontSize: '1.05rem', color: 'var(--text)' }}
        >
          {post.title}
        </h2>

        <p className="font-light leading-[1.75]" style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
          {post.excerpt}
        </p>

        <div
          className="mt-3 text-[0.72rem] flex items-center gap-[5px] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--dimmed)' }}
        >
          <span className="group-hover:text-[var(--blue)] transition-colors duration-200">read →</span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function JournalListing({ posts }: { posts: JournalPost[] }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '120px 5vw 80px' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div
            className="text-[0.65rem] tracking-[2px] uppercase mb-3"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)' }}
          >
            // journal
          </div>
          <h1 className="font-semibold mb-3" style={{ fontSize: '1.9rem', color: 'var(--text)' }}>
            Notes from the workshop.
          </h1>
          <p className="font-light leading-[1.8] mb-[56px]" style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            Reflections on competition, failure, research, and what it actually feels like to build things. Not
            tutorials. Not LinkedIn posts.
          </p>
        </motion.div>

        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
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
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
