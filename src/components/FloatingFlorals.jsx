import { motion } from 'framer-motion'

/**
 * Floating floral + petal decorations. Drifting gently in the background,
 * layered behind section content. Designed to be mounted once at the top of
 * the story scroll to provide a subtle parallax ambience.
 */
export default function FloatingFlorals() {
  // Deterministic seed so elements stay in place across re-renders
  const petals = [
    { x: 8, y: 6, size: 22, rot: 12, dur: 14, delay: 0, opacity: 0.35 },
    { x: 86, y: 14, size: 28, rot: -20, dur: 18, delay: 1, opacity: 0.28 },
    { x: 20, y: 38, size: 18, rot: 40, dur: 16, delay: 3, opacity: 0.3 },
    { x: 72, y: 52, size: 34, rot: -10, dur: 22, delay: 2, opacity: 0.22 },
    { x: 12, y: 70, size: 24, rot: 60, dur: 20, delay: 4, opacity: 0.3 },
    { x: 88, y: 78, size: 20, rot: -30, dur: 17, delay: 0.5, opacity: 0.33 },
    { x: 40, y: 88, size: 26, rot: 20, dur: 19, delay: 1.5, opacity: 0.25 },
    { x: 58, y: 24, size: 16, rot: 70, dur: 15, delay: 2.5, opacity: 0.3 },
  ]

  const sparkles = Array.from({ length: 18 }, (_, i) => ({
    x: (i * 53) % 100,
    y: (i * 37 + 7) % 100,
    size: 1.5 + (i % 3) * 0.8,
    dur: 4 + (i % 5),
    delay: (i * 0.6) % 5,
    opacity: 0.25 + (i % 3) * 0.12,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Corner ornamental flourishes (fixed) */}
      <div className="absolute top-0 left-0 opacity-30">
        <CornerFlourish />
      </div>
      <div className="absolute top-0 right-0 opacity-30" style={{ transform: 'scaleX(-1)' }}>
        <CornerFlourish />
      </div>
      <div className="absolute bottom-0 left-0 opacity-30" style={{ transform: 'scaleY(-1)' }}>
        <CornerFlourish />
      </div>
      <div className="absolute bottom-0 right-0 opacity-30" style={{ transform: 'scale(-1,-1)' }}>
        <CornerFlourish />
      </div>

      {/* Floating petals */}
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          initial={{ y: 0, rotate: p.rot }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -6, 4, 0],
            rotate: [p.rot, p.rot + 15, p.rot - 10, p.rot + 5, p.rot],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Petal />
        </motion.div>
      ))}

      {/* Gold sparkles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={`s-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background:
              'radial-gradient(circle, rgba(240,210,120,0.9) 0%, rgba(212,175,55,0.4) 60%, transparent 100%)',
            boxShadow: '0 0 6px rgba(212,175,55,0.6)',
          }}
          animate={{
            opacity: [0, s.opacity, s.opacity, 0],
            scale: [0.6, 1.1, 0.9, 0.6],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function Petal() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <defs>
        <radialGradient id="petalG" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F0D060" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B6914" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <path
        d="M20,4 C28,8 34,16 32,24 C30,32 22,38 20,36 C18,38 10,32 8,24 C6,16 12,8 20,4 Z"
        fill="url(#petalG)"
      />
      <path
        d="M20,6 C18,14 17,24 20,34"
        fill="none"
        stroke="rgba(139,105,20,0.25)"
        strokeWidth="0.4"
      />
    </svg>
  )
}

function CornerFlourish() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="goldFlourish" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0D060" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g stroke="url(#goldFlourish)" strokeWidth="1" fill="none">
        <path d="M0,20 Q60,40 90,100 Q110,160 180,200" />
        <path d="M0,60 Q40,60 80,90" />
        <path d="M20,0 Q40,60 100,80" />
        <path d="M40,40 Q80,60 90,110" />
      </g>
      <g fill="url(#goldFlourish)">
        {[
          [50, 80, 2],
          [80, 110, 2.5],
          [110, 140, 2],
          [30, 50, 1.5],
          [90, 60, 1.8],
          [140, 170, 1.6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
        {/* Tiny leaves */}
        {[
          [60, 70, 20],
          [100, 90, -30],
          [120, 140, 10],
          [75, 120, -15],
        ].map(([x, y, rot], i) => (
          <ellipse
            key={`l-${i}`}
            cx={x}
            cy={y}
            rx="6"
            ry="2.2"
            opacity="0.5"
            transform={`rotate(${rot}, ${x}, ${y})`}
          />
        ))}
      </g>
    </svg>
  )
}
