import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Apple Glass - Innovation Reimagined',
  description: 'Experience the future with liquid glass design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
