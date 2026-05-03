import type { ReactElement } from 'react'

export function DevicesIcon(): ReactElement {
  return (
    <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="40" height="30" rx="3" stroke="#7C3AED" strokeWidth="2.2" fill="none"/>
      <line x1="2" y1="33" x2="42" y2="33" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="22" cy="36.5" r="1.5" fill="#7C3AED"/>
      <rect x="46" y="16" width="22" height="34" rx="3" stroke="#7C3AED" strokeWidth="2.2" fill="none"/>
      <line x1="46" y1="44" x2="68" y2="44" stroke="#7C3AED" strokeWidth="2"/>
      <circle cx="57" cy="47.5" r="1.5" fill="#7C3AED"/>
      <rect x="8" y="34" width="20" height="14" rx="2" stroke="#7C3AED" strokeWidth="2" fill="none"/>
    </svg>
  )
}

export function MonitorIcon(): ReactElement {
  return (
    <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="4" width="46" height="34" rx="3" stroke="#7C3AED" strokeWidth="2.2" fill="none"/>
      <line x1="8" y1="30" x2="54" y2="30" stroke="#7C3AED" strokeWidth="2"/>
      <line x1="31" y1="38" x2="31" y2="48" stroke="#7C3AED" strokeWidth="2.2"/>
      <line x1="23" y1="48" x2="39" y2="48" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round"/>
      <rect x="52" y="18" width="18" height="14" rx="2" stroke="#7C3AED" strokeWidth="2" fill="none"/>
      <line x1="52" y1="28" x2="70" y2="28" stroke="#7C3AED" strokeWidth="1.5"/>
      <line x1="61" y1="32" x2="61" y2="37" stroke="#7C3AED" strokeWidth="1.5"/>
      <line x1="57" y1="37" x2="65" y2="37" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function GlobeIcon(): ReactElement {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="34" r="22" stroke="#7C3AED" strokeWidth="2.2" fill="none"/>
      <ellipse cx="30" cy="34" rx="10" ry="22" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
      <line x1="8" y1="34" x2="52" y2="34" stroke="#7C3AED" strokeWidth="1.5"/>
      <line x1="10" y1="24" x2="50" y2="24" stroke="#7C3AED" strokeWidth="1"/>
      <line x1="10" y1="44" x2="50" y2="44" stroke="#7C3AED" strokeWidth="1"/>
      <circle cx="50" cy="16" r="11" fill="white" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="50" y="20" textAnchor="middle" fontSize="7" fill="#7C3AED" fontFamily="Poppins, sans-serif" fontWeight={700}>www</text>
      <line x1="58" y1="7" x2="62" y2="7" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="60" y1="5" x2="60" y2="9" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}