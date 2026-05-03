import { useEffect, useRef, useState } from 'react';
import logoArcDots from '../assets/logo_arc_dots.svg';

const TechStackSection = () => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const services = [
        {
            id: 1,
            category: 'Développement',
            icon: '💻',
            color: 'from-cyan to-blue-500',
            items: [
                {
                    name: 'Sites web',
                    description: 'Augmenter votre visibilité en ligne',
                    tech: 'React, Next.js'
                },
                {
                    name: 'Applications web',
                    description: 'Automatiser vos processus métier',
                    tech: 'React, TypeScript'
                },
                {
                    name: 'API / Backend',
                    description: 'Sécuriser et gérer vos données',
                    tech: 'Java, Node.js'
                },
            ]
        },
        {
            id: 2,
            category: 'Marketing',
            icon: '📈',
            color: 'from-purple-500 to-pink-500',
            items: [
                {
                    name: 'Social média',
                    description: 'Développer votre communauté',
                    tech: 'Stratégie digitale'
                },
                {
                    name: 'Publicité',
                    description: 'Générer des leads qualifiés',
                    tech: 'Facebook Ads, Google Ads'
                },
                {
                    name: 'SEO',
                    description: 'Apparaître en première page Google',
                    tech: 'Optimisation technique'
                },
            ]
        },
        {
            id: 3,
            category: 'Vidéo',
            icon: '🎬',
            color: 'from-purple-500 to-iris',
            items: [
                {
                    name: 'Montage vidéo',
                    description: 'Raconter votre histoire',
                    tech: 'Production vidéo'
                },
                {
                    name: 'Motion design',
                    description: 'Captiver votre audience',
                    tech: 'Animation 2D/3D'
                },
                {
                    name: 'Contenu réseaux sociaux',
                    description: 'Viraliser vos messages',
                    tech: 'Format court/Reels'
                },
            ]
        },
    ];

    useEffect(() => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('data-section-id');
                if (!id) return;

                setVisibleSections((prev) => {
                    const next = new Set(prev);
                    if (entry.isIntersecting) {
                        next.add(id);
                    } else {
                        next.delete(id);
                    }
                    return next;
                });
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const idx = entry.target.getAttribute('data-item-index');
                if (idx === null) return;
                const indexValue = Number(idx);

                setVisibleItems((prev) => {
                    const next = new Set(prev);
                    if (entry.isIntersecting) {
                        next.add(indexValue);
                    } else {
                        next.delete(indexValue);
                    }
                    return next;
                });
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        sectionRefs.current.forEach((el) => {
            if (el) sectionObserver.observe(el);
        });

        itemRefs.current.forEach((el) => {
            if (el) itemObserver.observe(el);
        });

        return () => {
            sectionObserver.disconnect();
            itemObserver.disconnect();
        };
    }, []);

    return (
        <section id="technos" className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Fond parabolique avec dégradé */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-white/30 to-lavender/15">
                <div className="absolute -right-16 top-2 w-80 h-80 sm:w-95 sm:h-95 md:w-115 md:h-115 lg:w-130 lg:h-130 pointer-events-none select-none arc-dots-orbit">
                    <img
                        src={logoArcDots}
                        alt=""
                        aria-hidden="true"
                        className="absolute right-0 top-1/2 w-55 sm:w-62.5 md:w-75 lg:w-85 -translate-y-1/2 opacity-40"
                    />
                </div>
                {/* Courbe parabolique supérieure */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-white"
                    style={{
                        borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                        transform: 'scaleX(1.5)',
                    }} />

                {/* Courbe parabolique inférieure */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white"
                    style={{
                        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                        transform: 'scaleX(1.5)',
                    }} />

                {/* Effet de brillance */}
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-iris/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-lavender/15 rounded-full blur-3xl opacity-25" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Titre et sous-titre */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-4 leading-tight">
                        Nos services
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        Nous vous proposons des solutions complètes pour booster votre activité. De la conception à l'exécution, nous vous accompagnons à chaque étape.
                    </p>
                </div>

                <div>
                    {services.map((service, serviceIdx) => {
                        const startIdx = serviceIdx * 3;
                        const isSectionVisible = visibleSections.has(String(service.id));
                        return (
                            <div
                                key={service.id}
                                data-section-id={service.id}
                                ref={(el) => { sectionRefs.current[serviceIdx] = el; }}
                                className={`mt-4 transition-all duration-700 ease-out ${
                                    isSectionVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-12'
                                }`}
                            >
                                <div className="flex flex-col">
                                    <div className={`text-5xl mb-4 transition-all duration-700 ease-out delay-100 ${
                                        isSectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                    }`}>
                                        {service.icon}
                                    </div>
                                    <h3 className={`text-2xl md:text-3xl font-bold transition-all duration-700 ease-out delay-150 ${
                                        isSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                                    }`}>
                                        {service.category}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                                    {service.items.map((item, idx) => {
                                        const itemIndex = startIdx + idx;
                                        const isItemVisible = visibleItems.has(itemIndex);
                                        return (
                                            <div
                                                key={idx}
                                                data-item-index={itemIndex}
                                                ref={(el) => { itemRefs.current[itemIndex] = el; }}
                                                className={`group relative p-6 rounded-2xl border border-gray-400  backdrop-blur-sm 
                                                    transition-all duration-700 ease-out
                                                    ${isItemVisible
                                                        ? 'opacity-100 translate-y-0'
                                                        : 'opacity-0 translate-y-10'
                                                    }
                                                    hover:shadow-xl hover:shadow-iris/10 hover:-translate-y-2 hover:bg-white/90
                                                    hover:border-iris/20
                                                `}
                                                style={{
                                                    transitionDelay: isItemVisible ? `${idx * 180}ms` : '0ms',
                                                }}
                                            >
                                                {/* Indicateur de couleur animé */}
                                                <div className={`absolute top-0 left-6 h-1 rounded-full bg-linear-to-r ${service.color}
                                                    transition-all duration-700 ease-out
                                                    ${isItemVisible ? 'w-12 opacity-100' : 'w-0 opacity-0'}
                                                `}
                                                style={{ transitionDelay: isItemVisible ? `${idx * 180 + 200}ms` : '0ms' }}
                                                />
                                                
                                                <h4 className={`text-lg font-bold text-gray-800 mb-2 transition-all duration-500 ${
                                                    isItemVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                                }`}
                                                style={{ transitionDelay: isItemVisible ? `${idx * 180 + 100}ms` : '0ms' }}
                                                >
                                                    {item.name}
                                                </h4>
                                                <p className={`text-gray-600 mb-2 transition-all duration-500 ${
                                                    isItemVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                                }`}
                                                style={{ transitionDelay: isItemVisible ? `${idx * 180 + 200}ms` : '0ms' }}
                                                >
                                                    {item.description}
                                                </p>
                                                <p className={`text-sm font-semibold bg-linear-to-r ${service.color} bg-clip-text text-transparent
                                                    transition-all duration-500 ${
                                                    isItemVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                                }`}
                                                style={{ transitionDelay: isItemVisible ? `${idx * 180 + 300}ms` : '0ms' }}
                                                >
                                                    {item.tech}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-b border-gray-300 py-5"></div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-16 md:mt-12">
                    <p className="text-gray-600 mb-6 text-lg">
                        Vous avez un projet? Parlons-en! Nous saurons quel service est le plus adapté.
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 mb-9 bg-cyan text-white font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan/30"
                    >
                        Démarrer votre projet
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;