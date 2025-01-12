import { Inter } from 'next/font/google'
import './globals.css'
import { Logo } from '@/components/logo'
import { NavMenu } from '@/components/nav-menu'
import { ThemeProvider } from '@/components/theme-provider'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RiftLend',
  description: 'One platform, all chains. Borrow and lend without the cross-chain drama',
  icons: {
    icon: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SCVCeV6cwF7i0P6zd6kRBT0PBXCysP.png',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-zinc-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/[0.02] dark:bg-black/[0.02]">
            <div className="max-w-5xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Logo />
                <NavMenu />
              </div>
            </div>
          </header>
          <main>
            <Providers>
              {children}
            </Providers>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

