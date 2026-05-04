import { useState } from "react"
import Header from "../components/header"
import MenuDrawerMobile from "../components/menuDrawerMobil"
import TrustSection from "../components/trustSection"
import ProjectsSection from "../components/projectsSection"
import TechStackSection from "../components/techStackSection"
import Service from "../components/service"
import Team from "../components/team"
import Footer from "../components/footer"
import AboutSection from "../components/about"
import BoxAnimated from "../components/boxAnimated"
import SocialModal from "../components/socialModal"

const PrincipalPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSocialOpen, setIsSocialOpen] = useState(false)

  const navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'VICTUS', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Confiance', href: '#confiance' },
    { label: 'Projets', href: '#projets' },
    { label: 'Technos', href: '#technos' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev)
  const handleMenuClose = () => setIsMenuOpen(false)
  const handleSocialOpen = () => setIsSocialOpen(true)
  const handleSocialClose = () => setIsSocialOpen(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Header
        navItems={navItems}
        isMenuOpen={isMenuOpen}
        onMenuToggle={handleMenuToggle}
      />
      <AboutSection />
      <MenuDrawerMobile
        navItems={navItems}
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />
      <Service />
      <TrustSection />
      {/* section pour projet realisé */}
      <ProjectsSection />
      <TechStackSection />
      <Team />
      <Footer />
      <BoxAnimated onClick={handleSocialOpen} />
      <SocialModal isOpen={isSocialOpen} onClose={handleSocialClose} />
    </div>
  )
}

export default PrincipalPage