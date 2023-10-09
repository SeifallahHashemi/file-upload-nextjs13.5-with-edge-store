import Image from 'next/image'
import EdgeStore from "@/components/EdgeStore/edge-store";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EdgeStore />
    </main>
  )
}
