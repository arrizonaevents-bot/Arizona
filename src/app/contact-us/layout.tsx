import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Book Arizona for Your School Event',
  description: 'Contact Arizona Institute for school event bookings \u2014 Annual Days, Sports Days, Graduation Ceremonies, and more. Based in Ludhiana, Punjab. Serving schools across India. Email: arrizonaevents@gmail.com',
  keywords: [
    'contact Arizona event management',
    'book school event Ludhiana',
    'annual day booking Punjab',
    'school event inquiry India',
    'Arizona contact',
    'arrizonaevents@gmail.com',
    'arrizona.in contact',
    'event management inquiry',
    'school performance booking',
    'Ludhiana event organizer contact',
  ],
  alternates: {
    canonical: 'https://arrizona.in/contact-us',
  },
  openGraph: {
    title: 'Contact Us | Book Arizona for Your School Event',
    description: 'Get in touch with Arizona to book world-class school event management. Annual Days, Sports Days, Graduation Ceremonies \u2014 All-India bookings accepted.',
    url: 'https://arrizona.in/contact-us',
    images: [
      {
        url: '/img/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Arizona Institute \u2014 Contact & Bookings',
      },
    ],
  },
  twitter: {
    title: 'Contact Us | Book Arizona for Your School Event',
    description: 'Book Arizona for Annual Days, Sports Days, and more. All-India bookings accepted. Email: arrizonaevents@gmail.com',
  },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Arizona Institute of Performing Arts',
            url: 'https://arrizona.in/contact-us',
            description: 'Book Arizona for school Annual Days, Sports Days, Graduation Ceremonies, and all-India event management.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Arizona Institute of Performing Arts and Event Management',
              url: 'https://arrizona.in',
              email: 'arrizonaevents@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ludhiana',
                addressRegion: 'Punjab',
                postalCode: '141001',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'arrizonaevents@gmail.com',
                areaServed: 'IN',
                availableLanguage: ['English', 'Hindi', 'Punjabi'],
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
