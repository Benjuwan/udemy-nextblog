import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './Header'
import { Footer } from './Footer'

const inter = Inter({ subsets: ['latin'] }) // デフォルトフォント

/**
 * <body className={inter.className}> // デフォルトクラス
*/

export const metadata: Metadata = {
  title: 'Udemy Next 13 Blog',
  description: 'Udemy Next 13 Blog Course',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="container mx-auto bg-slate-700 text-slate-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
