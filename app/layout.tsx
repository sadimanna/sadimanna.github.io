import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Dr. Siladittya Manna',
  description: 'Profile Webpage',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
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
