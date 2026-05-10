import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | 100+ Schools & Institutions Across India',
  description: 'Explore Arizona\'s impressive portfolio of school events managed across India. From Sacred Heart School to Ryan International and 100+ institutions \u2014 we deliver Annual Days, Sports Days, Graduation Ceremonies, and cultural programs with end-to-end excellence.',
  keywords: [
    'Arizona event portfolio',
    'school event portfolio India',
    'annual day events Punjab',
    'event management portfolio Ludhiana',
    'school productions North India',
    'Arizona schools list',
    'BCM school event management',
    'Ryan International event management',
    'DAV school annual day',
    'event expertise choreography',
    'theatre acting workshop',
    'Partap World School events',
    'JMK International events',
  ],
  alternates: {
    canonical: 'https://arrizona.in/our-work',
  },
  openGraph: {
    title: 'Our Work | Arizona \u2014 100+ Schools Across India',
    description: 'Arizona has partnered with 100+ leading schools and institutions to deliver unforgettable Annual Days, Sports Days, and cultural programs across India.',
    url: 'https://arrizona.in/our-work',
    images: [
      {
        url: '/img/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Arizona Institute \u2014 Our Work Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Our Work | Arizona \u2014 100+ Schools Across India',
    description: 'Arizona has partnered with 100+ leading schools and institutions across India for world-class event management.',
  },
};

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Our Work \u2014 Arizona Institute Portfolio',
            url: 'https://arrizona.in/our-work',
            description: 'A showcase of 100+ school events managed by Arizona across Punjab, Haryana, and all of India.',
            provider: {
              '@type': 'Organization',
              name: 'Arizona Institute of Performing Arts and Event Management',
              url: 'https://arrizona.in',
            },
            about: [
              { '@type': 'Thing', name: 'School Annual Day Events' },
              { '@type': 'Thing', name: 'Sports Day Organizer' },
              { '@type': 'Thing', name: 'Graduation Ceremony Management' },
              { '@type': 'Thing', name: 'Theatre Workshops' },
              { '@type': 'Thing', name: 'Choreography for Schools' },
              { '@type': 'Thing', name: 'Cultural Programs Punjab' },
            ],
            audience: {
              '@type': 'Audience',
              audienceType: 'Schools, Educational Institutions, Parents',
              geographicArea: {
                '@type': 'Country',
                name: 'India',
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
