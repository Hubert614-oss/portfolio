

import { useState } from 'react'
// import { Link } from 'react-router-dom'
import MenuDrawerMobile from './menuDrawerMobil'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Header = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Clients', href: '#clients' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Services', href: '#services' },
        { label: 'Processus', href: '#processus' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
    ]

    const images = [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
        'https://img.freepik.com/vecteurs-libre/illustration-du-concept-medias-sociaux_53876-18377.jpg?semt=ais_hybrid&w=740&q=80',
    ]

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    return (
        <>
            {/* Navigation Bar */}
            <div className="bg-linear-to-br from-rose to-lavender">
                <nav className="sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-cyan">VICTUS</div>
                            <ul className="hidden md:flex gap-8">
                                {navItems.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-gray-700 hover:text-cyan font-medium transition duration-300"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <MenuDrawerMobile navItems={navItems} />
                        </div>
                    </div>
                </nav>

                {/* Hero Header */}
                <header className="">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            {/* Partie Gauche - Logo et Diaporama */}
                            <div className="flex flex-col items-center">
                                {/* <div className="mb-8">
                                    <div className="w-24 h-24 bg-cyan rounded-full flex items-center justify-center">
                                        <span className="text-white text-3xl font-bold">V</span>
                                    </div>
                                </div> */}

                                {/* Slideshow */}
                                <div className="relative w-full max-w-md">
                                    <img
                                        src={images[currentImageIndex]}
                                        alt="Project showcase"
                                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                                    />

                                    {/* Navigation Buttons */}
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-xl transition"
                                    >
                                        <IoChevronBack size={20} />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-xl transition"
                                    >
                                        <IoChevronForward size={20} />
                                    </button>

                                    {/* Dots */}
                                    <div className="flex justify-center gap-2 mt-4">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`h-2 w-2 rounded-full transition ${index === currentImageIndex ? 'bg-cyan' : 'bg-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Partie Droite - Contenu Principal */}
                            <div className="text-white">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">VICTUS</h1>

                                <p className="text-lg md:text-xl font-semibold mb-6">
                                    Agence digitale spécialisée en développement, marketing et production vidéo
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="#portfolio"
                                        className="px-8 py-3 bg-white text-cyan font-bold rounded-lg hover:bg-gray-100 transition text-center"
                                    >
                                        Voir nos projets
                                    </a>
                                    <a
                                        href="#contact"
                                        className="px-8 py-3 bg-cyan text-white font-bold rounded-lg hover:bg-opacity-90 transition text-center"
                                    >
                                        Nous contacter
                                    </a>
                                </div>

                                {/* Stats rapides */}
                                <div className="grid grid-cols-3 gap-4 mt-12">
                                    <div>
                                        <p className="text-3xl font-bold">50+</p>
                                        <p className="text-sm opacity-90">Projets réalisés</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">30+</p>
                                        <p className="text-sm opacity-90">Clients satisfaits</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">8+</p>
                                        <p className="text-sm opacity-90">Années d'expérience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Header