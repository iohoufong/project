import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Elegant, stylized "map card" for the venue section. Not a real map —
 * a decorative cartographic illustration in burgundy + gold.
 */
export default function Location() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-40, 40])

  const mapsHref =
    'https://www.google.com/maps/search/?api=1&query=Eclaire+Wedding+Events+Sal%C3%A9+Morocco'

  return (
    <section
      ref={ref}
      className="relative w-full flex items-center justify-center px-6 py-24 sm:py-32"
    >
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Where it begins
        </motion.p>

        <motion.h2
          className="mt-5"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
            color: 'rgba(240,220,160,0.95)',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Eclaire Wedding &amp; Events
        </motion.h2>

        <motion.p
          className="mt-3"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)',
            color: 'rgba(240,220,160,0.7)',
            letterSpacing: '0.04em',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          Route de la base, Salé, Morocco
        </motion.p>

        {/* Map-style illustration */}
        <motion.div
          className="mt-10 w-full"
          style={{ y: parallaxY }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <MapCard />
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all"
            style={{
              border: '1px solid rgba(212,175,55,0.55)',
              color: '#D4AF37',
              background: 'rgba(212,175,55,0.06)',
              fontFamily: 'Cinzel, serif',
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 C7 2 4 5.5 4 10 C4 16 12 22 12 22 C12 22 20 16 20 10 C20 5.5 17 2 12 2 Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Open in Maps
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function MapCard() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '16 / 11',
        borderRadius: 6,
        background:
          'linear-gradient(160deg, #6B0B15 0%, #4E0810 50%, #360509 100%)',
        border: '1px solid rgba(212,175,55,0.35)',
        boxShadow:
          '0 24px 60px rgba(0,0,0,0.45), 0 6px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(212,175,55,0.18)',
      }}
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.25,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='mn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23mn)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative compass + streets SVG */}
      <svg
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="streetGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.22)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </radialGradient>
          <radialGradient id="pinGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#F5D870" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>

        {/* Glow behind pin */}
        <circle cx="200" cy="140" r="80" fill="url(#mapGlow)" />

        {/* Stylized "streets" — curved cartographic lines */}
        <g stroke="url(#streetGrad)" fill="none" strokeLinecap="round">
          <path d="M-20,40 Q100,80 210,60 Q320,40 420,70" strokeWidth="1.2" opacity="0.7" />
          <path d="M-20,100 Q120,140 240,115 Q340,95 420,130" strokeWidth="0.8" opacity="0.55" />
          <path d="M-20,200 Q80,180 200,200 Q320,220 420,200" strokeWidth="1" opacity="0.6" />
          <path d="M-20,250 Q130,230 250,250 Q340,260 420,240" strokeWidth="0.8" opacity="0.5" />

          <path d="M40,-20 Q60,100 50,200 Q40,260 60,320" strokeWidth="0.8" opacity="0.5" />
          <path d="M140,-20 Q160,100 150,200 Q140,260 160,320" strokeWidth="0.8" opacity="0.45" />
          <path d="M260,-20 Q280,100 270,200 Q260,260 280,320" strokeWidth="0.8" opacity="0.5" />
          <path d="M340,-20 Q355,100 345,200 Q340,260 355,320" strokeWidth="0.6" opacity="0.4" />
        </g>

        {/* Tiny building blocks */}
        <g fill="rgba(212,175,55,0.12)">
          {[
            [60, 50, 24, 14],
            [110, 80, 30, 16],
            [240, 40, 24, 14],
            [300, 90, 26, 18],
            [60, 220, 22, 14],
            [290, 220, 28, 16],
            [340, 170, 20, 14],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="1" />
          ))}
        </g>

        {/* River-like curve */}
        <path
          d="M-20,160 Q100,140 200,165 Q320,190 420,155"
          stroke="rgba(240,220,160,0.3)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
        />

        {/* Compass rose */}
        <g transform="translate(60,230)" opacity="0.85">
          <circle r="18" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" />
          <circle r="14" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
          <path d="M0,-14 L3,0 L0,14 L-3,0 Z" fill="rgba(240,220,160,0.8)" />
          <path d="M-14,0 L0,3 L14,0 L0,-3 Z" fill="rgba(212,175,55,0.5)" />
          <text
            y="-20"
            textAnchor="middle"
            fontSize="7"
            fontFamily="Cinzel, serif"
            fill="rgba(212,175,55,0.85)"
            letterSpacing="1"
          >
            N
          </text>
        </g>

        {/* Scale / label */}
        <g transform="translate(340,250)" opacity="0.6">
          <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
          <line x1="40" y1="-3" x2="40" y2="3" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
          <text
            x="20"
            y="12"
            textAnchor="middle"
            fontSize="6"
            fontFamily="Cinzel, serif"
            fill="rgba(212,175,55,0.7)"
            letterSpacing="1"
          >
            500m
          </text>
        </g>
      </svg>

      {/* Pin with pulsing ring — centered */}
      <div
        className="absolute"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -100%)' }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 60,
            height: 60,
            left: '50%',
            top: '100%',
            transform: 'translate(-50%, -50%)',
            border: '1.5px solid rgba(212,175,55,0.6)',
          }}
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 40,
            height: 40,
            left: '50%',
            top: '100%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(212,175,55,0.6)',
          }}
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, delay: 0.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <svg width="40" height="50" viewBox="0 0 40 50" style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.5))' }}>
          <defs>
            <radialGradient id="pinFill" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#F5D870" />
              <stop offset="55%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B6914" />
            </radialGradient>
          </defs>
          <path
            d="M20 2 C10 2 3 9 3 18 C3 30 20 48 20 48 C20 48 37 30 37 18 C37 9 30 2 20 2 Z"
            fill="url(#pinFill)"
            stroke="rgba(80,55,5,0.6)"
            strokeWidth="0.8"
          />
          <circle cx="20" cy="18" r="5" fill="#4E0810" />
          <circle cx="18" cy="16" r="1.6" fill="rgba(255,255,255,0.6)" />
        </svg>
      </div>

      {/* Corner ornaments */}
      {[
        { top: 10, left: 10, rot: 0 },
        { top: 10, right: 10, rot: 90 },
        { bottom: 10, right: 10, rot: 180 },
        { bottom: 10, left: 10, rot: 270 },
      ].map((p, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="absolute"
          style={{ ...p, transform: `rotate(${p.rot}deg)` }}
        >
          <path d="M0,0 L10,0 M0,0 L0,10" stroke="rgba(212,175,55,0.7)" strokeWidth="0.8" fill="none" />
          <circle cx="0" cy="0" r="1.2" fill="rgba(212,175,55,0.9)" />
        </svg>
      ))}

      {/* Venue label ribbon (bottom) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 px-4 py-1.5 whitespace-nowrap"
        style={{
          bottom: 16,
          background: 'rgba(54,5,9,0.85)',
          border: '1px solid rgba(212,175,55,0.4)',
          borderRadius: 2,
          backdropFilter: 'blur(6px)',
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 9,
            letterSpacing: 4,
            color: 'rgba(240,220,160,0.85)',
          }}
        >
          Eclaire · Salé
        </p>
      </div>
    </div>
  )
}
