'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { id: 0, text: 'apt-get install ishan-deshmukh',                        cls: 'prompt' },
  { id: 1, text: 'Reading package lists... Done',                          cls: 'info'   },
  { id: 2, text: 'Building dependency tree... Done',                       cls: 'dim'    },
  { id: 3, text: 'The following packages will be installed:',              cls: 'dim'    },
  { id: 4, text: '  mechatronics-4.0  robotics-senior  stm32-expert',     cls: 'bold'   },
  { id: 5, text: '  sensor-fusion  solidworks-pro  patent-holder',        cls: 'bold'   },
  { id: 6, text: 'Unpacking ishan-deshmukh (4.0.2026) ...',               cls: 'warn'   },
  { id: 7, text: 'Setting up AIR-22-robocon ...',                         cls: 'dim'    },
  { id: 8, text: 'Setting up robotics-head-ie-mechatronics ...',          cls: 'dim'    },
  { id: 9, text: 'Setting up cosy-farms-intern ...',                      cls: 'dim'    },
  { id: 10, text: '✓ Successfully installed ishan-deshmukh v4.0.2026',    cls: 'success'},
  { id: 11, text: '✓ Launching profile...',                               cls: 'success'},
]

const DELAYS = [0, 380, 660, 940, 1140, 1340, 1700, 2050, 2350, 2650, 3050, 3400]
const DONE_AT = 3900

const CLS: Record<string, string> = {
  prompt:  'text-[var(--muted)] before:content-["$_"] before:text-[var(--green)]',
  info:    'text-[var(--blue)]',
  dim:     'text-[var(--dimmed)]',
  bold:    'text-[var(--text)] font-medium',
  warn:    'text-[var(--yellow)]',
  success: 'text-[var(--green)]',
}

interface Props { onDone: () => void }

export default function TerminalLoader({ onDone }: Props) {
  const [visible, setVisible] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(v => [...v, i]), DELAYS[i]))
    })

    /* progress bar between lines 5 and 6 */
    timers.push(setTimeout(() => {
      let p = 0
      const iv = setInterval(() => {
        p += 2
        setProgress(p)
        if (p >= 100) clearInterval(iv)
      }, 16)
    }, DELAYS[5] + 100))

    timers.push(setTimeout(() => {
      setShow(false)
      setTimeout(onDone, 600)
    }, DONE_AT))

    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-center px-[6vw]"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div
            className="max-w-[680px] rounded-[6px] overflow-hidden"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)', boxShadow: '0 16px 64px rgba(0,0,0,0.6)' }}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-[10px]" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto text-[0.7rem] text-[var(--muted)]" style={{ fontFamily: 'var(--font-mono-var)' }}>
                bash — ishan@portfolio: ~
              </span>
            </div>

            {/* body */}
            <div className="px-6 py-6 min-h-[260px]" style={{ fontFamily: 'var(--font-mono-var)', fontSize: '0.78rem', lineHeight: '2' }}>
              {LINES.map((line, i) => (
                <AnimatePresence key={line.id}>
                  {visible.includes(i) && (
                    <motion.span
                      className={`block ${CLS[line.cls]}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {line.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              ))}

              {/* progress bar — shown after line 5 */}
              <AnimatePresence>
                {visible.includes(5) && progress < 100 && (
                  <motion.div
                    className="my-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="h-[6px] rounded-sm overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div
                        className="h-full transition-all duration-100"
                        style={{ width: `${progress}%`, background: 'var(--green)', boxShadow: '0 0 8px rgba(63,185,80,0.4)' }}
                      />
                    </div>
                    <div className="text-[0.65rem] mt-1" style={{ color: 'var(--green)' }}>{progress}%</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* cursor */}
              <motion.span
                className="inline-block w-2 h-[14px] align-middle"
                style={{ background: 'var(--green)' }}
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
