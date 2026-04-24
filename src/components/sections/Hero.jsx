import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import FloralBorder from '../FloralBorder'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      delay: 0.15 + i * 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative w-full flex items-center justify-center px-6"
      style={{ minHeight: '100svh' }}
    >
      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(212,175,55,0.14) 0%, transparent 55%)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ y, opacity }}
      >
        {/* Bismillah */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p
            dir="rtl"
            lang="ar"
            style={{
              fontFamily: 'Amiri, "Noto Naskh Arabic", serif',
              fontSize: 'clamp(1.6rem, 5.5vw, 2.4rem)',
              color: 'rgba(240,220,160,0.92)',
              lineHeight: 1.6,
              filter: 'drop-shadow(0 2px 6px rgba(212,175,55,0.25))',
            }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p
            className="mt-2 uppercase"
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.55rem, 1.8vw, 0.68rem)',
              letterSpacing: '6px',
              color: 'rgba(212,175,55,0.55)',
            }}
          >
            In the name of God
          </p>
        </motion.div>

        <motion.div
          className="mt-8 w-full max-w-md"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <FloralBorder color="#D4AF37" opacity={0.5} />
        </motion.div>

        {/* Invitation line */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.65rem, 2.2vw, 0.8rem)',
            letterSpacing: '7px',
            color: 'rgba(212,175,55,0.75)',
            lineHeight: 1.8,
          }}
        >
          You are invited
          <br />
          to celebrate the wedding of
        </motion.p>

        {/* Names */}
        <motion.h1
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 leading-none"
          style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 'clamp(4.5rem, 18vw, 8.5rem)',
            background:
              'linear-gradient(135deg, #D4AF37 0%, #F5D870 35%, #FFF1B0 50%, #F0D060 65%, #A8880A 100%)',
            backgroundSize: '220% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
            filter:
              'drop-shadow(0 2px 10px rgba(212,175,55,0.4)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
            letterSpacing: '0.02em',
          }}
        >
          Nihal
        </motion.h1>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 my-2"
        >
          <div
            style={{
              width: 50,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)',
            }}
          />
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              color: 'rgba(240,220,160,0.7)',
            }}
          >
            &amp;
          </span>
          <div
            style={{
              width: 50,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)',
            }}
          />
        </motion.div>

        <motion.h1
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="leading-none"
          style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 'clamp(4.5rem, 18vw, 8.5rem)',
            background:
              'linear-gradient(135deg, #D4AF37 0%, #F5D870 35%, #FFF1B0 50%, #F0D060 65%, #A8880A 100%)',
            backgroundSize: '220% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
            animationDelay: '1s',
            filter:
              'drop-shadow(0 2px 10px rgba(212,175,55,0.4)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
            letterSpacing: '0.02em',
          }}
        >
          Hou
        </motion.h1>

        {/* Date line */}
        <motion.p
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
            letterSpacing: '6px',
            color: 'rgba(212,175,55,0.6)',
          }}
        >
          July 30 · 2026 · Salé, Morocco
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ bottom: 'max(env(safe-area-inset-bottom, 0px), 24px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0.4, 0.8] }}
          transition={{ duration: 3, delay: 2.5, repeat: Infinity }}
        >
          <span
            className="uppercase"
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 9,
              letterSpacing: 5,
              color: 'rgba(212,175,55,0.55)',
            }}
          >
            Scroll
          </span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="13"
              height="21"
              rx="6.5"
              stroke="rgba(212,175,55,0.55)"
              strokeWidth="0.8"
            />
            <motion.circle
              cx="7"
              cy="6"
              r="1.6"
              fill="rgba(212,175,55,0.8)"
              animate={{ cy: [6, 14, 6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
