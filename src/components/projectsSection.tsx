import { useEffect, useRef, useState } from 'react';
import { FaCode, FaBullhorn, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const projectsDev = [
    {
        title: "Plateforme E-Commerce",
        category: "Web App",
        description: "Une plateforme de commerce électronique complète avec tableau de bord administrateur et paiement intégré.",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["React", "Node.js", "PostgreSQL"],
        color: "#61DAFB",
        stats: { users: "12K+", uptime: "99.9%" }
    },
    {
        title: "Application Mobile Fintech",
        category: "Mobile",
        description: "Application de gestion de finances personnelles avec suivi de budget et graphiques interactifs.",
        image: "https://images.unsplash.com/photo-1616198814651-e71f960c3180?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Flutter", "Firebase"],
        color: "#02569B",
        stats: { downloads: "50K+", rating: "4.8★" }
    },
    {
        title: "SaaS de Gestion RH",
        category: "SaaS",
        description: "Outil de gestion des ressources humaines, plannings, et paie pour les PME.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Vue.js", "Laravel", "MySQL"],
        color: "#4FC08D",
        stats: { companies: "200+", efficiency: "+40%" }
    },
    {
        title: "SaaS de Gestion RH",
        category: "SaaS",
        description: "Outil de gestion des ressources humaines, plannings, et paie pour les PME.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Vue.js", "Laravel", "MySQL"],
        color: "#4FC08D",
        stats: { companies: "200+", efficiency: "+40%" }
    },
    {
        title: "SaaS de Gestion RH",
        category: "SaaS",
        description: "Outil de gestion des ressources humaines, plannings, et paie pour les PME.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Vue.js", "Laravel", "MySQL"],
        color: "#4FC08D",
        stats: { companies: "200+", efficiency: "+40%" }
    }
];

const projectsMarketing = [
    {
        title: "Campagne d'Acquisition B2B",
        category: "Marketing Digital",
        description: "Stratégie complète de génération de leads via LinkedIn Ads et Google Ads pour une startup SaaS.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Google Ads", "LinkedIn", "SEO"],
        color: "#F2A600",
        stats: { leads: "+500", ROI: "+150%" }
    },
    {
        title: "Lancement de Marque B2C",
        category: "Social Media",
        description: "Campagne publicitaire ciblée sur Meta (Instagram, Facebook) pour une application e-commerce.",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Meta Ads", "Analytics", "Content"],
        color: "#1877F2",
        stats: { conversions: "5K+", "coût/acq": "-30%" }
    }
];

const projectsVideo = [
    {
        title: "Spot Publicitaire Corporate",
        category: "Montage Vidéo",
        description: "Montage dynamique pour une campagne de marque employeur diffusée sur les réseaux sociaux.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["Premiere Pro", "After Effects"],
        color: "#9999FF",
        stats: { vues: "1M+", engagement: "12%" }
    },
    {
        title: "Contenus Viraux & Vlogs",
        category: "Montage Vidéo",
        description: "Création de capsules vidéos pour TikTok, Reels et YouTube Shorts avec effets de transition.",
        image: "https://images.unsplash.com/photo-1587614295999-6c1c13675117?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        techs: ["DaVinci", "Final Cut"],
        color: "#FF0050",
        stats: { abonnés: "+50K", rétention: "65%" }
    }
];

