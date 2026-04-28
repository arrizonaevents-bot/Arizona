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
  metadataBase: new URL('https://arrizona.in'),
  title: {
    default: 'Arizona Institute of Performing Arts and Event Management',
    template: '%s | Arizona Institute',
  },
  description: 'A premium platform to discover talent, build confidence, and shine on the grand stage. We specialize in choreography, theatre arts, and large-scale school events across India.',
  keywords: ['Arizona Institute', 'Performing Arts', 'Event Management', 'Choreography', 'Theatre', 'School Events', 'India', 'Method Acting'],
  authors: [{ name: 'Arizona Institute' }],
  creator: 'Arizona',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://arrizona.in',
    title: 'Arizona Institute of Performing Arts and Event Management',
    description: 'A premium platform to discover talent, build confidence, and shine on the grand stage.',
    siteName: 'Arizona Institute',
    images: [
      {
        url: '/img/LOGO.png',
        width: 800,
        height: 600,
        alt: 'Arizona Institute Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arizona Institute of Performing Arts and Event Management',
    description: 'A premium platform to discover talent, build confidence, and shine on the grand stage.',
    images: ['/img/LOGO.png'],
  },
  icons: {
    icon: '/img/LOGO.png',
    shortcut: '/img/LOGO.png',
    apple: '/img/LOGO.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
