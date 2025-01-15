
import { Inter } from 'next/font/google'
import './globals.css'
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
        url: './riftlend-red-favicon.svg',
        sizes: '32x32',
        type: 'image/svg',
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

      <body className={`${inter.className} bg-cover bg-center `}>
      

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
                <NavMenu />
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

