import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";

const siteUrl = 'https://sadimanna.github.io'
const siteTitle = 'Siladittya Manna | Federated Learning & AI Security'
const siteDescription =
  'Postdoctoral Fellow at IISc Bangalore working on federated learning, AI security and privacy, and self-supervised representation learning for medical imaging.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Siladittya Manna',
  },
  description: siteDescription,
  authors: [{ name: 'Siladittya Manna', url: siteUrl }],
  keywords: [
    'federated learning',
    'AI security',
    'privacy',
    'self-supervised learning',
    'medical image analysis',
    'Indian Institute of Science',
  ],
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Siladittya Manna',
    images: [{ url: '/profilepic2.jpg', alt: 'Dr. Siladittya Manna' }],
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: ['/profilepic2.jpg'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siladittya Manna',
  honorificPrefix: 'Dr.',
  url: siteUrl,
  jobTitle: 'Post-Doctoral Fellow',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Indian Institute of Science',
  },
  sameAs: [
    'https://github.com/sadimanna',
    'https://scholar.google.com/citations?user=6V9sqi0AAAAJ',
  ],
  knowsAbout: [
    'Federated learning',
    'AI security and privacy',
    'Self-supervised learning',
    'Medical image analysis',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "bcc4c417df7b43349f96566c9ea98f39"}'
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
