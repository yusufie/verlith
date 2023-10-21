import SessionProvider from '@/providers/SessionProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import './globals.scss'

import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

const space_grotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Verlit',
  description: 'Verlit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={space_grotesk.className}>
        <ThemeProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
