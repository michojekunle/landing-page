import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECECEC] dark:bg-zinc-800 hover:bg-white/100 dark:hover:bg-zinc-700 transition-colors"
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SCVCeV6cwF7i0P6zd6kRBT0PBXCysP.png"
        alt="RiftLend"
        width={24}
        height={24}
        className="w-6 h-6"
      />
      <span className="font-medium text-[#ff2828]">Riftlend</span>
    </Link>
  )
}

