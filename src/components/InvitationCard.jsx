import { motion } from 'framer-motion'
import FloralBorder from './FloralBorder'
import Countdown from './Countdown'

const STAGGER = 0.15
const TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * STAGGER,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function Line({ children, delay, style, className }) {
  return (
    <motion.div
      custom={delay}
      variants={TEXT_VARIANTS}
      initial="hidden"
      animate="visible"
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 w-full justify-center my-1">
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 50%, transparent)' }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="rgba(212,175,55,0.6)" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 50%, transparent)' }} />
    </div>
  )
}

export default function InvitationCard({ visible }) {
  if (!visible) return null

  return (
    <motion.div
      className="relative w-full flex justify-center"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          maxWidth: 480,
          background: 'linear-gradient(165deg, #8B0C16 0%, #7A0C14 30%, #5A0A10 70%, #3E0709 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 32px 64px rgba(0,0,0,0.3), 0 64px 120px rgba(0,0,0,0.2), inset 0 1px 0 rgba(212,175,55,0.15)',
          borderRadius: '4px',
        }}
      >
        {/* Decorative background pattern */}
        <BackgroundPattern />

        {/* Inner border */}
        <div
          className="absolute inset-3 pointer-events-none rounded-sm"
          style={{ border: '1px solid rgba(212,175,55,0.2)' }}
        />
        <div
          className="absolute inset-5 pointer-events-none rounded-sm"
          style={{ border: '0.5px solid rgba(212,175,55,0.1)' }}
        />

        {/* Corner ornaments */}
        <CornerOrnaments />

        {/* Card content */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12 py-10 sm:py-14 gap-5"
        >
          {/* Bismillah */}
          <Line delay={0}>
            <p
              style={{
                fontFamily: 'Great Vibes, cursive',
                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                color: 'rgba(212,175,55,0.8)',
                lineHeight: 1.4,
                letterSpacing: '0.02em',
              }}
            >
              Bismillah ir-Rahman ir-Rahim
            </p>
          </Line>

          <motion.div custom={1} variants={TEXT_VARIANTS} initial="hidden" animate="visible" className="w-full">
            <FloralBorder color="#D4AF37" opacity={0.4} />
          </motion.div>

          {/* You are invited */}
          <Line delay={2}>
            <p
              className="uppercase tracking-widest"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
                letterSpacing: '6px',
                color: 'rgba(212,175,55,0.65)',
              }}
            >
              You Are Cordially Invited
            </p>
            <p
              className="uppercase tracking-widest"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.6rem, 2vw, 0.72rem)',
                letterSpacing: '6px',
                color: 'rgba(212,175,55,0.65)',
                marginTop: '4px',
              }}
            >
              to celebrate the wedding of
            </p>
          </Line>

          {/* Names */}
          <Line delay={3}>
            <h1
              className="leading-none"
              style={{
                fontFamily: 'Great Vibes, cursive',
                fontSize: 'clamp(3rem, 10vw, 4.5rem)',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 40%, #D4AF37 60%, #A8880A 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
                filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.4))',
                letterSpacing: '0.02em',
              }}
            >
              Nihal &amp; Hou
            </h1>
          </Line>

          <Line delay={4}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(240,220,160,0.75)',
                lineHeight: 1.7,
                maxWidth: 300,
                letterSpacing: '0.03em',
              }}
            >
              We are getting married and would love
              <br />
              for you to join us
            </p>
          </Line>

          <motion.div custom={5} variants={TEXT_VARIANTS} initial="hidden" animate="visible" className="w-full">
            <GoldDivider />
          </motion.div>

          {/* Date */}
          <Line delay={6}>
            <p
              className="uppercase tracking-widest"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                letterSpacing: '5px',
                color: 'rgba(212,175,55,0.55)',
                marginBottom: '6px',
              }}
            >
              Thursday
            </p>
            <p
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(1.6rem, 5vw, 2.1rem)',
                fontWeight: 500,
                color: '#D4AF37',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
              }}
            >
              July 30, 2026
            </p>
            <p
              className="uppercase tracking-widest mt-1"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                letterSpacing: '5px',
                color: 'rgba(212,175,55,0.65)',
              }}
            >
              at 6:00 PM
            </p>
          </Line>

          <motion.div custom={7} variants={TEXT_VARIANTS} initial="hidden" animate="visible" className="w-full">
            <GoldDivider />
          </motion.div>

          {/* Venue */}
          <Line delay={8}>
            <p
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                fontWeight: 500,
                fontStyle: 'italic',
                color: 'rgba(212,175,55,0.9)',
                letterSpacing: '0.02em',
                lineHeight: 1.3,
              }}
            >
              Eclaire Wedding &amp; Events
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                fontWeight: 300,
                color: 'rgba(240,220,160,0.6)',
                letterSpacing: '0.04em',
                lineHeight: 1.6,
              }}
            >
              Route de la base, Salé, Morocco
            </p>
          </Line>

          <motion.div custom={9} variants={TEXT_VARIANTS} initial="hidden" animate="visible" className="w-full">
            <FloralBorder color="#D4AF37" opacity={0.35} />
          </motion.div>

          {/* RSVP note */}
          <Line delay={10}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(240,220,160,0.55)',
                letterSpacing: '0.04em',
                lineHeight: 1.8,
              }}
            >
              Please let us know soon
              <br />
              so we can reserve your seat
            </p>
          </Line>

          {/* Small wax seal footer */}
          <Line delay={11}>
            <svg viewBox="0 0 44 44" width="36" height="36" style={{ opacity: 0.7 }}>
              <radialGradient id="footerSeal" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#F0D060" />
                <stop offset="60%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
              <circle cx="22" cy="22" r="18" fill="url(#footerSeal)" />
              <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(139,105,20,0.5)" strokeWidth="1" />
              <text x="22" y="26" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fontWeight="600" letterSpacing="1" fill="rgba(80,55,5,0.85)">N|H</text>
            </svg>
          </Line>
        </div>
      </div>

      {/* Countdown section — below card */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 pointer-events-none"
        style={{ display: 'none' }}
      />
    </motion.div>
  )
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-left floral corner */}
      <svg className="absolute top-0 left-0 opacity-10" width="160" height="160" viewBox="0 0 160 160">
        <g fill="#D4AF37">
          <path d="M0,0 Q40,40 20,80 Q0,120 40,160" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
          <path d="M0,0 Q60,20 40,70" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
          {[20, 40, 60, 80].map((v, i) => (
            <g key={i}>
              <circle cx={v * 0.3} cy={v} r="2" opacity="0.5" />
              <ellipse cx={v * 0.3 + 6} cy={v - 4} rx="5" ry="2.5" opacity="0.3" transform={`rotate(-30, ${v * 0.3 + 6}, ${v - 4})`} />
            </g>
          ))}
        </g>
      </svg>

      {/* Bottom-right floral corner (rotated) */}
      <svg className="absolute bottom-0 right-0 opacity-10" width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(180deg)' }}>
        <g fill="#D4AF37">
          <path d="M0,0 Q40,40 20,80 Q0,120 40,160" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
          <path d="M0,0 Q60,20 40,70" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
          {[20, 40, 60, 80].map((v, i) => (
            <g key={i}>
              <circle cx={v * 0.3} cy={v} r="2" opacity="0.5" />
              <ellipse cx={v * 0.3 + 6} cy={v - 4} rx="5" ry="2.5" opacity="0.3" transform={`rotate(-30, ${v * 0.3 + 6}, ${v - 4})`} />
            </g>
          ))}
        </g>
      </svg>

      {/* Subtle radial glow center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Top-right and bottom-left corners */}
      <svg className="absolute top-0 right-0 opacity-10" width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'scaleX(-1)' }}>
        <g fill="#D4AF37">
          <path d="M0,0 Q40,40 20,80 Q0,120 40,160" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
          {[20, 40, 60].map((v, i) => (
            <circle key={i} cx={v * 0.3} cy={v} r="1.5" opacity="0.4" />
          ))}
        </g>
      </svg>
      <svg className="absolute bottom-0 left-0 opacity-10" width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'scaleX(-1) rotate(180deg)' }}>
        <g fill="#D4AF37">
          <path d="M0,0 Q40,40 20,80 Q0,120 40,160" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
          {[20, 40, 60].map((v, i) => (
            <circle key={i} cx={v * 0.3} cy={v} r="1.5" opacity="0.4" />
          ))}
        </g>
      </svg>
    </div>
  )
}

function CornerOrnaments() {
  const positions = [
    { top: 10, left: 10, rotate: 0 },
    { top: 10, right: 10, rotate: 90 },
    { bottom: 10, right: 10, rotate: 180 },
    { bottom: 10, left: 10, rotate: 270 },
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ ...pos }}>
          <svg viewBox="0 0 20 20" width="20" height="20" style={{ transform: `rotate(${pos.rotate}deg)`, opacity: 0.5 }}>
            <path d="M0,0 L12,0 M0,0 L0,12" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
          </svg>
        </div>
      ))}
    </>
  )
}
