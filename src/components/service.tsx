import { useState } from 'react'
import ServiceCard from './serviceCard2'
import { DevicesIcon, MonitorIcon, GlobeIcon } from './serviceIcons'
import type { ServiceItem } from './types'

export default function Service() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

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
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </svg>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D1470] leading-tight">
          Nous développons plus<br/>qu'un site web :
        </h2>
        <p className="mt-5 text-gray-500 text-base font-normal">
          Nous sommes bien plus qu'une agence de création de site web
        </p>
      </div>

      {/* Infinite horizontal carousel */}
      <div className="relative mt-14">
        <div className="overflow-hidden">
          <div className="scroll-viewport">
            <div className="scroll-track flex items-stretch">
              {/** duplicate items for seamless loop */}
              {[...items, ...items].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="card-item px-2"
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

        <style>{`
          .scroll-viewport { width: 100%; }
          .scroll-track { display: flex; gap: 1rem; align-items: stretch; width: max-content; animation: scroll 18s linear infinite; }
          .scroll-track:hover { animation-play-state: paused; }
          .card-item { flex: 0 0 100%; max-width: 100%; }

          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @media (min-width: 768px) {
            .card-item { flex: 0 0 33.3333%; max-width: 33.3333%; }
          }
        `}</style>
      </div>
    </section>
  )
}
