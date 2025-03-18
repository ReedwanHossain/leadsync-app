import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadSync | Replies',
  description: 'LeadSync Replies',
  generator: 'LeadSync',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    
      <body> {children}</body>
    </html>
  )
}
