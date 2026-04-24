import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import WaxSeal from './WaxSeal'

const FLAP_VARIANTS = {
  closed: { rotateX: 0 },
  opening: {
    rotateX: -172,
    transition: { duration: 2.0, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.25 },
  },
}

export default function Envelope({ onOpenComplete }) {
  const [sealState, setSealState] = useState('idle')
  const [phase, setPhase] = useState('idle') // idle | cracking | opening | letter | zooming | done

  const handleSealClick = () => {
    if (phase !== 'idle') return
    setSealState('cracking')
    setPhase('cracking')

    setTimeout(() => {
      setSealState('broken')
      setPhase('opening')
    }, 500)

    // Letter slides up after flap opens
    setTimeout(() => setPhase('letter'), 2300)

    // Hold the letter visible for a moment, then zoom-in
    setTimeout(() => setPhase('zooming'), 4100)

    // Finish the intro
    setTimeout(() => {
      setPhase('done')
      onOpenComplete?.()
    }, 5400)
  }

  const isOpening =
    phase === 'opening' || phase === 'letter' || phase === 'zooming' || phase === 'done'

  // Camera zoom into the letter — scales and fades whole scene
  const zoomTransform =
    phase === 'zooming' || phase === 'done'
      ? { scale: 3.2, y: -40, opacity: 0 }
      : { scale: 1, y: 0, opacity: 1 }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: 380 }}
      animate={zoomTransform}
      transition={{ duration: 1.3, ease: [0.7, 0, 0.84, 0] }}
    >
      {/* Envelope body */}
      <motion.div
        className="relative"
        style={{ width: 340, height: 240 }}
        initial={{ y: 60, opacity: 0, scale: 0.9, rotateX: 8 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        {/* Letter card that slides up from inside the envelope */}
        <AnimatePresence>
          {(phase === 'letter' || phase === 'zooming' || phase === 'done') && (
            <motion.div
              className="absolute left-1/2"
              style={{
                width: 280,
                height: 360,
                top: 0,
                x: '-50%',
                zIndex: 5,
                transformOrigin: 'bottom center',
              }}
              initial={{ y: 80, opacity: 0, scale: 0.96 }}
              animate={{ y: -140, opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <LetterCard />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="perspective-envelope absolute inset-0">
          {/* Envelope back / body — deep burgundy */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: 3,
              background:
                'linear-gradient(160deg, #8A0F1A 0%, #6B0B15 40%, #4E0810 75%, #360509 100%)',
              boxShadow:
                '0 40px 90px rgba(0,0,0,0.55), 0 18px 40px rgba(0,0,0,0.4), 0 3px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(212,175,55,0.12)',
            }}
          >
            {/* Paper texture overlay */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.35,
                mixBlendMode: 'overlay',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.8'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Diagonal fold geometry */}
            <svg className="absolute inset-0" viewBox="0 0 340 240" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="foldLeft" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A0810" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6B0B15" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="foldRight" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A0810" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6B0B15" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="foldBottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3E070C" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#2A0508" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path d="M0,240 L170,150 L0,110Z" fill="url(#foldLeft)" />
              <path d="M340,240 L170,150 L340,110Z" fill="url(#foldRight)" />
              <path d="M0,240 L170,150 L340,240Z" fill="url(#foldBottom)" />
              {/* Gold inlay fold lines */}
              <line x1="0" y1="240" x2="170" y2="150" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
              <line x1="340" y1="240" x2="170" y2="150" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
              <line x1="0" y1="110" x2="170" y2="150" stroke="rgba(212,175,55,0.08)" strokeWidth="0.4" />
              <line x1="340" y1="110" x2="170" y2="150" stroke="rgba(212,175,55,0.08)" strokeWidth="0.4" />
            </svg>

            {/* Subtle inner corner ornaments */}
            <svg className="absolute bottom-2 left-2" width="44" height="44" viewBox="0 0 44 44" style={{ opacity: 0.4 }}>
              <path d="M0,0 L14,0 M0,0 L0,14" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
              <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
            </svg>
            <svg className="absolute bottom-2 right-2" width="44" height="44" viewBox="0 0 44 44" style={{ opacity: 0.4, transform: 'scaleX(-1)' }}>
              <path d="M0,0 L14,0 M0,0 L0,14" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
              <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
            </svg>
          </div>

          {/* Top flap — 3D fold, deep burgundy */}
          <motion.div
            className="absolute left-0 right-0 top-0"
            style={{
              height: '62%',
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 0%',
              zIndex: isOpening ? 1 : 10,
            }}
            variants={FLAP_VARIANTS}
            initial="closed"
            animate={isOpening ? 'opening' : 'closed'}
          >
            {/* Flap front face (outside) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <svg
                className="absolute inset-0"
                viewBox="0 0 340 149"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '100%' }}
              >
                <defs>
                  <linearGradient id="flapOuter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8A0F1A" />
                    <stop offset="50%" stopColor="#720D17" />
                    <stop offset="100%" stopColor="#4E0810" />
                  </linearGradient>
                  <linearGradient id="flapShade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                  </linearGradient>
                </defs>
                <path d="M0,0 L340,0 L170,149Z" fill="url(#flapOuter)" />
                <path d="M0,0 L340,0 L170,149Z" fill="url(#flapShade)" />
                {/* Gold edge line */}
                <path d="M0,0 L170,149 L340,0" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
              </svg>
              {/* Paper grain */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: 0.35,
                  mixBlendMode: 'overlay',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n2)' opacity='0.9'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Flap inner face (shown when opened) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                background:
                  'linear-gradient(180deg, #6B0B15 0%, #580A13 50%, #4E0810 100%)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute inset-0 flex items-start justify-center pt-3">
                <svg width="70" height="40" viewBox="0 0 70 40" style={{ opacity: 0.45 }}>
                  <path d="M10,30 Q35,5 60,30" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                  <circle cx="35" cy="12" r="2" fill="#D4AF37" />
                  <path d="M25,12 L45,12" stroke="#D4AF37" strokeWidth="0.4" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wax seal — positioned at flap fold */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: '52%', zIndex: 20 }}
          animate={isOpening ? { opacity: 0, scale: 0.4, y: -8 } : {}}
          transition={{ duration: 0.45, ease: 'easeIn', delay: 0.1 }}
        >
          <WaxSeal onClick={handleSealClick} state={sealState} />
        </motion.div>

        {/* Warm spotlight behind envelope */}
        <div
          className="absolute -inset-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212,175,55,0.10) 0%, transparent 55%)',
            zIndex: -1,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

function LetterCard() {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        borderRadius: 4,
        background:
          'linear-gradient(170deg, #FBF5E4 0%, #F3E9CF 50%, #E8DAB3 100%)',
        boxShadow:
          '0 30px 70px rgba(0,0,0,0.5), 0 12px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.18,
          mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='ln'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23ln)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold inner borders */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: 10, border: '1px solid rgba(139,105,20,0.35)', borderRadius: 2 }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ inset: 14, border: '0.5px solid rgba(139,105,20,0.2)', borderRadius: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 py-6">
        <p
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 9,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: 'rgba(122,12,20,0.55)',
          }}
        >
          Save the date
        </p>
        <div
          className="mt-3"
          style={{
            width: 40,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(139,105,20,0.6), transparent)',
          }}
        />
        <h2
          className="mt-5"
          style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 46,
            lineHeight: 1,
            color: '#7A0C14',
            letterSpacing: '0.02em',
          }}
        >
          Nihal
        </h2>
        <p
          className="mt-1"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'rgba(122,12,20,0.7)',
          }}
        >
          &amp;
        </p>
        <h2
          style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 46,
            lineHeight: 1,
            color: '#7A0C14',
            letterSpacing: '0.02em',
          }}
        >
          Hou
        </h2>
        <div
          className="mt-4"
          style={{
            width: 40,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(139,105,20,0.6), transparent)',
          }}
        />
        <p
          className="mt-4"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 9,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(139,105,20,0.75)',
          }}
        >
          July 30 · 2026
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 12,
            color: 'rgba(122,12,20,0.55)',
          }}
        >
          Salé · Morocco
        </p>
      </div>

      {/* Corner ornaments */}
      {[
        { top: 6, left: 6, rot: 0 },
        { top: 6, right: 6, rot: 90 },
        { bottom: 6, right: 6, rot: 180 },
        { bottom: 6, left: 6, rot: 270 },
      ].map((p, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className="absolute"
          style={{ ...p, transform: `rotate(${p.rot}deg)` }}
        >
          <path d="M0,0 L8,0 M0,0 L0,8" stroke="rgba(139,105,20,0.7)" strokeWidth="0.8" fill="none" />
          <circle cx="0" cy="0" r="1.2" fill="rgba(139,105,20,0.8)" />
        </svg>
      ))}
    </div>
  )
}
