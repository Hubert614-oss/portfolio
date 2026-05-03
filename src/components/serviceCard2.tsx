import type { ReactElement } from 'react'
import type { ServiceItem } from './types'

export default function ServiceCard2({ 
  item, 
  selected, 
  onSelect 
}: { 
  item: ServiceItem; 
  selected: boolean; 
  onSelect: (id: number) => void 
}): ReactElement {
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`
        group relative overflow-hidden rounded-3xl text-left
        border border-white/20 dark:border-white/10
        bg-white/10 dark:bg-white/5
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(124,58,237,0.08),inset_0_1px_0_rgba(255,255,255,0.3)]
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
        transition-all duration-500 ease-out
        hover:shadow-[0_12px_48px_rgba(124,58,237,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]
        hover:-translate-y-1
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${selected 
          ? 'ring-1 ring-purple-400/40 shadow-[0_0_40px_rgba(124,58,237,0.2),inset_0_1px_0_rgba(255,255,255,0.5)] bg-white/15 dark:bg-white/10 scale-[1.02]' 
          : 'hover:bg-white/15 dark:hover:bg-white/10'
        }
      `}
      aria-pressed={selected}
    >
      {/* Reflet supérieur liquide */}
  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
  <div className="absolute inset-x-8 top-0 h-24 bg-linear-to-b from-white/10 to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Contenu */}
      <div className="relative flex flex-col items-center text-center px-8 pt-10 pb-6 z-10">
        {/* Icône avec halo */}
        <div className={`
          relative mb-6 p-4 rounded-2xl
          bg-linear-to-br from-purple-500/10 to-transparent
          border border-purple-400/10
          transition-transform duration-500 group-hover:scale-110
          ${selected ? 'from-purple-500/20 border-purple-400/20' : ''}
        `}>
          <div className="relative z-10 text-purple-600 dark:text-purple-400">
            <item.Icon />
          </div>
          {/* Glow derrière l'icône */}
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Titre */}
        <h3 
    className="text-lg font-bold leading-snug mb-3 bg-linear-to-r from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent"
          dangerouslySetInnerHTML={{ __html: item.title }} 
        />
        
        {/* Description */}
        <p className="text-gray-600/80 dark:text-gray-400/80 text-sm leading-relaxed max-w-60">
          {item.description}
        </p>
      </div>

      {/* Barre inférieure avec effet glass */}
      <div className={`
        relative h-1.5 mx-6 mb-6 rounded-full overflow-hidden
        transition-all duration-500
        ${selected 
          ? 'bg-purple-500/30 shadow-[0_0_12px_rgba(124,58,237,0.4)]' 
          : 'bg-purple-500/10 group-hover:bg-purple-500/20'
        }
      `}>
        <div className={`
          absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-purple-500 to-purple-400 transition-all duration-700 ease-out
          ${selected ? 'w-full' : 'w-0 group-hover:w-3/4'}
        `} />
      </div>

      {/* Bordure lumineuse active */}
      {selected && (
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-purple-400/20 pointer-events-none" />
      )}
    </button>
  )
}