import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEDDING_DATE = new Date('2026-07-30T18:00:00')

function getTimeLeft() {
  const now = new Date()
  const diff = WEDDING_DATE - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function AnimatedDigit({ value, label }) {
  const [display, setDisplay] = useState(value)
  const [animKey, setAnimKey] = useState(0)
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current !== value) {
      setAnimKey(k => k + 1)
      setDisplay(value)
      prev.current = value
    }
  }, [value])

  const str = String(display).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div
        className="relative overflow-hidden rounded-lg flex items-center justify-center"
        style={{
          width: 72,
          height: 80,
          background: 'linear-gradient(160deg, rgba(212,175,55,0.08) 0%, rgba(122,12,20,0.6) 100%)',
          border: '1px solid rgba(212,175,55,0.25)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(212,175,55,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.5) 0%, transparent 70%)' }}
        />

        {/* Digit */}
        <AnimatePresence mode="wait">
          <motion.span
            key={animKey}
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 tabular-nums"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '2.4rem',
              fontWeight: 300,
              lineHeight: 1,
              color: '#D4AF37',
              textShadow: '0 0 20px rgba(212,175,55,0.5), 0 2px 4px rgba(0,0,0,0.4)',
              letterSpacing: '0.05em',
            }}
          >
            {str}
          </motion.span>
        </AnimatePresence>

        {/* Horizontal divider line */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: '50%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
          }}
        />
      </div>

      <span
        className="uppercase tracking-widest text-center"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'rgba(212,175,55,0.65)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center gap-6 sm:gap-8 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <p
          className="uppercase tracking-widest text-center"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '10px',
            letterSpacing: '5px',
            color: 'rgba(212,175,55,0.6)',
          }}
        >
          Counting Down To
        </p>
        <h3
          className="text-center"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(212,175,55,0.85)',
            letterSpacing: '0.05em',
          }}
        >
          The Big Day
        </h3>
      </div>

      {/* Timer blocks */}
      <div className="flex items-start gap-3 sm:gap-5">
        <AnimatedDigit value={time.days} label="Days" />
        <div
          className="self-center pb-6"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2rem',
            color: 'rgba(212,175,55,0.4)',
            lineHeight: 1,
          }}
        >
          :
        </div>
        <AnimatedDigit value={time.hours} label="Hours" />
        <div
          className="self-center pb-6"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2rem',
            color: 'rgba(212,175,55,0.4)',
            lineHeight: 1,
          }}
        >
          :
        </div>
        <AnimatedDigit value={time.minutes} label="Minutes" />
        <div
          className="self-center pb-6"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2rem',
            color: 'rgba(212,175,55,0.4)',
            lineHeight: 1,
          }}
        >
          :
        </div>
        <AnimatedDigit value={time.seconds} label="Seconds" />
      </div>

      {/* Subtitle */}
      <p
        className="text-center"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(240,208,96,0.45)',
          letterSpacing: '0.05em',
        }}
      >
        July 30, 2026 · 6:00 PM · Salé, Morocco
      </p>
    </motion.div>
  )
}
