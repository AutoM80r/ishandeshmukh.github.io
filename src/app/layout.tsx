import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ishandeshmukh.vercel.app'),
  title: 'Ishan Deshmukh — Mechatronics Engineer',
  description:
    'Mechatronics engineer, roboticist, and builder. MIT Manipal · Batch 2026. AIR 22 at DD Robocon, patent pending, 4+ years building things that move and react.',
  openGraph: {
    title: 'Ishan Deshmukh — Mechatronics Engineer',
    description:
      'Mechatronics engineer, roboticist, and builder. MIT Manipal · Batch 2026. AIR 22 at DD Robocon.',
    url: 'https://ishandeshmukh.github.io',
    images: ['/ishan.jpeg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishan Deshmukh — Mechatronics Engineer',
    description: 'Mechatronics engineer, roboticist, and builder. MIT Manipal.',
    images: ['/ishan.jpeg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
