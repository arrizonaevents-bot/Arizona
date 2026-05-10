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
    default: 'Arizona | Premier Event Management & Performing Arts — Ludhiana, India',
    template: '%s | Arizona Institute',
  },
  description: 'Arizona is a premier event management company based in Ludhiana, Punjab. Specializing in school Annual Days, Sports Days, Graduation Ceremonies, choreography, theatre workshops, and large-scale cultural productions across India. Led by Arti Dang — 10+ years of excellence.',
  keywords: [
    'Arizona event management',
    'school event management Ludhiana',
    'annual day organizer Punjab',
    'school annual day management India',
    'sports day organizer',
    'graduation ceremony management',
    'theatre workshops for kids',
    'choreography for school events',
    'performing arts school India',
    'stage design school events',
    'event management company Ludhiana',
    'cultural program organizer Punjab',
    'Arti Dang event management',
    'arrizona.in',
    'Arizona Institute of Performing Arts',
    'school production management',
    'kids performance training India',
    'experiential learning programs',
    'wedding choreography Ludhiana',
  ],
  authors: [{ name: 'Arizona Institute of Performing Arts', url: 'https://arrizona.in' }],
  creator: 'Arizona Institute of Performing Arts',
  publisher: 'Arizona Institute of Performing Arts',
  category: 'Event Management',
  classification: 'Event Management, Performing Arts, Education',
  alternates: {
    canonical: 'https://arrizona.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://arrizona.in',
    title: 'Arizona | Premier Event Management & Performing Arts',
    description: 'Arizona crafts impactful, memorable event experiences for schools and institutions across India. 10+ years of excellence in Annual Days, Sports Days, Graduation Ceremonies, and more.',
    siteName: 'Arizona Institute of Performing Arts',
    images: [
      {
        url: '/img/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Arizona Institute of Performing Arts and Event Management',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arizona | Premier Event Management & Performing Arts',
    description: 'Arizona crafts impactful, memorable event experiences for schools and institutions across India. 10+ years of excellence.',
    images: ['/img/og-banner.png'],
    site: '@arrizonaevents',
    creator: '@arrizonaevents',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/img/LOGO.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/img/LOGO.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
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
        {/* Geo meta tags */}
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Ludhiana, Punjab, India" />
        <meta name="geo.position" content="30.9009;75.8573" />
        <meta name="ICBM" content="30.9009, 75.8573" />
        {/* Language & content */}
        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="language" content="English" />
        {/* Mobile / PWA */}
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Arizona Institute" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Arizona Institute" />
        {/* Referrer */}
        <meta name="referrer" content="origin-when-cross-origin" />
        {/* Preconnect Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Arizona Institute of Performing Arts and Event Management",
            "alternateName": "Arizona Events",
            "url": "https://arrizona.in",
            "logo": "https://arrizona.in/img/LOGO.png",
            "description": "Arizona is a premier event management company specializing in school Annual Days, Sports Days, Graduation Ceremonies, choreography, theatre workshops, and large-scale cultural productions across India.",
            "foundingDate": "2014",
            "founder": {
              "@type": "Person",
              "name": "Arti Dang",
              "jobTitle": "Founder & Director",
              "alumniOf": [
                { "@type": "CollegeOrUniversity", "name": "Punjab University" },
                { "@type": "CollegeOrUniversity", "name": "University of Jammu" }
              ]
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ludhiana",
              "addressRegion": "Punjab",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "arrizonaevents@gmail.com",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi", "Punjabi"]
            },
            "sameAs": [
              "https://arrizona.in"
            ],
            "knowsAbout": [
              "Event Management",
              "School Annual Day Events",
              "Choreography",
              "Theatre Workshops",
              "Performing Arts Education",
              "Stage Design"
            ],
            "numberOfEmployees": {
              "@type": "QuantitativeValue",
              "minValue": 10
            },
            "areaServed": {
              "@type": "Country",
              "name": "India"
            }
          }) }}
        />
        {/* Structured Data: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Arizona Institute of Performing Arts and Event Management",
            "image": "https://arrizona.in/img/LOGO.png",
            "url": "https://arrizona.in",
            "email": "arrizonaevents@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ludhiana",
              "addressRegion": "Punjab",
              "postalCode": "141001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 30.9009,
              "longitude": 75.8573
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "19:00"
            },
            "priceRange": "₹₹",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, Bank Transfer",
            "hasMap": "https://maps.google.com/?q=Ludhiana,Punjab",
            "areaServed": "India"
          }) }}
        />
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
