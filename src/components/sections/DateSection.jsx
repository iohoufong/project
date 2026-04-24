import { motion } from 'framer-motion'
import Countdown from '../Countdown'

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div
        style={{
          width: 60,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
        }}
      />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z"
          fill="rgba(212,175,55,0.7)"
        />
      </svg>
      <div
        style={{
          width: 60,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
        }}
      />
    </div>
  )
}

export default function DateSection() {
  return (
    <section className="relative w-full flex items-center justify-center px-6 py-24 sm:py-32">
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-xl w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.7rem)',
            letterSpacing: '7px',
            color: 'rgba(212,175,55,0.65)',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Save the date
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GoldDivider />
        </motion.div>

        {/* Day of week */}
        <motion.p
          className="mt-8 uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.75rem, 2.4vw, 0.95rem)',
            letterSpacing: '10px',
            color: 'rgba(240,220,160,0.7)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Thursday
        </motion.p>

        {/* Day number row */}
        <motion.div
          className="mt-4 flex items-center justify-center gap-5 sm:gap-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.55 }}
        >
          <div className="flex flex-col items-center">
            <span
              className="uppercase"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 9,
                letterSpacing: 4,
                color: 'rgba(212,175,55,0.55)',
              }}
            >
              July
            </span>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                fontWeight: 400,
                color: 'rgba(240,220,160,0.9)',
              }}
            >
              07
            </span>
          </div>
          <div
            className="self-stretch"
            style={{
              width: 1,
              background:
                'linear-gradient(180deg, transparent, rgba(212,175,55,0.5), transparent)',
            }}
          />
          <div className="flex flex-col items-center">
            <span
              className="uppercase"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 9,
                letterSpacing: 4,
                color: 'rgba(212,175,55,0.55)',
              }}
            >
              Date
            </span>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3.6rem, 12vw, 5.5rem)',
                fontWeight: 500,
                lineHeight: 1,
                background:
                  'linear-gradient(135deg, #D4AF37 0%, #F5D870 40%, #D4AF37 60%, #A8880A 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 4s linear infinite',
                filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.35))',
              }}
            >
              30
            </span>
          </div>
          <div
            className="self-stretch"
            style={{
              width: 1,
              background:
                'linear-gradient(180deg, transparent, rgba(212,175,55,0.5), transparent)',
            }}
          />
          <div className="flex flex-col items-center">
            <span
              className="uppercase"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 9,
                letterSpacing: 4,
                color: 'rgba(212,175,55,0.55)',
              }}
            >
              Year
            </span>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                fontWeight: 400,
                color: 'rgba(240,220,160,0.9)',
                letterSpacing: '0.02em',
              }}
            >
              2026
            </span>
          </div>
        </motion.div>

        {/* Time */}
        <motion.p
          className="mt-6 uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
            letterSpacing: '8px',
            color: 'rgba(212,175,55,0.8)',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          at 6:00 PM
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <GoldDivider />
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mt-12 w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          <Countdown />
        </motion.div>
      </motion.div>
    </section>
  )
}
