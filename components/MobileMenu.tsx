'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/Button'
import { WA_URL } from '@/lib/constants'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { label: string; href: string }[]
  dashboardUrl: string
}

export function MobileMenu({ open, onClose, links, dashboardUrl }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-[var(--rh-navy)] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--rh-border)]">
            <span className="font-outfit font-semibold text-white text-lg">Menu</span>
            <button onClick={onClose} className="text-[var(--rh-muted)] hover:text-white p-1" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col flex-1 px-6 pt-8 gap-6">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-[28px] font-outfit font-semibold text-[var(--rh-text)] hover:text-white transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          <div className="p-6 flex flex-col gap-3 border-t border-[var(--rh-border)]">
            <Button variant="ghost" href={dashboardUrl} className="w-full justify-center">
              Go to Dashboard
            </Button>
            <Button variant="primary" href={WA_URL} onClick={onClose} className="w-full justify-center">
              Start a project
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
