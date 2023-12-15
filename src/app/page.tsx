'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Typewriter from 'typewriter-effect'

export default function Home() {
  const router = useRouter()

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-3xl flex flex-col items-center text-center">
        <p className="text-4xl md:text-7xl font-semibold mb-2">COEUS</p>
        <div className="text-sm md:text-lg text-slate-500">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('🚀 Enhance your tutoring workflow')
                .pauseFor(2500)
                .deleteAll()
                .typeString('📆 Schedule classes and lessons conveniently')
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  '📚 Store homework and lessons in private knowledge base'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString('🤖 AI Powered Quiz Generator')
                .pauseFor(2500)
                .start()
            }}
          />
        </div>
        <Button
          className="w-48 md:w-64 mt-6 md:mt-8 py-4 md:py-6 bg-green-700 hover:bg-green-600"
          onClick={() => router.push('/auth/login')}
        >
          Get Started
        </Button>
      </div>
    </main>
  )
}
