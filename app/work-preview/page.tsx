import { WorkSection } from '@/components/work/WorkSection'

export const metadata = { title: 'Work Preview — ReachHouse' }

export default function WorkPreviewPage() {
  return (
    <main style={{ background: '#050B18', minHeight: '100svh' }}>
      {/* 120svh filler above */}
      <div style={{ height: '120svh', background: '#050B18' }} />
      <WorkSection />
      {/* 120svh filler below */}
      <div style={{ height: '120svh', background: '#050B18' }} />
    </main>
  )
}
