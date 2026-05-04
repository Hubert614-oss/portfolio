import { useState, useRef, useEffect } from "react";
import ServiceCard from "./serviceCard2";
import { DevicesIcon, MonitorIcon, GlobeIcon } from "./serviceIcon";
import type { ServiceItem } from "./types";

export default function Service() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPaused = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const SPEED = 0.25; // pixels per frame, tweak for speed

  // pause auto-scroll
  function pauseAuto() {
    isPaused.current = true;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }

  // resume auto-scroll
  function resumeAuto() {
    if (!isPaused.current) return;
    isPaused.current = false;
    rafRef.current = requestAnimationFrame(animate);
  }

  // animation loop
  function animate() {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    // move viewport
    vp.scrollLeft += SPEED;
    // reset seamlessly when passed half of track (since items duplicated)
    const half = track.scrollWidth / 2;
    if (vp.scrollLeft >= half) {
      vp.scrollLeft = vp.scrollLeft - half;
    }
    rafRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    // start animation
    isPaused.current = false;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeadingVisible(true);
          } else {
            setIsHeadingVisible(false);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );

    if (headingRef.current) observer.observe(headingRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const items: ServiceItem[] = [
    {
      id: 1,
      title: `Développement`,
      description: `Sites web (React, Next.js, etc.)\nApplications web\nAPI / Backend`,
      Icon: DevicesIcon,
    },
    {
      id: 2,
      title: `Marketing`,
      description: `Social media\nPublicité (Facebook Ads, Google Ads)\nSEO`,
      Icon: MonitorIcon,
    },
    {
      id: 3,
      title: `Vidéo`,
      description: `Montage vidéo\nMotion design\nContenu pour réseaux sociaux`,
      Icon: GlobeIcon,
    },
  ];

  return (
    <div className="bg-linear-to-b from-white via-lavender/20 to-white">
      <section id="services" className="relative py-20 px-6 max-w-6xl mx-auto">
        <div className="absolute top-6 right-6" aria-hidden>
          <img
            src="/src/assets/logo_arc_dots.svg"
            className="w-24 h-auto animate-spin-slow"
          />
          <style>{`
            @keyframes spin-slow {
            to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
            }
        `}</style>
        </div>

        <div
          ref={headingRef}
          className={`text-center mb-4 transition-all duration-700 ease-out ${isHeadingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D1470] leading-tight">
            Nous développons plus
            <br />
            qu'un site web :
          </h2>
          <p className="mt-5 text-gray-500 text-base font-normal">
            Nous sommes bien plus qu'une agence de création de site web
          </p>
        </div>

        {/* Infinite horizontal carousel (JS-driven scroll) */}
        <div className="relative mt-14">
          <div
            className="overflow-hidden"
            onMouseEnter={() => {
              pauseAuto();
            }}
            onMouseLeave={() => {
              resumeAuto();
            }}
          >
            <div className="scroll-viewport no-scrollbar" ref={viewportRef}>
              <div className="scroll-track flex items-stretch" ref={trackRef}>
                {/** duplicate items for seamless loop */}
                {[...items, ...items].map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="px-3">
                    <ServiceCard
                      item={item}
                      selected={selectedId === item.id}
                      onSelect={(id) =>
                        setSelectedId(id === selectedId ? null : id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prev/Next controls */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              aria-label="Précédent"
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow ml-2 flex items-center justify-center"
              onClick={() => {
                const viewport = viewportRef.current;
                if (!viewport) return;
                pauseAuto();
                const visible = window.innerWidth >= 768 ? 3 : 1;
                const amount = Math.round(viewport.clientWidth / visible);
                viewport.scrollBy({ left: -amount, behavior: "smooth" });
                // resume after short delay
                resumeTimeoutRef.current = window.setTimeout(
                  () => resumeAuto(),
                  2200,
                );
              }}
            >
              ‹
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              aria-label="Suivant"
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow mr-2 flex items-center justify-center"
              onClick={() => {
                const viewport = viewportRef.current;
                if (!viewport) return;
                pauseAuto();
                const visible = window.innerWidth >= 768 ? 3 : 1;
                const amount = Math.round(viewport.clientWidth / visible);
                viewport.scrollBy({ left: amount, behavior: "smooth" });
                // resume after short delay
                resumeTimeoutRef.current = window.setTimeout(
                  () => resumeAuto(),
                  2200,
                );
              }}
            >
              ›
            </button>
          </div>

          <style>{`
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .scroll-viewport { width: 100%; overflow-x: auto; scroll-behavior: smooth; }
            .scroll-track { display: flex; gap: 0.5rem; align-items: stretch; width: max-content; }
            .card-item { flex: 0 0 100%; max-width: 100%; }
            @media (min-width: 768px) { .card-item { flex: 0 0 33.3333%; max-width: 33.3333%; } }
            `}</style>
        </div>
      </section>
      <section className="relative py-16 px-6">
        {/* Top-left purple blob */}
        <div className="absolute top-0 left-4">
          <div className="w-7 h-7 rounded-full bg-[#611d95] animate-bounce"></div>
        </div>
        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D1470] text-center leading-tight mb-10">
            Collaborons d'une manière
            <br />
            ou d'une autre !
          </h2>
          {/* Body: image left + content right */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left: image + dot arc */}
            <div className="relative shrink-0 w-full md:w-150">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Deux développeurs collaborant devant un écran"
                className="rounded-xl w-full object-cover h-95"
              />
              {/* Dot arc SVG bottom-left of image */}
              <div className="absolute -bottom-10 -left-4">
                <svg
                  width={100}
                  height={100}
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(100,110)">
                    {/* Arc 1 r=30 */}
                    <circle
                      className="dot"
                      cx={-17}
                      cy={-25}
                      r={3}
                      opacity="0.9"
                    />
                    <circle
                      className="dot"
                      cx={-29}
                      cy={-10}
                      r={3}
                      opacity="0.9"
                    />
                    <circle
                      className="dot"
                      cx={-30}
                      cy={6}
                      r={3}
                      opacity="0.85"
                    />
                    <circle
                      className="dot"
                      cx={-22}
                      cy={21}
                      r={3}
                      opacity="0.8"
                    />
                    {/* Arc 2 r=50 */}
                    <circle
                      className="dot"
                      cx={-13}
                      cy={-48}
                      r="3.5"
                      opacity="0.88"
                    />
                    <circle
                      className="dot"
                      cx={-33}
                      cy={-38}
                      r="3.5"
                      opacity="0.88"
                    />
                    <circle
                      className="dot"
                      cx={-46}
                      cy={-21}
                      r="3.5"
                      opacity="0.85"
                    />
                    <circle
                      className="dot"
                      cx={-50}
                      cy={-2}
                      r="3.5"
                      opacity="0.8"
                    />
                    <circle
                      className="dot"
                      cx={-46}
                      cy={18}
                      r="3.5"
                      opacity="0.72"
                    />
                    <circle
                      className="dot"
                      cx={-34}
                      cy={35}
                      r={3}
                      opacity="0.62"
                    />
                    {/* Arc 3 r=70 */}
                    <circle
                      className="dot"
                      cx={-4}
                      cy={-69}
                      r="3.5"
                      opacity="0.78"
                    />
                    <circle
                      className="dot"
                      cx={-25}
                      cy={-64}
                      r="3.5"
                      opacity="0.78"
                    />
                    <circle
                      className="dot"
                      cx={-46}
                      cy={-52}
                      r="3.5"
                      opacity="0.73"
                    />
                    <circle
                      className="dot"
                      cx={-62}
                      cy={-34}
                      r="3.5"
                      opacity="0.66"
                    />
                    <circle
                      className="dot"
                      cx={-70}
                      cy={-12}
                      r="3.5"
                      opacity="0.58"
                    />
                    <circle
                      className="dot"
                      cx={-68}
                      cy={11}
                      r={3}
                      opacity="0.49"
                    />
                    <circle
                      className="dot"
                      cx={-58}
                      cy={32}
                      r={3}
                      opacity="0.4"
                    />
                    <circle
                      className="dot"
                      cx={-40}
                      cy={50}
                      r={3}
                      opacity="0.31"
                    />
                    {/* Arc 4 r=92 */}
                    <circle
                      className="dot"
                      cx={6}
                      cy={-91}
                      r={3}
                      opacity="0.6"
                    />
                    <circle
                      className="dot"
                      cx={-18}
                      cy={-88}
                      r={3}
                      opacity="0.6"
                    />
                    <circle
                      className="dot"
                      cx={-42}
                      cy={-80}
                      r={3}
                      opacity="0.56"
                    />
                    <circle
                      className="dot"
                      cx={-64}
                      cy={-65}
                      r={3}
                      opacity="0.5"
                    />
                    <circle
                      className="dot"
                      cx={-81}
                      cy={-44}
                      r={3}
                      opacity="0.43"
                    />
                    <circle
                      className="dot"
                      cx={-91}
                      cy={-19}
                      r="2.5"
                      opacity="0.36"
                    />
                    <circle
                      className="dot"
                      cx={-91}
                      cy={7}
                      r="2.5"
                      opacity="0.28"
                    />
                    <circle
                      className="dot"
                      cx={-81}
                      cy={33}
                      r="2.5"
                      opacity="0.21"
                    />
                    <circle
                      className="dot"
                      cx={-63}
                      cy={55}
                      r={2}
                      opacity="0.14"
                    />
                    {/* Arc 5 r=114 outer */}
                    <circle
                      className="dot"
                      cx={18}
                      cy={-112}
                      r="2.5"
                      opacity="0.42"
                    />
                    <circle
                      className="dot"
                      cx={-9}
                      cy={-113}
                      r="2.5"
                      opacity="0.42"
                    />
                    <circle
                      className="dot"
                      cx={-36}
                      cy={-107}
                      r="2.5"
                      opacity="0.38"
                    />
                    <circle
                      className="dot"
                      cx={-61}
                      cy={-93}
                      r="2.5"
                      opacity="0.33"
                    />
                    <circle
                      className="dot"
                      cx={-83}
                      cy={-73}
                      r="2.5"
                      opacity="0.28"
                    />
                    <circle
                      className="dot"
                      cx={-100}
                      cy={-47}
                      r={2}
                      opacity="0.22"
                    />
                    <circle
                      className="dot"
                      cx={-112}
                      cy={-18}
                      r={2}
                      opacity="0.16"
                    />
                    <circle
                      className="dot"
                      cx={-113}
                      cy={12}
                      r={2}
                      opacity="0.11"
                    />
                    <circle
                      className="dot"
                      cx={-105}
                      cy={40}
                      r="1.5"
                      opacity="0.07"
                    />
                  </g>
                </svg>
              </div>
            </div>
            {/* Right: text content */}
            <div className="flex-1">
              <p className="text-gray-500 text-sm text-center md:text-left mb-8">
                Nous pouvons collaborer de deux manières
              </p>
              {/* Two columns of services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Option 1: Gestion complète */}
                <div>
                  {/* Briefcase icon */}
                  <div className="mb-4">
                    <svg
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x={2}
                        y={12}
                        width={32}
                        height={20}
                        rx={3}
                        stroke="#7C3AED"
                        strokeWidth={2}
                        fill="none"
                      />
                      <path
                        d="M12 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"
                        stroke="#7C3AED"
                        strokeWidth={2}
                        fill="none"
                      />
                      <line
                        x1={2}
                        y1={22}
                        x2={34}
                        y2={22}
                        stroke="#7C3AED"
                        strokeWidth={2}
                      />
                      <line
                        x1={16}
                        y1={20}
                        x2={20}
                        y2={20}
                        stroke="#7C3AED"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#7C3AED] leading-snug mb-3">
                    Gestion complète
                    <br />
                    du projet
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    Vous nous confiez votre projet de A à Z, on s'attelle sur ce
                    beau projet et on vous rendra compte régulièrement jusqu'à
                    la livraison du produits. Nous mettrons nos talents sur
                    votre projet !
                  </p>
                </div>
                {/* Option 2: Mise à disposition */}
                <div>
                  {/* Star icon */}
                  <div className="mb-4">
                    <svg
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="18,3 21.9,13.1 33,13.1 23.7,19.7 27.6,29.8 18,23.2 8.4,29.8 12.3,19.7 3,13.1 14.1,13.1"
                        stroke="#D4A017"
                        strokeWidth={2}
                        fill="none"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#7C3AED] leading-snug mb-3">
                    Mise à disposition
                    <br />
                    de talents
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nous mettons à votre disposition pour la durée de votre
                    choix un (ou plusieurs talents de chez nous pour étoffer
                    votre équipe technique !
                  </p>
                </div>
              </div>
              {/* Bottom note */}
              <p className="mt-10 text-gray-500 text-sm">
                Choisissez la meilleure manière de collaborer et qui convient le
                mieux à vos attentes et besoins.
              </p>
            </div>
          </div>
        </div>
        {/* Bottom decorative wave */}
        <div className="wave-bottom" />
      </section>
    </div>
  );
}
