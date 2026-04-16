import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Manual high-priority preload for the 3D scene file to eliminate "black screen" delay */}
        <link 
          rel="preload" 
          href="https://prod.spline.design/pwitNlNftLusscoe/scene.splinecode" 
          as="fetch" 
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
