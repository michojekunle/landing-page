import { Azeret_Mono as GeistMono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { NavMenu } from '@/components/nav-menu'

const geistMono = GeistMono({ subsets: ['latin'] })

export const metadata = {
  title: 'RiftLend',
  description: 'RiftLend is launching soon. Stay tuned for updates!',
  icons: {
    icon: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/riftlend-dark-red-ddOcrblLtf1DoUHHr7N2oLyiOo0jOo.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-black text-white`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo */}
              <div className="flex items-center gap-3">
                <Logo />
                <Link href="/" className="text-lg font-bold hidden sm:block">
                  RIFTLEND
                </Link>
              </div>

              {/* Right: Navigation (Desktop and Mobile) */}
              <NavMenu />
            </div>
          </div>
        </header>
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
}

