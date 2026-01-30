'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PDFIcon, Fist, SpaceShip, Tables } from '@/components/Icons'

export default function Navbar () {
  const pathname = usePathname()
  const LINKS = [
    { href: '/combat', label: 'combat', icon: Fist },
    { href: '/ship', label: 'ship', icon: SpaceShip },
    { href: '/tables', label: 'tables', icon: Tables },
    { href: '/pdf/traveller-core-rulebook.pdf', label: 'Rulebook', icon: PDFIcon, external: true },
    { href: '/pdf/astrogator.pdf', label: 'Astrogator sheet', icon: PDFIcon, external: true },
  ]
  return (
    <nav className="flex flex-row justify-center gap-6 text-center sm:items-center">
      {LINKS.map(({ href, label, icon: Icon, external }) => (
        <Link
            key={href}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`
              flex flex-col items-center gap-1
              transition-colors
              ${pathname === href ? 'text-emerald-400': 'text-muted-foreground hover:text-foreground'}
            `}
          >
          <Icon className='w-5 h-5' />
          <span className="text-md">{label}</span>
        </Link>
        ))}
    </nav>
)
}