import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Envelope from './components/Envelope'
import Particles from './components/Particles'
import FloatingFlorals from './components/FloatingFlorals'
import Hero from './components/sections/Hero'
import Message from './components/sections/Message'
import DateSection from './components/sections/DateSection'
import Location from './components/sections/Location'
import RSVP from './components/sections/RSVP'

export default function App() {
  const [phase, setPhase] = useState('intro') // 'intro' | 'story'
  const [showParticles, setShowParticles] = useState(false)

  const handleIntroComplete = () => {
    setPhase('story')
  }

  // Scroll lock during intro
  useEffect(() => {
    if (phase === 'intro') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  // Trigger particle burst the moment the wax seal is tapped
  const handleSealCrack = () => setShowParticles(true)

  return (
    <div className="relative w-full">
      {/* Backdrop (swaps between intro + story) */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            phase === 'intro'
              ? 'radial-gradient(ellipse at 50% 35%, #1a0507 0%, #0a0203 70%)'
              : 'linear-gradient(180deg, #3E0709 0%, #2A0506 30%, #1a0305 70%, #0e0203 100%)',
          transition: 'background 1.4s ease',
        }}
      />

      {/* Film grain always on */}
      <div className="grain-overlay" />

      {/* Story ambience — only in story phase */}
      <AnimatePresence>
        {phase === 'story' && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{ zIndex: 0 }}
          >
            <FloatingFlorals />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro phase — envelope + zoom-in transition */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Soft warm spotlight */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, rgba(212,175,55,0.14) 0%, transparent 60%)',
              }}
            />

            {/* Top subtitle */}
            <motion.div
              className="relative text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="uppercase"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 10,
                  letterSpacing: 7,
                  color: 'rgba(212,175,55,0.65)',
                }}
              >
                A Special Invitation
              </p>
              <motion.div
                className="mt-3 mx-auto"
                style={{
                  width: 70,
                  height: 1,
                  background:
                    'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.3 }}
              />
            </motion.div>

            {/* Envelope */}
            <div className="relative" onClick={handleSealCrack}>
              <Particles active={showParticles} />
              <Envelope onOpenComplete={handleIntroComplete} />
            </div>

            {/* Bottom name preview */}
            <motion.div
              className="relative text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                style={{
                  fontFamily: 'Great Vibes, cursive',
                  fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                  color: 'rgba(240,220,160,0.8)',
                  lineHeight: 1.2,
                }}
              >
                Nihal &amp; Hou
              </p>
              <p
                className="mt-1 uppercase"
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 9,
                  letterSpacing: 6,
                  color: 'rgba(212,175,55,0.55)',
                }}
              >
                July 30, 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story phase — full scroll experience */}
      <AnimatePresence>
        {phase === 'story' && (
          <motion.main
            key="story"
            className="relative w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ zIndex: 10 }}
          >
            <Hero />
            <Divider />
            <Message />
            <Divider />
            <DateSection />
            <Divider />
            <Location />
            <Divider />
            <RSVP />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

function Divider() {
  return (
    <div className="w-full flex items-center justify-center py-4">
      <div
        style={{
          width: 'min(240px, 60%)',
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)',
        }}
      />
    </div>
  )
}
