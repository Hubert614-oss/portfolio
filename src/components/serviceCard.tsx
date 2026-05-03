import type { ReactElement } from 'react'
import type { ServiceItem } from './types'

export default function ServiceCard({ item, selected, onSelect }: { item: ServiceItem; selected: boolean; onSelect: (id: number) => void }): ReactElement {
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={
        `card bg-gray-50 rounded-2xl shadow-sm overflow-hidden text-left transform transition-transform focus:outline-none ` +
        (selected ? 'ring-4 ring-purple-200 scale-[1.01]' : 'hover:scale-[1.01]')
      }
      aria-pressed={selected}
    >
      <div className="flex-1 flex flex-col items-center text-center px-8 pt-10 pb-6">
        <div className="mb-6">
          <item.Icon />
        </div>
        <h3 className="text-lg font-bold text-[#7C3AED] leading-snug mb-3" dangerouslySetInnerHTML={{ __html: item.title }} />
        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
      </div>
      <div className="h-3 bg-[#7C3AED] rounded-b-2xl" />
    </button>
  )
}