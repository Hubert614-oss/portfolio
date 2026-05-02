import { useEffect, useRef, useState } from 'react';

const TechStackSection = () => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
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
            color: 'from-rose to-pink-500',
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = itemsRef.current.indexOf(entry.target as HTMLDivElement);
                    if (index !== -1 && !visibleItems.includes(index)) {
                        setVisibleItems((prev) => [...prev, index]);
                    }
                }
            });
        }, { threshold: 0.1 });

        itemsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            itemsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [visibleItems]);

    return (
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
            {/* Fond parabolique avec dégradé */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-iris/10 to-lavender/20">
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
                        return (
                            <div key={service.id} className="mt-4">
                                <div className="flex flex-col">
                                    <div className="text-5xl mb-4">{service.icon}</div>
                                    <h3 className="text-2xl md:text-3xl font-bold">{service.category}</h3>
                                </div>
                                <div className="flex gap-96 mt-8">
                                    {service.items.map((item, idx) => {
                                        const itemIndex = startIdx + idx;
                                        const isVisible = visibleItems.includes(itemIndex);
                                        return (
                                            <div
                                                key={idx}
                                                ref={(el) => {
                                                    if (el) itemsRef.current[itemIndex] = el;
                                                }}
                                                className={`transition-all duration-700 ease-out transform ${
                                                    isVisible
                                                        ? 'opacity-100 translate-y-0'
                                                        : 'opacity-0 translate-y-8'
                                                }`}
                                                style={{
                                                    transitionDelay: isVisible ? `${idx * 150}ms` : '0ms',
                                                }}
                                            >
                                                <h4 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h4>
                                                <p className="text-gray-600 mb-2">{item.description}</p>
                                                <p className="text-sm text-iris font-semibold">{item.tech}</p>
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
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-6 text-lg">
                        Vous avez un projet? Parlons-en! Nous saurons quel service est le plus adapté.
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 bg-cyan text-white font-bold rounded-lg hover:bg-opacity-90 transition transform hover:-translate-y-1"
                    >
                        Démarrer votre projet
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;
