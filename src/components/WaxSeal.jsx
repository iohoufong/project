import { motion } from 'framer-motion'

export default function WaxSeal({ onClick, state }) {
  const isIdle = state === 'idle'
  const isCracking = state === 'cracking'
  const isBroken = state === 'broken'

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onClick={isIdle ? onClick : undefined}
      style={{ width: 88, height: 88 }}
      animate={isIdle ? { scale: [1, 1.02, 1] } : {}}
      transition={isIdle ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {/* Outer glow ring */}
      {isIdle && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
            transform: 'scale(1.4)',
          }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1.3, 1.5, 1.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Main seal SVG */}
      <svg viewBox="0 0 88 88" width="88" height="88" style={{ display: 'block', position: 'relative', zIndex: 2 }}>
        <defs>
          <radialGradient id="sealGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#F0D060" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="65%" stopColor="#B8960C" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
          <radialGradient id="sealInner" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#F5E070" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
          </radialGradient>
          <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#7A0C14" floodOpacity="0.5" />
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
          </filter>
          <filter id="emboss" x="-5%" y="-5%" width="110%" height="110%">
            <feDiffuseLighting in="SourceGraphic" lightingColor="white" surfaceScale="2" result="light">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0.3" k2="0.7" k3="0" k4="0" />
          </filter>
          <clipPath id="sealClip">
            <circle cx="44" cy="44" r="36" />
          </clipPath>
        </defs>

        {/* Shadow layer */}
        <circle cx="44" cy="46" r="36" fill="rgba(0,0,0,0.2)" filter="url(#sealShadow)" />

        {/* Main wax body — irregular circle for realism */}
        <path
          d="M44 8 C52 8, 64 10, 72 16 C80 22, 82 32, 82 44 C82 56, 78 68, 70 74 C62 80, 52 82, 44 82 C36 82, 24 80, 16 74 C8 68, 6 56, 6 44 C6 32, 10 20, 18 14 C26 8, 36 8, 44 8 Z"
          fill="url(#sealGrad)"
          filter="url(#sealShadow)"
        />

        {/* Highlight layer */}
        <path
          d="M44 8 C52 8, 64 10, 72 16 C80 22, 82 32, 82 44 C82 56, 78 68, 70 74 C62 80, 52 82, 44 82 C36 82, 24 80, 16 74 C8 68, 6 56, 6 44 C6 32, 10 20, 18 14 C26 8, 36 8, 44 8 Z"
          fill="url(#sealInner)"
          clipPath="url(#sealClip)"
        />

        {/* Rim groove */}
        <circle cx="44" cy="44" r="34" fill="none" stroke="rgba(139,105,20,0.5)" strokeWidth="2" />
        <circle cx="44" cy="44" r="32" fill="none" stroke="rgba(240,208,96,0.3)" strokeWidth="0.5" />

        {/* Engraved initials */}
        <text
          x="44" y="50"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="16"
          fontWeight="600"
          letterSpacing="2"
          fill="rgba(80,55,5,0.85)"
          style={{ userSelect: 'none' }}
        >
          N | H
        </text>

        {/* Specular highlight */}
        <ellipse cx="34" cy="28" rx="10" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-25,34,28)" />
        <ellipse cx="32" cy="27" rx="4" ry="2.5" fill="rgba(255,255,255,0.4)" transform="rotate(-25,32,27)" />
      </svg>

      {/* Crack fragments — shown during/after cracking */}
      {(isCracking || isBroken) && (
        <CrackFragments isBroken={isBroken} />
      )}

      {/* Tap hint */}
      {isIdle && (
        <motion.div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#D4AF37', fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '3px' }}
          >
            Touch to open
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

function CrackFragments({ isBroken }) {
  const fragments = [
    { d: 'M44,44 L52,36 L58,42 L50,48Z', dx: 20, dy: -18, rot: 35 },
    { d: 'M44,44 L36,36 L30,44 L38,50Z', dx: -22, dy: -16, rot: -40 },
    { d: 'M44,44 L54,50 L50,60 L42,54Z', dx: 18, dy: 20, rot: 25 },
    { d: 'M44,44 L34,52 L30,60 L38,58Z', dx: -20, dy: 22, rot: -30 },
    { d: 'M44,44 L56,44 L58,52 L48,54Z', dx: 24, dy: 8, rot: 15 },
    { d: 'M44,44 L32,44 L28,36 L38,36Z', dx: -26, dy: -10, rot: -20 },
  ]

  return (
    <>
      {fragments.map((f, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 88 88"
          width="88"
          height="88"
          className="absolute inset-0 pointer-events-none"
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
          animate={isBroken ? {
            x: f.dx,
            y: f.dy,
            rotate: f.rot,
            opacity: 0,
            scale: 0.5,
          } : { x: [0, f.dx * 0.1, 0], y: [0, f.dy * 0.1, 0] }}
          transition={{
            duration: isBroken ? 0.7 : 0.3,
            delay: i * 0.04,
            ease: isBroken ? [0.25, 0.46, 0.45, 0.94] : 'easeInOut',
          }}
        >
          <defs>
            <radialGradient id={`fragGrad${i}`} cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#F0D060" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B6914" />
            </radialGradient>
          </defs>
          <path d={f.d} fill={`url(#fragGrad${i})`} opacity="0.9" />
        </motion.svg>
      ))}
      {/* Crack lines */}
      <motion.svg
        viewBox="0 0 88 88"
        width="88"
        height="88"
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBroken ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <line x1="44" y1="44" x2="60" y2="28" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
        <line x1="44" y1="44" x2="24" y2="32" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
        <line x1="44" y1="44" x2="56" y2="62" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
        <line x1="44" y1="44" x2="28" y2="60" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
      </motion.svg>
    </>
  )
}
