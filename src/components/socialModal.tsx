import { useEffect } from 'react'

export type SocialLink = {
  label: string
  href: string
  detail?: string
}

type SocialModalProps = {
  isOpen: boolean
  onClose: () => void
  links?: SocialLink[]
}

const defaultLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'Email', href: 'mailto:hello@victus.com', detail: 'hello@victus.com' },
]

const SocialModal = ({ isOpen, onClose, links = defaultLinks }: SocialModalProps) => {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="social-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Reseaux sociaux
            </p>
            <h2 id="social-modal-title" className="mt-2 text-xl font-bold text-gray-900">
              Restons connectes
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-700"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {links.map((link) => {
            const isExternal = link.href.startsWith('http')
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-cyan/50 hover:bg-white"
              >
                <span>{link.label}</span>
                <span className="text-xs text-gray-400">
                  {link.detail ?? (isExternal ? 'Ouvrir' : '')}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SocialModal
