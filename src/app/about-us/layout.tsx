import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Story & Leadership',
  description: 'Meet the creative force behind Arizona \u2014 Arti Dang, Founder & Director, and a world-class team of theatre experts, choreographers, and Bollywood professionals with over a decade of experience in event management and performing arts across India.',
  keywords: [
    'Arizona about us',
    'Arti Dang Arizona',
    'event management team Ludhiana',
    'theatre director India',
    'choreographer Punjab',
    'Gurmeet Singh Mitwa',
    'Darshan Singh scriptwriter',
    'performing arts director India',
    'school event management team',
    'Arizona Institute leadership',
  ],
  alternates: {
    canonical: 'https://arrizona.in/about-us',
  },
  openGraph: {
    title: 'About Us | Arizona Institute of Performing Arts',
    description: 'Meet Arti Dang and the Arizona team \u2014 a decade of excellence in school event management, choreography, and performing arts across India.',
    url: 'https://arrizona.in/about-us',
    images: [
      {
        url: '/img/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Arizona Institute \u2014 Leadership Team',
      },
    ],
  },
  twitter: {
    title: 'About Us | Arizona Institute of Performing Arts',
    description: 'Meet Arti Dang and the Arizona team \u2014 a decade of excellence in school event management and performing arts across India.',
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Arizona Institute of Performing Arts',
            url: 'https://arrizona.in/about-us',
            description: 'Learn about Arizona Institute, its founder Arti Dang, and the professional team behind India\'s premier school event management company.',
            mainEntity: {
              '@type': 'Organization',
              name: 'Arizona Institute of Performing Arts and Event Management',
              url: 'https://arrizona.in',
              founder: {
                '@type': 'Person',
                name: 'Arti Dang',
                jobTitle: 'Founder & Director',
                description: 'Arti Dang holds a Master\'s in Theatre from Punjab University and has directed 150+ large-scale school productions across North India.',
                alumniOf: [
                  { '@type': 'CollegeOrUniversity', name: 'Punjab University' },
                  { '@type': 'CollegeOrUniversity', name: 'University of Jammu' },
                ],
              },
              employee: [
                {
                  '@type': 'Person',
                  name: 'Gurmeet Singh Mitwa',
                  jobTitle: 'Actor & Theatre Director',
                  description: 'Acted in more than 30 Bollywood films.',
                },
                {
                  '@type': 'Person',
                  name: 'Darshan Singh',
                  jobTitle: 'Scriptwriter & Theatre Director',
                  description: 'Directed more than 20 stage plays, worked with various TV channels and Production Houses.',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
