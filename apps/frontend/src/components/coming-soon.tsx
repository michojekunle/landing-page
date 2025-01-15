"use client"

import CountdownTimer from './countdown-timer'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800">
      {/* Content */}
      <div className="container relative mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto pt-20">
          <CountdownTimer targetDate="2025-01-15T00:00:00" />
          
          <div className="mt-5 mb-16 relative">
            {/* Text Behind */}
            <h1 className="text-[80px] sm:text-[140px] leading-none font-small text-[#ff2828] text-center tracking-tight relative z-0">
              COMING
              <br />
              SOON
            </h1>
            
            {/* Logo Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame_56-3xuBu2LQ6sZEEdlReIKrJSz3Z4iYan.png"
                alt="RiftLend Logo"
                width={300}
                height={300}
                className="w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] object-contain dark:invert"
                priority
              />
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-medium text-zinc-900 dark:text-zinc-50 mb-6">
              One platform, all chains. Borrow and lend without the cross-chain drama.
            </h2>
            
            <p className="text-zinc-500 dark:text-zinc-400 mb-12 text-lg leading-relaxed">
              RiftLend is a next-generation lending and borrowing protocol. It facilitates seamless cross-chain transactions across all supported L1 and L2 networks. By leveraging <span className="text-[#000000]"> Polymer</span> and <span className="text-[#ff2828]">Optimism</span> interoperability, the protocol dismantles traditional barriers between chains, unifying liquidity into a single, cohesive landscape.
            </p>

            <Button 
              className="bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800/90 dark:hover:bg-zinc-50/90 text-white dark:text-zinc-900 h-12 px-8 shadow-sm"
              asChild
            >
              <a href="https://guild.xyz/riftlend" target="_blank" rel="noopener noreferrer">
                JOIN ALPHA WAITLIST
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

