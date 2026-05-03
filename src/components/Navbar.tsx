'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

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
  const [menuOpen, setMenuOpen] = useState(false)

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

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-[14px] transition-all duration-300"
        style={{
          background: 'var(--nav-bg)',
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

        {/* desktop links */}
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

        {/* right side */}
        <div className="flex items-center gap-3">
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

          <ThemeToggle />

          {/* hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-[6px]"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1.5px] w-[20px] rounded-full"
              style={{ background: 'var(--text)', transformOrigin: 'center' }}
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-[20px] rounded-full"
              style={{ background: 'var(--text)' }}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[1.5px] w-[20px] rounded-full"
              style={{ background: 'var(--text)', transformOrigin: 'center' }}
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'var(--overlay-bg)', backdropFilter: 'blur(20px)', paddingTop: '70px' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <nav className="flex flex-col px-[5vw] pt-8 gap-1">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="no-underline py-3 text-[1.1rem] font-light flex items-center gap-3"
                  style={{
                    fontFamily: 'var(--font-mono-var)',
                    color: active === link.href.slice(1) ? 'var(--text)' : 'var(--muted)',
                    borderBottom: '1px solid var(--border)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>›</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: LINKS.length * 0.06 }}>
                <Link
                  href="/resume"
                  className="no-underline py-3 text-[1.1rem] font-light flex items-center gap-3"
                  style={{
                    fontFamily: 'var(--font-mono-var)',
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>›</span>
                  resume
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (LINKS.length + 1) * 0.06 }}>
                <Link
                  href="/journal"
                  className="no-underline py-3 text-[1.1rem] font-light flex items-center gap-3"
                  style={{
                    fontFamily: 'var(--font-mono-var)',
                    color: 'var(--muted)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>›</span>
                  journal
                </Link>
              </motion.div>
            </nav>

            <div
              className="mt-auto px-[5vw] pb-10 flex items-center gap-[6px] text-[0.65rem]"
              style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--green)' }}
            >
              <motion.div
                className="w-[6px] h-[6px] rounded-full"
                style={{ background: 'var(--green)' }}
                animate={{ opacity: [1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              open to collabs · ishanmechatronics@gmail.com
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
