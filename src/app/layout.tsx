import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChunkRecovery from './components/ChunkRecovery'
import { ThemeProvider } from './context/ThemeContext'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-heading',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Arizona Institute of Performing Arts and Event Management',
  description: 'A platform to discover talent, build confidence, and shine on the grand stage.',
  icons: {
    icon: '/img/LOGO.png',
  },
}

import SmoothScroll from './components/SmoothScroll'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="preload" href="https://prod.spline.design/pwitNlNftLusscoe/scene.splinecode" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll>
            <ChunkRecovery />
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
