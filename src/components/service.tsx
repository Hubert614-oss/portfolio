import { useState } from 'react'
import ServiceCard from './serviceCard2'
import { DevicesIcon, MonitorIcon, GlobeIcon } from './serviceIcons'
import type { ServiceItem } from './types'

export default function Service() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const items: ServiceItem[] = [
    {
      id: 1,
      title: `Transformation et projets<br/>digitaux.`,
      description: "Nous nous occupons de votre transformation digitale ainsi que de votre projet digital complexe",
      Icon: DevicesIcon,
    },
    {
      id: 2,
      title: `Création CRM, ERP,<br/>applications`,
      description: "Nous créons votre CRM, votre ERP, vos programmes, applications…",
      Icon: MonitorIcon,
    },
    {
      id: 3,
      title: `Création et maintenance<br/>de sites.`,
      description: "Mais si ce qu'il vous faut c'est juste de la création ou la maintenance de votre site, nous le faisons aussi !",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {items.map(item => (
          <ServiceCard key={item.id} item={item} selected={selectedId === item.id} onSelect={(id) => setSelectedId(id === selectedId ? null : id)} />
        ))}
      </div>
    </section>
  )
}