const ProjectsSection = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const devScrollRef = useRef<HTMLDivElement>(null);
    const marketingScrollRef = useRef<HTMLDivElement>(null);
    const videoScrollRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const scrollContainer = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            const { current } = ref;
            const scrollAmount = direction === 'left' ? -current.offsetWidth + 50 : current.offsetWidth - 50;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projets"
            className="relative w-full py-24 lg:py-36 overflow-hidden bg-bg"
        >
            {/* Transition douce en haut et en bas */}
            <div className="absolute top-0 left-0 w-full h-[150px] bg-linear-to-b from-white to-transparent z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[150px] bg-linear-to-t from-white to-transparent z-0 pointer-events-none" />

            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-iris/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lavender/30 rounded-full blur-[200px]" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-xs mb-8">
                        <span className="w-2 h-2 rounded-full bg-iris animate-pulse" />
                        <span className="text-sm font-medium text-iris tracking-wide">Portfolio</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 leading-tight">
                        Nos Dernières <span className="text-transparent bg-clip-text bg-linear-to-r from-iris to-cyan">Réalisations</span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Découvrez quelques-uns de nos récents projets. Des solutions sur-mesure conçues pour répondre aux besoins spécifiques de nos clients avec les meilleures technologies.
                    </p>
                </div>

                {/* Projects dev Grid */}
                <div className="mb-8 mt-12 text-left">
                    <h3 className="text-2xl font-bold text-ink border-l-4 border-iris pl-4 flex items-center gap-3">
                        <div className="p-2 bg-iris/10 rounded-lg">
                            <FaCode className="text-iris animate-pulse" />
                        </div>
                        Développement Informatique
                    </h3>
                </div>

                <div className="relative group/slider">
                    {/* Floating Left Button */}
                    <button 
                        onClick={() => scrollContainer('left', devScrollRef)}
                        className="flex absolute left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-gray-600 hover:text-iris hover:border-iris/30 transition-all shadow-xl hover:scale-110 focus:outline-hidden opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 -mt-5 pointer-events-auto"
                        aria-label="Défiler à gauche"
                    >
                        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 pr-0.5 sm:pr-1" />
                    </button>
                    
                    {/* Floating Right Button */}
                    <button 
                        onClick={() => scrollContainer('right', devScrollRef)}
                        className="flex absolute right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-gray-600 hover:text-iris hover:border-iris/30 transition-all shadow-xl hover:scale-110 focus:outline-hidden opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 -mt-5 pointer-events-auto"
                        aria-label="Défiler à droite"
                    >
                        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 pl-0.5 sm:pl-1" />
                    </button>

                    <div 
                        ref={devScrollRef}
                        className="flex overflow-x-auto gap-6 sm:gap-8 pb-10 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                    >
                        {projectsDev.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] snap-start rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                            }}
                            onMouseEnter={() => setHoveredId(`dev-${index}`)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Card background with glow */}
                            <div
                                className="absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}15, transparent 40%)`
                                }}
                            />

                            <div className="relative bg-white border border-black/5 rounded-3xl overflow-hidden hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--card-color)]/20"
                                style={{ '--card-color': project.color } as React.CSSProperties}
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                    {/* Category badge */}
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-md border border-white/20 text-xs font-bold text-gray-800 rounded-full shadow-xs">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Stats overlay on hover */}
                                    <div className={`absolute bottom-5 left-5 right-5 z-20 transition-all duration-500 ${hoveredId === `dev-${index}` ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <div className="flex gap-4">
                                            {Object.entries(project.stats).map(([key, value]) => (
                                                <div key={key} className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 border border-white/50 shadow-sm">
                                                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                                                    <div className="text-sm font-bold text-gray-900">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--card-color)] transition-colors duration-300"
                                        style={{ '--card-color': project.color } as React.CSSProperties}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {project.techs.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/5 text-gray-600 bg-gray-50 transition-all duration-300 group-hover:border-[var(--card-color)]/30 group-hover:text-[var(--card-color)]"
                                                    style={{ '--card-color': project.color } as React.CSSProperties}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="shrink-0 w-12 h-12 rounded-full bg-gray-50 border border-black/5 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:bg-[var(--card-color)] group-hover:text-white group-hover:border-transparent group-hover:-rotate-45 group-hover:shadow-lg group-hover:shadow-[var(--card-color)]/30"
                                            style={{ '--card-color': project.color } as React.CSSProperties}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

                {/* Projects Marketing Grid */}
                <div className="mb-8 mt-20 text-left">
                    <h3 className="text-2xl font-bold text-ink border-l-4 border-[#F2A600] pl-4 flex items-center gap-3">
                        <div className="p-2 bg-[#F2A600]/10 rounded-lg">
                            <FaBullhorn className="text-[#F2A600] animate-bounce" style={{ animationDuration: '2s' }} />
                        </div>
                        Marketing Digital
                    </h3>
                </div>
                <div className="relative group/slider">
                    {/* Floating Left Button */}
                    <button 
                        onClick={() => scrollContainer('left', marketingScrollRef)}
                        className="flex absolute left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-gray-600 hover:text-iris hover:border-iris/30 transition-all shadow-xl hover:scale-110 focus:outline-hidden opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 -mt-5 pointer-events-auto"
                        aria-label="Défiler à gauche"
                    >
                        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 pr-0.5 sm:pr-1" />
                    </button>
                    
                    {/* Floating Right Button */}
                    <button 
                        onClick={() => scrollContainer('right', marketingScrollRef)}
                        className="flex absolute right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-gray-600 hover:text-iris hover:border-iris/30 transition-all shadow-xl hover:scale-110 focus:outline-hidden opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 -mt-5 pointer-events-auto"
                        aria-label="Défiler à droite"
                    >
                        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 pl-0.5 sm:pl-1" />
                    </button>

                    <div 
                        ref={marketingScrollRef}
                        className="flex overflow-x-auto gap-6 sm:gap-8 pb-10 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                    >
                    {projectsMarketing.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] snap-start rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                            }}
                            onMouseEnter={() => setHoveredId(`marketing-${index}`)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Card background with glow */}
                            <div
                                className="absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}15, transparent 40%)`
                                }}
                            />

                            <div className="relative bg-white border border-black/5 rounded-3xl overflow-hidden hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--card-color)]/20"
                                style={{ '--card-color': project.color } as React.CSSProperties}
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                    {/* Category badge */}
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-md border border-white/20 text-xs font-bold text-gray-800 rounded-full shadow-xs">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Stats overlay on hover */}
                                    <div className={`absolute bottom-5 left-5 right-5 z-20 transition-all duration-500 ${hoveredId === `marketing-${index}` ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <div className="flex gap-4">
                                            {Object.entries(project.stats).map(([key, value]) => (
                                                <div key={key} className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 border border-white/50 shadow-sm">
                                                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                                                    <div className="text-sm font-bold text-gray-900">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--card-color)] transition-colors duration-300"
                                        style={{ '--card-color': project.color } as React.CSSProperties}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {project.techs.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/5 text-gray-600 bg-gray-50 transition-all duration-300 group-hover:border-[var(--card-color)]/30 group-hover:text-[var(--card-color)]"
                                                    style={{ '--card-color': project.color } as React.CSSProperties}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="shrink-0 w-12 h-12 rounded-full bg-gray-50 border border-black/5 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:bg-[var(--card-color)] group-hover:text-white group-hover:border-transparent group-hover:-rotate-45 group-hover:shadow-lg group-hover:shadow-[var(--card-color)]/30"
                                            style={{ '--card-color': project.color } as React.CSSProperties}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

                {/* Projects Monteur video Grid */}
                <div className="mb-8 mt-20 text-left">
                    <h3 className="text-2xl font-bold text-ink border-l-4 border-[#FF0050] pl-4 flex items-center gap-3">
                        <div className="p-2 bg-[#FF0050]/10 rounded-lg">
                            <FaVideo className="text-[#FF0050] animate-pulse" />
                        </div>
                        Création & Montage Vidéo
                    </h3>
                </div>
                <div className="relative group/slider">
                    {/* Floating Left Button */}
                    <button 
                        onClick={() => scrollContainer('left', videoScrollRef)}
                        className="flex absolute left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-gray-600 hover:text-iris hover:border-iris/30 transition-all shadow-xl hover:scale-110 focus:outline-hidden opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 -mt-5 pointer-events-auto"
                        aria-label="Défiler à gauche"
                    >
                        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 pr-0.5 sm:pr-1" />
                    </button>
                    
                    {/* Floating Right Button */}
                    <button 
                        onClick={() => scrollContainer('right', videoScrollRef)}
                        className="flex absolute right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/95 backdrop-blur-sm border border-black/10 text-gray-600 hover:text-iris hover:border-iris/30 transition-all shadow-xl hover:scale-110 focus:outline-hidden opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 -mt-5 pointer-events-auto"
                        aria-label="Défiler à droite"
                    >
                        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 pl-0.5 sm:pl-1" />
                    </button>

                    <div 
                        ref={videoScrollRef}
                        className="flex overflow-x-auto gap-6 sm:gap-8 pb-10 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                    >
                    {projectsVideo.map((project, index) => (
                        <div
                            key={index}
                            className={`group relative shrink-0 w-[85vw] sm:w-[400px] lg:w-[450px] snap-start rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                            }}
                            onMouseEnter={() => setHoveredId(`video-${index}`)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Card background with glow */}
                            <div
                                className="absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}15, transparent 40%)`
                                }}
                            />

                            <div className="relative bg-white border border-black/5 rounded-3xl overflow-hidden hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--card-color)]/20"
                                style={{ '--card-color': project.color } as React.CSSProperties}
                            >
                                {/* Image */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                    {/* Category badge */}
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className="px-4 py-2 bg-white/95 backdrop-blur-md border border-white/20 text-xs font-bold text-gray-800 rounded-full shadow-xs">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Stats overlay on hover */}
                                    <div className={`absolute bottom-5 left-5 right-5 z-20 transition-all duration-500 ${hoveredId === `video-${index}` ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <div className="flex gap-4">
                                            {Object.entries(project.stats).map(([key, value]) => (
                                                <div key={key} className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 border border-white/50 shadow-sm">
                                                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                                                    <div className="text-sm font-bold text-gray-900">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--card-color)] transition-colors duration-300"
                                        style={{ '--card-color': project.color } as React.CSSProperties}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {project.techs.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/5 text-gray-600 bg-gray-50 transition-all duration-300 group-hover:border-[var(--card-color)]/30 group-hover:text-[var(--card-color)]"
                                                    style={{ '--card-color': project.color } as React.CSSProperties}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="shrink-0 w-12 h-12 rounded-full bg-gray-50 border border-black/5 flex items-center justify-center text-gray-500 transition-all duration-300 group-hover:bg-[var(--card-color)] group-hover:text-white group-hover:border-transparent group-hover:-rotate-45 group-hover:shadow-lg group-hover:shadow-[var(--card-color)]/30"
                                            style={{ '--card-color': project.color } as React.CSSProperties}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

                {/* CTA Link */}
                <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <a
                        href="#projets"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white border border-iris/20 text-iris font-semibold hover:border-iris hover:bg-iris/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,90,248,0.15)]"
                    >
                        Voir tous nos projets
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;