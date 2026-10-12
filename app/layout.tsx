import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"

const siteUrl = 'https://sadimanna.github.io'
const siteTitle = 'Dr. Siladittya Manna | Federated Learning, AI Security & Representation Learning'
const siteDescription =
  'Postdoctoral Fellow at IISc Bangalore researching vulnerabilities in PEFT-based federated learning, gradient inversion attacks, and self-supervised representation learning.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Dr. Siladittya Manna',
  },
  description: siteDescription,
  authors: [{ name: 'Dr. Siladittya Manna', url: siteUrl }],
  creator: 'Dr. Siladittya Manna',
  keywords: [
    'Siladittya Manna',
    'Federated Learning',
    'PEFT Vulnerabilities',
    'Gradient Inversion Attacks',
    'AI Security',
    'Privacy-Preserving AI',
    'Self-Supervised Learning',
    'Medical Image Analysis',
    'Indian Institute of Science',
    'IISc Bangalore',
    'Indian Statistical Institute',
    'ANRF Fellow'
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'profile',
    firstName: 'Siladittya',
    lastName: 'Manna',
    username: 'sadimanna',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Dr. Siladittya Manna - Academic Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/profilepic2.jpg',
        width: 800,
        height: 800,
        alt: 'Dr. Siladittya Manna - Postdoctoral Fellow at IISc Bangalore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/profilepic2.jpg'],
    creator: '@sadimanna',
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

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Dr. Siladittya Manna',
      givenName: 'Siladittya',
      familyName: 'Manna',
      honorificPrefix: 'Dr.',
      url: siteUrl,
      jobTitle: 'Post-Doctoral Fellow (ANRF Fellow)',
      image: `${siteUrl}/profilepic2.jpg`,
      worksFor: {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Science (IISc)',
        url: 'https://www.iisc.ac.in',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bangalore',
          addressCountry: 'India',
        },
      },
      alumnusOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Indian Statistical Institute (ISI)',
          url: 'https://www.isical.ac.in',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Indian Institute of Engineering Science and Technology (IIEST), Shibpur',
          url: 'https://www.iiest.ac.in',
        },
      ],
      sameAs: [
        'https://github.com/sadimanna',
        'https://scholar.google.com/citations?user=6V9sqi0AAAAJ',
        'https://digitalcommons.isical.ac.in/doctoral-theses/619/',
      ],
      knowsAbout: [
        'Federated Learning',
        'PEFT and Parameter-Efficient Fine-Tuning',
        'Gradient Inversion Attacks',
        'AI Security and Privacy',
        'Self-Supervised Learning',
        'Medical Image Analysis',
      ],
      award: [
        'ANRF National Post-Doctoral Fellowship (2026-2028)',
      ],
    },
    {
      '@type': 'ScholarlyArticle',
      headline: 'Dynamically Scaled Temperature in Self-Supervised Contrastive Learning',
      author: {
        '@id': `${siteUrl}/#person`,
      },
      datePublished: '2025',
      publisher: 'IEEE Transactions on Artificial Intelligence',
      url: 'https://ieeexplore.ieee.org/document/10820841',
    },
    {
      '@type': 'ScholarlyArticle',
      headline: 'Self-Supervised Visual Representation Learning for Medical Image Analysis: A Comprehensive Survey',
      author: {
        '@id': `${siteUrl}/#person`,
      },
      datePublished: '2024',
      publisher: 'Transactions on Machine Learning Research',
      url: 'https://openreview.net/forum?id=3Wg1oErMcJ',
    },
    {
      '@type': 'ScholarlyArticle',
      headline: 'Self-supervised representation learning for knee injury diagnosis from magnetic resonance data',
      author: {
        '@id': `${siteUrl}/#person`,
      },
      datePublished: '2023',
      publisher: 'IEEE Transactions on Artificial Intelligence',
      url: 'https://ieeexplore.ieee.org/document/10197577',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-blue-900 dark:selection:text-blue-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
