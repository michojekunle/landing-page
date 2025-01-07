import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="block w-8 h-8">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/riftlend-dark-red-ddOcrblLtf1DoUHHr7N2oLyiOo0jOo.png"
        alt="RiftLend"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    </Link>
  )
}

