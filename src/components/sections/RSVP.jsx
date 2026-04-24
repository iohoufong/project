import { motion } from 'framer-motion'
import { useState } from 'react'
import FloralBorder from '../FloralBorder'

export default function RSVP() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('yes')
  const [guests, setGuests] = useState(1)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Local-only confirmation — no backend. Shows a thank-you state.
    setSent(true)
  }

  return (
    <section className="relative w-full flex items-center justify-center px-6 py-28 sm:py-36">
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-xl w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <FloralBorder color="#D4AF37" opacity={0.45} />

        <motion.p
          className="mt-8 uppercase"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.65rem, 2vw, 0.78rem)',
            letterSpacing: '8px',
            color: 'rgba(212,175,55,0.75)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Kindly respond
        </motion.p>

        <motion.p
          className="mt-6"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.15rem, 3.6vw, 1.55rem)',
            color: 'rgba(250,240,210,0.88)',
            lineHeight: 1.55,
            letterSpacing: '0.015em',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Please let us know soon
          <br />
          so we can save you a seat
        </motion.p>

        {/* RSVP button / form */}
        {!sent && !open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="mt-10 group relative overflow-hidden"
            style={{
              padding: '16px 44px',
              borderRadius: 999,
              border: '1px solid rgba(212,175,55,0.7)',
              background:
                'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(139,105,20,0.14) 100%)',
              color: '#F5D870',
              fontFamily: 'Cinzel, serif',
              fontSize: 13,
              letterSpacing: 5,
              textTransform: 'uppercase',
              boxShadow:
                '0 8px 28px rgba(212,175,55,0.18), inset 0 1px 0 rgba(240,220,160,0.25)',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.55 }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 32px rgba(212,175,55,0.35)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,241,176,0.35) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite',
              }}
            />
            <span className="relative z-10">RSVP — Confirm Attendance</span>
          </motion.button>
        )}

        {open && !sent && (
          <motion.form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-md text-left"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: '24px 22px',
              borderRadius: 8,
              background:
                'linear-gradient(160deg, rgba(138,15,26,0.55) 0%, rgba(78,8,16,0.65) 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.15)',
            }}
          >
            <Field label="Your Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Guest of honor"
                style={inputStyle}
              />
            </Field>

            <Field label="Will You Attend?">
              <div className="flex gap-2 flex-wrap">
                {[
                  { v: 'yes', label: 'Joyfully accept' },
                  { v: 'no', label: 'Regretfully decline' },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setAttendance(o.v)}
                    style={pillStyle(attendance === o.v)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </Field>

            {attendance === 'yes' && (
              <Field label="Number of Guests">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    style={stepBtn}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 24,
                      color: '#F5D870',
                      minWidth: 28,
                      textAlign: 'center',
                    }}
                  >
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(10, g + 1))}
                    style={stepBtn}
                  >
                    +
                  </button>
                </div>
              </Field>
            )}

            <button
              type="submit"
              className="w-full mt-4"
              style={{
                padding: '14px 20px',
                borderRadius: 999,
                background:
                  'linear-gradient(135deg, #D4AF37 0%, #F5D870 50%, #A8880A 100%)',
                color: '#3E0709',
                fontFamily: 'Cinzel, serif',
                fontSize: 12,
                letterSpacing: 4,
                textTransform: 'uppercase',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(212,175,55,0.35)',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Send Response
            </button>
          </motion.form>
        )}

        {sent && (
          <motion.div
            className="mt-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48">
              <defs>
                <radialGradient id="thankG" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#F5D870" />
                  <stop offset="100%" stopColor="#8B6914" />
                </radialGradient>
              </defs>
              <circle cx="24" cy="24" r="22" fill="url(#thankG)" opacity="0.9" />
              <path
                d="M14 24 L21 31 L34 17"
                stroke="#3E0709"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className="mt-5 uppercase"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 12,
                letterSpacing: 5,
                color: 'rgba(212,175,55,0.85)',
              }}
            >
              Thank you
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 16,
                color: 'rgba(240,220,160,0.8)',
              }}
            >
              Your response has been received.
            </p>
          </motion.div>
        )}

        {/* Closing quote */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4 max-w-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" style={{ opacity: 0.7 }}>
            <path
              d="M11 2 L12.4 9.6 L20 11 L12.4 12.4 L11 20 L9.6 12.4 L2 11 L9.6 9.6 Z"
              fill="rgba(212,175,55,0.7)"
            />
          </svg>
          <p
            className="text-center"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.05rem, 3.2vw, 1.4rem)',
              color: 'rgba(240,220,160,0.78)',
              lineHeight: 1.55,
              letterSpacing: '0.02em',
            }}
          >
            “Together is our favorite
            <br />
            place to be.”
          </p>
        </motion.div>

        {/* Footer monogram */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" style={{ opacity: 0.8 }}>
            <defs>
              <radialGradient id="footerSealG" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#F0D060" />
                <stop offset="60%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6914" />
              </radialGradient>
            </defs>
            <circle cx="23" cy="23" r="20" fill="url(#footerSealG)" />
            <circle cx="23" cy="23" r="17" fill="none" stroke="rgba(80,55,5,0.55)" strokeWidth="1" />
            <text
              x="23"
              y="28"
              textAnchor="middle"
              fontFamily="Cinzel, serif"
              fontSize="9"
              fontWeight="600"
              letterSpacing="1.5"
              fill="rgba(80,55,5,0.9)"
            >
              N | H
            </text>
          </svg>
          <p
            className="uppercase"
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 9,
              letterSpacing: 4,
              color: 'rgba(212,175,55,0.5)',
            }}
          >
            Nihal &amp; Hou · July 30, 2026
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label
        className="block uppercase mb-2"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 9,
          letterSpacing: 4,
          color: 'rgba(212,175,55,0.7)',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 4,
  background: 'rgba(0,0,0,0.25)',
  border: '1px solid rgba(212,175,55,0.35)',
  color: '#F5D870',
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: 16,
  outline: 'none',
}

const pillStyle = (active) => ({
  padding: '10px 16px',
  borderRadius: 999,
  background: active
    ? 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(139,105,20,0.25))'
    : 'transparent',
  border: `1px solid rgba(212,175,55,${active ? 0.7 : 0.3})`,
  color: active ? '#F5D870' : 'rgba(240,220,160,0.7)',
  fontFamily: 'Cinzel, serif',
  fontSize: 10,
  letterSpacing: 3,
  textTransform: 'uppercase',
  cursor: 'pointer',
})

const stepBtn = {
  width: 36,
  height: 36,
  borderRadius: 999,
  border: '1px solid rgba(212,175,55,0.5)',
  background: 'transparent',
  color: '#F5D870',
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: 22,
  lineHeight: 1,
  cursor: 'pointer',
}
