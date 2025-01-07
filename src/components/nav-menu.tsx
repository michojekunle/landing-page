"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavItemProps {
  href: string
  children: React.ReactNode
  hasDropdown?: boolean
  isExternal?: boolean
  onClick?: () => void
}

function NavItem({ href, children, hasDropdown, isExternal, onClick }: NavItemProps) {
  const props = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}
  
  return (
    <Link 
      href={href}
      className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors px-3 py-2"
      onClick={onClick}
      {...props}
    >
      {children}
      {hasDropdown && <ChevronDown className="w-4 h-4" />}
    </Link>
  )
}

export function NavMenu() {
  const [isOpen, setIsOpen] = React.useState(false)

  const closeMenu = () => setIsOpen(false)

  const menuItems = [
    { href: "https://docs.riftlend.com", label: "DOCS", isExternal: true },
    // Add more menu items here as needed
  ]

  return (
    <>
      <nav className="hidden md:flex items-center gap-2">
        {menuItems.map((item, index) => (
          <NavItem key={index} href={item.href} isExternal={item.isExternal}>
            {item.label}
          </NavItem>
        ))}
      </nav>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-zinc-900">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <NavItem key={index} href={item.href} isExternal={item.isExternal} onClick={closeMenu}>
                {item.label}
              </NavItem>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

