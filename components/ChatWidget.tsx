'use client'
import { MessageCircle } from 'lucide-react'

// TODO: Replace the WhatsApp link below with a Tawk.to / Crisp script injection
// to switch to a full chat system. Inject the third-party script in app/layout.tsx
// and remove this component's click handler.

export function ChatWidget() {
  const whatsappUrl = 'https://wa.me/919100982321'

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[var(--rh-blue)] hover:bg-[var(--rh-blue-hover)] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 font-inter text-sm font-medium"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={18} />
      Chat with us
    </a>
  )
}
