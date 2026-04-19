'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '#home',    label: 'home'     },
  { href: '#about',   label: 'about'    },
  { href: '#projects',label: 'projects' },
  { href: '#videos',  label: 'demos'    },
  { href: '#contact', label: 'contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-[14px] transition-all duration-300"
      style={{
        background: 'rgba(13,17,23,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 4.2 }}
    >
      {/* logo */}
      <div style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.85rem', fontWeight: 500 }}>
        <span style={{ color: 'var(--muted)' }}>~/</span>
        <span style={{ color: 'var(--text)' }}>ishan-deshmukh</span>
        <span style={{ color: 'var(--green)' }}> $</span>
      </div>

      {/* links */}
      <ul className="hidden md:flex gap-1 list-none items-center">
        {LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="transition-all duration-200 rounded-[6px] px-3 py-[5px] text-[0.72rem] tracking-[0.5px] border"
              style={{
                fontFamily: 'var(--font-mono-var)',
                color: active === link.href.slice(1) ? 'var(--text)' : 'var(--muted)',
                background: active === link.href.slice(1) ? 'var(--surface)' : 'transparent',
                borderColor: active === link.href.slice(1) ? 'var(--border)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <Link
            href="/resume"
            className="transition-all duration-200 rounded-[6px] px-3 py-[5px] text-[0.72rem] tracking-[0.5px] border"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)', borderColor: 'transparent', textDecoration: 'none' }}
          >
            resume
          </Link>
        </li>
        <li>
          <Link
            href="/journal"
            className="transition-all duration-200 rounded-[6px] px-3 py-[5px] text-[0.72rem] tracking-[0.5px] border"
            style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)', borderColor: 'transparent', textDecoration: 'none' }}
          >
            journal
          </Link>
        </li>
      </ul>

      {/* badge */}
      <div
        className="hidden sm:flex items-center gap-[6px] text-[0.65rem] px-[10px] py-[3px] rounded-full"
        style={{ fontFamily: 'var(--font-mono-var)', background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.3)', color: 'var(--green)' }}
      >
        <motion.div
          className="w-[6px] h-[6px] rounded-full"
          style={{ background: 'var(--green)' }}
          animate={{ opacity: [1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
        open to collabs
      </div>
    </motion.nav>
  )
}
