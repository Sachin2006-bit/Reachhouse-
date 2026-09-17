import { Nav } from '@/components/Nav'
import { Hero } from '@/components/hero/Hero'
import { StatsBand } from '@/components/StatsBand'
import { WhatWeDo } from '@/components/WhatWeDo'
import { WorkSection } from '@/components/work/WorkSection'
import { Process } from '@/components/Process'
import { Pricing } from '@/components/Pricing'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { ChatWidget } from '@/components/ChatWidget'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsBand />
      <WorkSection />
      <WhatWeDo />
      <Process />
      <Pricing />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  )
}
