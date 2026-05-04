import { useEffect, useRef, useState } from 'react';
import {
    SiReact, SiVuedotjs, SiFlutter, SiLaravel, SiNestjs, SiNextdotjs,
    SiNodedotjs, SiExpress, SiHtml5, SiCss, SiRedis, SiDocker,
    SiMysql, SiPostgresql, SiSocketdotio, SiGithubactions
} from 'react-icons/si';
import './techStackSection.css';

const TechStackSection = () => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    
    const techItems = [
        { name: 'React.js', icon: SiReact, slogan: 'UI Interactive', hoverColor: 'group-hover:text-[#61DAFB]', glowColor: '#61DAFB' },
        { name: 'Vue.js', icon: SiVuedotjs, slogan: 'Progressive FW', hoverColor: 'group-hover:text-[#4FC08D]', glowColor: '#4FC08D' },
        { name: 'Flutter', icon: SiFlutter, slogan: 'Mobile Cross-platform', hoverColor: 'group-hover:text-[#02569B]', glowColor: '#02569B' },
        { name: 'Laravel', icon: SiLaravel, slogan: 'PHP Artisan', hoverColor: 'group-hover:text-[#FF2D20]', glowColor: '#FF2D20' },
        { name: 'Nest.js', icon: SiNestjs, slogan: 'Scalable Node', hoverColor: 'group-hover:text-[#E0234E]', glowColor: '#E0234E' },
        { name: 'Next.js', icon: SiNextdotjs, slogan: 'React Framework', hoverColor: 'group-hover:text-white', glowColor: '#ffffff' },
        { name: 'Node.js', icon: SiNodedotjs, slogan: 'Backend JS', hoverColor: 'group-hover:text-[#339933]', glowColor: '#339933' },
        { name: 'Express', icon: SiExpress, slogan: 'Fast Web FW', hoverColor: 'group-hover:text-gray-400', glowColor: '#808080' },
        { name: 'HTML5', icon: SiHtml5, slogan: 'Structure Web', hoverColor: 'group-hover:text-[#E34F26]', glowColor: '#E34F26' },
        { name: 'CSS3', icon: SiCss, slogan: 'Design Web', hoverColor: 'group-hover:text-[#1572B6]', glowColor: '#1572B6' },
        { name: 'Redis', icon: SiRedis, slogan: 'In-Memory Cache', hoverColor: 'group-hover:text-[#DC382D]', glowColor: '#DC382D' },
        { name: 'Docker', icon: SiDocker, slogan: 'Containerization', hoverColor: 'group-hover:text-[#2496ED]', glowColor: '#2496ED' },
        { name: 'MySQL', icon: SiMysql, slogan: 'Relational DB', hoverColor: 'group-hover:text-[#4479A1]', glowColor: '#4479A1' },
        { name: 'PostgreSQL', icon: SiPostgresql, slogan: 'Advanced DB', hoverColor: 'group-hover:text-[#4169E1]', glowColor: '#4169E1' },
        { name: 'Socket.io', icon: SiSocketdotio, slogan: 'Real-time Web', hoverColor: 'group-hover:text-white', glowColor: '#ffffff' },
        { name: 'DevOps', icon: SiGithubactions, slogan: 'CI/CD & Cloud', hoverColor: 'group-hover:text-[#2088FF]', glowColor: '#2088FF' },
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

    const duplicatedItems = [...techItems, ...techItems, ...techItems, ...techItems];

    return (
        <section className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden bg-[#0a0a1a]">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-[10%] w-2 h-2 bg-[#61DAFB] rounded-full opacity-40 animate-float" />
                <div className="absolute top-20 right-[20%] w-1.5 h-1.5 bg-[#4FC08D] rounded-full opacity-30 animate-float-delayed" />
                <div className="absolute top-40 left-[60%] w-1 h-1 bg-[#FF2D20] rounded-full opacity-50 animate-float" />
                <div className="absolute bottom-20 left-[15%] w-2 h-2 bg-[#2496ED] rounded-full opacity-30 animate-float-delayed" />
                <div className="absolute bottom-40 right-[10%] w-1.5 h-1.5 bg-[#E0234E] rounded-full opacity-40 animate-float" />
                <div className="absolute top-1/2 left-[5%] w-1 h-1 bg-[#4169E1] rounded-full opacity-50 animate-float-delayed" />
                
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06b6d4]/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-[150px]" />
            </div>

            {/* Grid pattern overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title and subtitle */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-medium text-gray-300 tracking-wide">Notre Stack Technologique</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Nos <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8b5cf6] via-[#06b6d4] to-[#8b5cf6] animate-gradient">Services</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
                        Nous vous proposons des solutions complètes pour booster votre activité. De la conception à l'exécution, nous vous accompagnons à chaque étape.
                    </p>
                </div>

                {/* Tech marquee - left direction */}
                <div className="relative left-1/2 right-1/2 mx-[-50vw] w-screen mb-4">
                    <div className="tech-marquee py-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 lg:w-48 bg-linear-to-r from-[#0a0a1a] via-[#0a0a1a]/90 to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 lg:w-48 bg-linear-to-l from-[#0a0a1a] via-[#0a0a1a]/90 to-transparent z-10" />
                        
                        <div className="tech-marquee-track items-center gap-5 sm:gap-7 px-6">
                            {duplicatedItems.map((tech, index) => {
                                const Icon = tech.icon;
                                return (
                                    <div
                                        key={`${tech.name}-${index}`}
                                        className="group relative inline-flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm px-6 py-4 shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-(--glow-color)/10 hover:border-white/20 hover:-translate-y-1 hover:scale-105 cursor-pointer"
                                        style={{ '--glow-color': tech.glowColor } as React.CSSProperties}
                                    >
                                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className={`relative text-3xl text-gray-500 transition-all duration-500 ${tech.hoverColor} group-hover:scale-110`} style={{ filter: 'none' }}>
                                            <Icon className="transition-all duration-500 group-hover:drop-shadow-[0_0_8px_var(--glow-color)]" />
                                        </div>
                                        <div className="relative flex flex-col">
                                            <span className="text-sm font-bold text-gray-200 transition-colors duration-300 group-hover:text-white">
                                                {tech.name}
                                            </span>
                                            <span className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                                                {tech.slogan}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Tech marquee - reverse direction */}
                <div className="relative left-1/2 right-1/2 mx-[-50vw] w-screen">
                    <div className="tech-marquee-reverse py-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 lg:w-48 bg-linear-to-r from-[#0a0a1a] via-[#0a0a1a]/90 to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 lg:w-48 bg-linear-to-l from-[#0a0a1a] via-[#0a0a1a]/90 to-transparent z-10" />
                        
                        <div className="tech-marquee-track-reverse items-center gap-5 sm:gap-7 px-6">
                            {[...duplicatedItems].reverse().map((tech, index) => {
                                const Icon = tech.icon;
                                return (
                                    <div
                                        key={`reverse-${tech.name}-${index}`}
                                        className="group relative inline-flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm px-6 py-4 shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-(--glow-color)/10 hover:border-white/20 hover:-translate-y-1 hover:scale-105 cursor-pointer"
                                        style={{ '--glow-color': tech.glowColor } as React.CSSProperties}
                                    >
                                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className={`relative text-3xl text-gray-500 transition-all duration-500 ${tech.hoverColor} group-hover:scale-110`}>
                                            <Icon className="transition-all duration-500 group-hover:drop-shadow-[0_0_8px_var(--glow-color)]" />
                                        </div>
                                        <div className="relative flex flex-col">
                                            <span className="text-sm font-bold text-gray-200 transition-colors duration-300 group-hover:text-white">
                                                {tech.name}
                                            </span>
                                            <span className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                                                {tech.slogan}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <p className="text-gray-400 mb-8 text-lg">
                        Vous avez un projet? Parlons-en! Nous saurons quel service est le plus adapté.
                    </p>
                    <a
                        href="#contact"
                        className="group relative inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-[#7c3aed] to-[#06b6d4] text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:-translate-y-1"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-[#06b6d4] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative">Démarrer votre projet</span>
                        <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TechStackSection;