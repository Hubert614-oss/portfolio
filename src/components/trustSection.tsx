import { useState, useEffect, useCallback } from 'react';

const projects = [
  {
    id: 1,
    name: 'ROHY',
    logo: 'ROHY',
    description: 'Rohy est une plateforme innovante conçue pour faciliter la connectivité professionnelle au sein de la diaspora malagasy.',
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/226375735/original/beab9e6b1d01fb6428ddeda42e3a05bb162145e3/create-a-mobile-app-and-website-ui-ux-design.jpg',
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 2,
    name: 'HEI-ADMIN',
    logo: 'HEI',
    description: 'HEI Admin est un outil de gestion scolaire de la Haute École d\'Informatique de Madagascar (HEI).',
    image: 'https://www.codeur.com/blog/wp-content/uploads/2021/09/3.creer_maquette_site_web_wireframe.png',
    color: 'from-indigo-900 to-purple-900'
  },
  {
    id: 3,
    name: 'KIS',
    logo: 'KIS',
    description: 'C\'est un outil de gestion scolaire la HKM by KIS Madagascar (KIS).',
    image: 'https://img.freepik.com/photos-gratuite/jeune-pigiste-editant-sequences-logiciel-travaillant-edition-montage-video-etalonnage-couleurs-effets-audio-contenu-production-sonore-cinematographique-realisation-films-creatifs-ordinateur_482257-49854.jpg?semt=ais_hybrid&w=740&q=80',
    color: 'from-purple-500 to-purple-700'
  }
];

const TrustSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const activeProject = projects[activeIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + projects.length + 1) % projects.length) - 1;
    
    if (normalizedDiff === 0) {
      // Carte active (centre)
      return {
        transform: 'translateX(0) scale(1.1) translateZ(100px)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
      };
    } else if (normalizedDiff === -1 || normalizedDiff === 2) {
      // Carte gauche
      return {
        transform: 'translateX(-85%) scale(0.85) translateZ(-50px) rotateY(8deg)',
        zIndex: 20,
        opacity: 0.7,
        filter: 'brightness(0.85)',
      };
    } else {
      // Carte droite
      return {
        transform: 'translateX(85%) scale(0.85) translateZ(-50px) rotateY(-8deg)',
        zIndex: 20,
        opacity: 0.7,
        filter: 'brightness(0.85)',
      };
    }
  };

  return (
    <section id="confiance" className="relative w-full overflow-hidden py-20 lg:py-28">
      {/* Fond parabolique avec dégradé violet */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-purple-200 to-purple-300">
        {/* Courbe parabolique supérieure */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-white" 
             style={{
               borderRadius: '0 0 50% 50% / 0 0 100% 100%',
               transform: 'scaleX(1.5)',
             }} />
        
        {/* Courbe parabolique inférieure */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white"
             style={{
               borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
               transform: 'scaleX(1.5)',
             }} />
        
        {/* Effet de brillance/vague */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="text-center mb-1 p-18 sm:p-6 md:p-18 lg:p-20">
          <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-purple-900 leading-tight">
            Ils nous ont fait confiance,
            <br />
            <span className="text-purple-800">faites comme eux !</span>
          </h2>
        </div>

        {/* Carrousel 3D */}
        <div 
          className="relative hidden md:flex h-125 md:h-137.5 items-center justify-center perspective-1000"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            
            return (
              <div
                key={project.id}
                className="absolute w-full max-w-md transition-all duration-700 ease-out cursor-pointer"
                style={{
                  ...style,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`bg-linear-to-br ${project.color}  overflow-hidden shadow-2xl`}>
                  {/* Header de la carte */}
                  <div className="px-6 py-4 flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg tracking-wider">
                      {project.name}
                    </h3>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-sm">
                        {project.logo}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-6 pb-4">
                    <p className="text-purple-100 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Image du projet */}
                  <div className="px-4 pb-4">
                    <div className="relative overflow-hidden bg-white/10 backdrop-blur-sm">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                      />
                      {/* Overlay subtil */}
                      <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 to-transparent" />
                    </div>
                  </div>

                  {/* Badge flottant (pour HEI-Admin) */}
                  {project.name === 'HEI-ADMIN' && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carrousel mobile simplifie */}
        <div className="-mt-3 flex flex-col items-center md:hidden">
          <div
            className={`w-full max-w-sm overflow-hidden rounded-2xl bg-linear-to-br ${activeProject.color} shadow-2xl`}
          >
            <div className="px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg tracking-wider">
                {activeProject.name}
              </h3>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-sm">
                  {activeProject.logo}
                </span>
              </div>
            </div>

            <div className="px-6 pb-4">
              <p className="text-purple-100 text-sm leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            <div className="px-4 pb-4">
              <div className="relative overflow-hidden bg-white/10 backdrop-blur-sm">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 to-transparent" />
              </div>
            </div>

            {activeProject.name === 'HEI-ADMIN' && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              className="h-9 w-9 rounded-full border border-purple-200 text-purple-700 bg-white/80 shadow-sm"
              aria-label="Projet precedent"
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-purple-700 w-6'
                      : 'bg-purple-300'
                  }`}
                  aria-label={`Aller au projet ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="h-9 w-9 rounded-full border border-purple-200 text-purple-700 bg-white/80 shadow-sm"
              aria-label="Projet suivant"
            >
              ›
            </button>
          </div>
        </div>

        {/* Indicateurs de pagination */}
        {/* <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-purple-700 w-8' 
                  : 'bg-purple-300 hover:bg-purple-400'
              }`}
              aria-label={`Aller au projet ${index + 1}`}
            />
          ))}
        </div> */}

        {/* Boutons de navigation */}
        
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default TrustSection;