
import '../assets/styleDeco.css'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import logoVictus from "../assets/logo victus.webp";

type BoxAnimatedProps = {
    onClick?: () => void
}

const BoxAnimated = ({ onClick }: BoxAnimatedProps) => {
    const dragBoundsRef = useRef<HTMLDivElement>(null)
    const scrollTimeoutRef = useRef<number | null>(null)
    const [isScrolling, setIsScrolling] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", () => {
        setIsScrolling(true)
        if (scrollTimeoutRef.current) {
            window.clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
            setIsScrolling(false)
        }, 160)
    })

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current)
            }
        }
    }, [])

    return (
        <>
            <div ref={dragBoundsRef} className="pointer-events-none fixed inset-0 z-50">
                <motion.div
                    drag
                    dragConstraints={dragBoundsRef}
                    dragElastic={0.15}
                    dragMomentum={false}
                    animate={{
                        opacity: isScrolling ? 0.5 : 1,
                        scale: isScrolling ? 0.96 : 1,
                        y: isScrolling ? 6 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={onClick}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            onClick?.()
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Ouvrir les reseaux sociaux"
                    className="pointer-events-auto absolute bottom-4 right-4 sm:bottom-6 sm:right-6 cursor-grab active:cursor-grabbing touch-none"
                >
                    <div className="contenais relative w-20 h-20 sm:w-24 sm:h-24">
                        <div className="box" aria-hidden="true"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="w-14 h-14 sm:w-16 sm:h-16">
                                <img
                                    src={logoVictus}
                                    alt="Victus logo"
                                    className="w-full h-full rounded-full object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.25)]"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default BoxAnimated