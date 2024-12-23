"use client"

import { Twitter, Github } from 'lucide-react'
import CountdownTimer from './countdown-timer'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">      
      <div className="relative w-full max-w-2xl mx-auto mb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20(1).jpg-8mX8t8nNZnJQrowxOke6Zh3jxdzn2Q.jpeg"
          alt="Coming Soon"
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="max-w-md mx-auto w-full text-center">
        <CountdownTimer targetDate="2025-01-15T00:00:00" />
        <div className="mt-8 mb-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 px-8"
            asChild
          >
            <a href="https://guild.xyz/riftlend" target="_blank" rel="noopener noreferrer">
              Join Alpha Waitlist
            </a>
          </Button>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <a href="https://x.com/RiftLend" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="https://github.com/RiftLend" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="GitHub">
            <Github size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}

