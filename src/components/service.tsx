import { useState, useRef, useEffect } from 'react'
import ServiceCard from './serviceCard2'
import { DevicesIcon, MonitorIcon, GlobeIcon } from './serviceIcons'
import type { ServiceItem } from './types'

export default function Service() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const isPaused = useRef(false)
  const resumeTimeoutRef = useRef<number | null>(null)
  const SPEED = 0.5 // pixels per frame, tweak for speed

  // pause auto-scroll
  function pauseAuto() {
    isPaused.current = true
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  // resume auto-scroll
  function resumeAuto() {
    if (!isPaused.current) return
    isPaused.current = false
    rafRef.current = requestAnimationFrame(animate)
  }

  // animation loop
  function animate() {
    const vp = viewportRef.current
    const track = trackRef.current
    if (!vp || !track) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }
    // move viewport
    vp.scrollLeft += SPEED
    // reset seamlessly when passed half of track (since items duplicated)
    const half = track.scrollWidth / 2
    if (vp.scrollLeft >= half) {
      vp.scrollLeft = vp.scrollLeft - half
    }
    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    // start animation
    isPaused.current = false
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const items: ServiceItem[] = [
    {
      id: 1,
      title: `Développement`,
      description: `Sites web (React, Next.js, etc.)\nApplications web\nAPI / Backend`,
      Icon: DevicesIcon,
    },
    {
      id: 2,
      title: `Marketing`,
      description: `Social media\nPublicité (Facebook Ads, Google Ads)\nSEO`,
      Icon: MonitorIcon,
    },
    {
      id: 3,
      title: `Vidéo`,
      description: `Montage vidéo\nMotion design\nContenu pour réseaux sociaux`,
      Icon: GlobeIcon,
    },
  ]

  return (
    <section className="relative py-20 px-6 max-w-6xl mx-auto">
      <div className="absolute top-6 right-6" aria-hidden>
        <img src='/logo_arc_dots.svg' className='w-24 h-auto animate-spin duration-200'/>
        {/* <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5">
            <circle cx="55" cy="5" r="2.5" fill="#9333ea"/>
            <circle cx="63" cy="10" r="2" fill="#9333ea"/>
            <circle cx="68" cy="18" r="2" fill="#9333ea"/>
            <circle cx="70" cy="27" r="1.5" fill="#9333ea"/>
            <circle cx="68" cy="36" r="1.5" fill="#9333ea"/>
            <circle cx="63" cy="44" r="1.5" fill="#9333ea"/>
            <circle cx="56" cy="50" r="1.5" fill="#9333ea"/>
            <circle cx="48" cy="55" r="1.5" fill="#9333ea"/>
            <circle cx="40" cy="58" r="1" fill="#9333ea"/>
            <circle cx="32" cy="59" r="1" fill="#9333ea"/>
          </g>
        </svg> */}
      </div>

      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D1470] leading-tight">
          Nous développons plus<br/>qu'un site web :
        </h2>
        <p className="mt-5 text-gray-500 text-base font-normal">
          Nous sommes bien plus qu'une agence de création de site web
        </p>
      </div>

      {/* Infinite horizontal carousel (JS-driven scroll) */}
      <div className="relative mt-14">
        <div
          className="overflow-hidden"
          onMouseEnter={() => { pauseAuto() }}
          onMouseLeave={() => { resumeAuto() }}
        >
          <div className="scroll-viewport no-scrollbar" ref={viewportRef}>
            <div className="scroll-track flex items-stretch" ref={trackRef}>
              {/** duplicate items for seamless loop */}
              {[...items, ...items].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="px-3"
                >
                  <ServiceCard
                    item={item}
                    selected={selectedId === item.id}
                    onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prev/Next controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            aria-label="Précédent"
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow ml-2"
            onClick={() => {
              const viewport = viewportRef.current
              if (!viewport) return
              pauseAuto()
              const visible = window.innerWidth >= 768 ? 3 : 1
              const amount = Math.round(viewport.clientWidth / visible)
              viewport.scrollBy({ left: -amount, behavior: 'smooth' })
              // resume after short delay
              resumeTimeoutRef.current = window.setTimeout(() => resumeAuto(), 2200)
            }}
          >
            ‹
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            aria-label="Suivant"
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow mr-2"
            onClick={() => {
              const viewport = viewportRef.current
              if (!viewport) return
              pauseAuto()
              const visible = window.innerWidth >= 768 ? 3 : 1
              const amount = Math.round(viewport.clientWidth / visible)
              viewport.scrollBy({ left: amount, behavior: 'smooth' })
              // resume after short delay
              resumeTimeoutRef.current = window.setTimeout(() => resumeAuto(), 2200)
            }}
          >
            ›
          </button>
        </div>

        <style>{`
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .scroll-viewport { width: 100%; overflow-x: auto; scroll-behavior: smooth; }
          .scroll-track { display: flex; gap: 0.5rem; align-items: stretch; width: max-content; }
          .card-item { flex: 0 0 100%; max-width: 100%; }
          @media (min-width: 768px) { .card-item { flex: 0 0 33.3333%; max-width: 33.3333%; } }
        `}</style>
      </div>
    </section>
  )
}
