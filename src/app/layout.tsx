import Header from '@/components/Header'
import './globals.css'
import { NextAuthProvider } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: 'Gaming Platform',
    template: '%s | Gaming Platform'
  },
  description: 'Your gaming platform description'
}