'use client'

import { useState } from 'react'
import TerminalLoader from '@/components/TerminalLoader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Videos from '@/components/sections/Videos'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <TerminalLoader onDone={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Videos />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
