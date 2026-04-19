'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONTACT_LINKS } from '@/lib/data'
import { SectionHeader } from './About'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: '100px 5vw 80px' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <SectionHeader num="04" tag="contact" title="Let's" accent="Build" sub="Open to collaborations, research partnerships, and interesting problems." />
      </motion.div>

      <div className="grid gap-12" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>

        {/* links */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          {CONTACT_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 rounded-[6px] px-4 py-3 mb-2 no-underline transition-all duration-200"
              style={{ fontSize: '0.85rem', color: 'var(--text)', background: 'var(--bg2)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border2)'; el.style.background = 'var(--surface)'; el.style.transform = 'translateX(3px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--bg2)'; el.style.transform = '' }}
            >
              <span style={{ color: 'var(--muted)', fontSize: '1rem', minWidth: 18 }}>{link.icon}</span>
              <span>{link.label}</span>
              <span className="ml-auto text-[0.62rem]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>{link.tag}</span>
            </a>
          ))}
        </motion.div>

        {/* form — FormSubmit, no backend needed */}
        {/* First submission will trigger a verification email to ishanmechatronics@gmail.com */}
        <motion.form
          action="https://formsubmit.co/ishanmechatronics@gmail.com"
          method="POST"
          className="rounded-[8px] overflow-hidden"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <input type="hidden" name="_subject" value="New message from portfolio" />
          <input type="hidden" name="_next" value="https://ishandeshmukh.vercel.app/#contact" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="px-4 py-[10px] flex items-center gap-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <div className="text-[0.7rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>NEW_ISSUE · open</div>
          </div>

          <div className="p-6">
            {[
              { id: 'cf-name',  name: 'name',    type: 'text',  label: 'YOUR_NAME',  ph: 'Tony Stark' },
              { id: 'cf-email', name: 'email',   type: 'email', label: 'EMAIL',      ph: 'you@domain.com' },
            ].map(f => (
              <div key={f.id} className="mb-4">
                <label htmlFor={f.id} className="block mb-[6px] text-[0.65rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>{f.label}</label>
                <input
                  id={f.id}
                  name={f.name}
                  type={f.type}
                  placeholder={f.ph}
                  required
                  className="w-full rounded-[6px] px-3 py-[9px] text-[0.85rem] outline-none transition-all duration-200"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-sora)' }}
                  onFocus={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--blue)'; el.style.boxShadow = '0 0 0 3px rgba(88,166,255,0.1)' }}
                  onBlur={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.boxShadow = 'none' }}
                />
              </div>
            ))}

            <div className="mb-4">
              <label htmlFor="cf-msg" className="block mb-[6px] text-[0.65rem] tracking-[1px]" style={{ fontFamily: 'var(--font-mono-var)', color: 'var(--muted)' }}>MESSAGE</label>
              <textarea
                id="cf-msg"
                name="message"
                rows={4}
                placeholder="What are we building?"
                required
                className="w-full rounded-[6px] px-3 py-[9px] text-[0.85rem] outline-none transition-all duration-200 resize-y"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-sora)', minHeight: 90 }}
                onFocus={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--blue)'; el.style.boxShadow = '0 0 0 3px rgba(88,166,255,0.1)' }}
                onBlur={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.boxShadow = 'none' }}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-[6px] py-2 text-[0.72rem] tracking-[0.5px] font-semibold cursor-pointer transition-all duration-200"
              style={{ fontFamily: 'var(--font-mono-var)', background: 'var(--green)', color: '#0d1117', border: '1px solid var(--green)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#46d058'; el.style.boxShadow = '0 0 20px rgba(63,185,80,0.3)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--green)'; el.style.boxShadow = 'none' }}
            >
              submit_issue →
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
