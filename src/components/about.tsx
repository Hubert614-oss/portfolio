import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import {
  IoSparklesOutline,
  IoRocketOutline,
  IoTrendingUpOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5'

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, -24],
  )
  const leftY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [18, -18],
  )
  const rightY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-18, 18],
  )
  const orbTopY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-24, 24],
  )
  const orbBottomY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, -24],
  )

  const highlights = [
    {
      title: 'Approche sur-mesure',
      description:
        'Chaque mission commence par un diagnostic clair et des objectifs prioritaires.',
      icon: <IoSparklesOutline size={22} />,
    },
    {
      title: 'Exécution rapide',
      description:
        'Des sprints courts, des validations régulières et des livrables concrets.',
      icon: <IoRocketOutline size={22} />,
    },
    {
      title: 'Impact mesurable',
      description:
        'Des résultats suivis avec des KPI et des optimisations continues.',
      icon: <IoTrendingUpOutline size={22} />,
    },
  ]

  const stats = [
    { value: 50, suffix: '+', label: 'Projets livrés' },
    { value: 30, suffix: '+', label: 'Clients actifs' },
    { value: 8, suffix: '', label: 'Années d\'expérience' },
  ]

  const tags = ['UX/UI', 'Développement web', 'Marketing digital', 'Production vidéo']

  // Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  }

  const statVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  // Compteur animé
  const AnimatedCounter = ({
    value,
    suffix,
    label,
    delay,
    start,
  }: {
    value: number
    suffix: string
    label: string
    delay: number
    start: boolean
  }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!start) return
      if (reduceMotion) {
        setCount(value)
        return
      }

      let frameId: number | null = null
      const duration = 1800
      const end = value
      const startTime = performance.now()

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration)
        setCount(Math.floor(progress * end))
        if (progress < 1) frameId = requestAnimationFrame(tick)
      }

      const timer = window.setTimeout(() => {
        frameId = requestAnimationFrame(tick)
      }, delay * 150)

      return () => {
        window.clearTimeout(timer)
        if (frameId) cancelAnimationFrame(frameId)
      }
    }, [start, value, delay, reduceMotion])

    return (
      <motion.div
        variants={statVariants}
        className="rounded-2xl border border-white/60 bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm"
      >
        <div className="text-2xl font-extrabold text-gray-900">
          {count}
          {suffix}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wider text-gray-500">
          {label}
        </div>
      </motion.div>
    )
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background décoratif animé */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-lavender/20 to-white" />
      <motion.div
        style={{ y: orbTopY }}
        animate={
          isInView && !reduceMotion
            ? { scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }
            : { scale: 1, opacity: 0.12 }
        }
        transition={
          isInView && !reduceMotion
            ? { duration: 10, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan/15 blur-3xl"
      />
      <motion.div
        style={{ y: orbBottomY }}
        animate={
          isInView && !reduceMotion
            ? { scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }
            : { scale: 1, opacity: 0.1 }
        }
        transition={
          isInView && !reduceMotion
            ? { duration: 10, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }
        }
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-iris/10 blur-3xl"
      />

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Colonne Gauche */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ y: leftY }}
          >
            <motion.span
              variants={leftVariants}
              className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan"
            >
              <motion.span
                animate={
                  !reduceMotion && isInView
                    ? { rotate: [0, 15, -15, 0] }
                    : { rotate: 0 }
                }
                transition={
                  !reduceMotion && isInView
                    ? { duration: 2, repeat: Infinity, repeatDelay: 3 }
                    : { duration: 0 }
                }
              >
                <IoSparklesOutline size={16} />
              </motion.span>
              À propos
            </motion.span>

            <motion.h2
              variants={leftVariants}
              className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl"
            >
              VICTUS, agence digitale{' '}
              <span className="bg-linear-to-r from-cyan to-iris bg-clip-text text-transparent">
                orientée résultats
              </span>
            </motion.h2>

            <motion.p
              variants={leftVariants}
              className="mt-6 text-lg leading-relaxed text-gray-600"
            >
              Nous accompagnons les marques ambitieuses de la stratégie à la mise en
              ligne, avec une attention constante à la performance et à l'esthétique.
            </motion.p>

            <motion.p
              variants={leftVariants}
              className="mt-4 text-lg leading-relaxed text-gray-600"
            >
              Notre équipe combine design, développement et marketing pour créer des
              expériences digitales utiles, cohérentes et mémorables.
            </motion.p>

            <motion.div
              variants={leftVariants}
              className="mt-8 flex flex-wrap gap-3"
            >
              {tags.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.08, y: -2 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur-sm cursor-default"
                >
                  <IoCheckmarkCircleOutline size={16} className="text-cyan" />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Colonne Droite */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-5"
            style={{ y: rightY }}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.01,
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)',
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 20 }
                }
                className="group rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm cursor-default"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan to-iris text-white shadow-lg shadow-cyan/20"
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats avec compteurs animés */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-3 gap-4 pt-2"
            >
              {stats.map((stat, index) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={index}
                  start={isInView}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutSection