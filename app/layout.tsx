import type { Metadata } from 'next'
import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper'
import SmoothScroll from '@/components/SmoothScroll'
import Header from '@/components/Header'
import Menu from '@/components/Menu'

export const metadata: Metadata = {
  title: 'WEBB Inc. | Film / Photo / Design',
  description:
    'WEBB Inc. is a creative production company specializing in film, photography, and design. Based in Tokyo, Japan.',
  keywords: ['WEBB', 'Film', 'Photography', 'Design', 'Tokyo', 'Creative', 'Production'],
  authors: [{ name: 'Kazuyasu Yoshioka' }],
  openGraph: {
    title: 'WEBB Inc.',
    description: 'Film / Photo / Design',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeWrapper>
          <SmoothScroll>
            <Header />
            <Menu />
            <main>{children}</main>
          </SmoothScroll>
        </ThemeWrapper>
      </body>
    </html>
  )
}
