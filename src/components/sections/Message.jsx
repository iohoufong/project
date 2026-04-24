import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import FloralBorder from '../FloralBorder'

export default function Message() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative w-full flex items-center justify-center px-6 py-28 sm:py-36"
    >
      {/* Parallax textured backdrop */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 65%)',
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <FloralBorder color="#D4AF37" opacity={0.45} />

        <motion.p
          className="mt-8 uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.7rem)',
            letterSpacing: '7px',
            color: 'rgba(212,175,55,0.65)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          With joyful hearts
        </motion.p>

        <motion.p
          className="mt-6"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.35rem, 4.5vw, 1.9rem)',
            color: 'rgba(250,240,210,0.92)',
            lineHeight: 1.55,
            letterSpacing: '0.015em',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          We are getting married
          <br />
          and would love you
          <br />
          to join us
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <defs>
              <radialGradient id="starGold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F5E070" />
                <stop offset="60%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
            </defs>
            <path
              d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z"
              fill="url(#starGold)"
              opacity="0.8"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
