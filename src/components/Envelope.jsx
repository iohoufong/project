import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import WaxSeal from './WaxSeal'

const FLAP_VARIANTS = {
  closed: { rotateX: 0, originY: 0 },
  opening: {
    rotateX: -175,
    transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 },
  },
}

export default function Envelope({ onOpenComplete }) {
  const [sealState, setSealState] = useState('idle')
  const [phase, setPhase] = useState('idle')

  const handleSealClick = () => {
    if (phase !== 'idle') return
    setSealState('cracking')
    setPhase('cracking')

    setTimeout(() => {
      setSealState('broken')
      setPhase('opening')
    }, 500)

    setTimeout(() => {
      setPhase('open')
      onOpenComplete?.()
    }, 2800)
  }

  const isOpen = phase === 'open'

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ minHeight: '340px' }}>
      {/* Envelope body */}
      <motion.div
        className="relative"
        style={{ width: 320, height: 230 }}
        initial={{ y: 40, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        {/* Perspective wrapper for 3D flap */}
        <div className="perspective-envelope absolute inset-0">
          {/* Back of envelope (bottom body) */}
          <div
            className="absolute inset-0 rounded-sm overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #FAF5E4 0%, #EDE4CC 60%, #E5D8B8 100%)',
              boxShadow: '0 30px 70px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            {/* Paper texture overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Diagonal fold lines */}
            <svg className="absolute inset-0" viewBox="0 0 320 230" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              {/* Bottom-left triangle */}
              <path d="M0,230 L160,140 L0,100Z" fill="rgba(200,185,155,0.25)" />
              {/* Bottom-right triangle */}
              <path d="M320,230 L160,140 L320,100Z" fill="rgba(200,185,155,0.18)" />
              {/* Bottom triangle */}
              <path d="M0,230 L160,140 L320,230Z" fill="rgba(210,195,165,0.15)" />
              {/* Fold lines */}
              <line x1="0" y1="230" x2="160" y2="140" stroke="rgba(160,145,120,0.25)" strokeWidth="0.8" />
              <line x1="320" y1="230" x2="160" y2="140" stroke="rgba(160,145,120,0.25)" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Top flap (3D fold) */}
          <motion.div
            className="absolute left-0 right-0 top-0 origin-top"
            style={{
              height: '58%',
              transformStyle: 'preserve-3d',
              zIndex: phase === 'idle' || phase === 'cracking' ? 10 : 1,
            }}
            variants={FLAP_VARIANTS}
            initial="closed"
            animate={phase === 'opening' || phase === 'open' ? 'opening' : 'closed'}
          >
            {/* Flap front face */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <svg
                className="absolute inset-0"
                viewBox="0 0 320 133"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '100%' }}
              >
                <defs>
                  <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FAF5E4" />
                    <stop offset="100%" stopColor="#EDE4CC" />
                  </linearGradient>
                </defs>
                {/* Triangular flap shape */}
                <path d="M0,0 L320,0 L160,133Z" fill="url(#flapGrad)" />
                {/* Inner shadow along bottom edge of flap */}
                <path d="M20,0 L300,0 L160,122Z" fill="rgba(220,205,175,0.3)" />
                {/* Paper texture */}
                <path d="M0,0 L320,0 L160,133Z" fill="url(#flapNoise)" />
              </svg>
              {/* Subtle fold line at top */}
              <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{ background: 'rgba(160,145,120,0.3)' }}
              />
            </div>
            {/* Flap inner face (revealed when opening) */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                background: 'linear-gradient(180deg, #E8DEC0 0%, #F0E8D0 100%)',
              }}
            />
          </motion.div>
        </div>

        {/* Wax seal — positioned at flap fold */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: '52%', zIndex: 20 }}
          animate={
            phase === 'opening' || phase === 'open'
              ? { opacity: 0, scale: 0.5, y: -10 }
              : {}
          }
          transition={{ duration: 0.4, ease: 'easeIn', delay: 0.1 }}
        >
          <WaxSeal onClick={handleSealClick} state={sealState} />
        </motion.div>
      </motion.div>
    </div>
  )
}
