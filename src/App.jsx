import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Envelope from './components/Envelope'
import InvitationCard from './components/InvitationCard'
import Countdown from './components/Countdown'
import Particles from './components/Particles'

export default function App() {
  const [phase, setPhase] = useState('envelope') // 'envelope' | 'revealing' | 'invitation'
  const [showParticles, setShowParticles] = useState(false)

  const handleOpenComplete = () => {
    setShowParticles(true)
    setTimeout(() => {
      setPhase('revealing')
      setTimeout(() => setPhase('invitation'), 200)
    }, 600)
  }

  return (
    <div
      className="relative min-h-svh w-full flex flex-col items-center overflow-x-hidden"
      style={{ background: phase === 'invitation' ? '#3E0709' : '#F8F6F2' }}
    >
      {/* Background transition */}
      <AnimatePresence>
        {phase === 'invitation' && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'linear-gradient(165deg, #8B0C16 0%, #6A0A12 30%, #4A0709 60%, #2E0506 100%)',
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Marble background (envelope phase) */}
      <AnimatePresence>
        {phase === 'envelope' && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ zIndex: 0 }}
          >
            <div className="bg-marble-pattern w-full h-full" />
            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(200,190,175,0.35) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film grain overlay */}
      <div className="grain-overlay" />

      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center min-h-svh">
        {/* Envelope phase */}
        <AnimatePresence>
          {phase === 'envelope' && (
            <motion.div
              className="relative flex flex-col items-center justify-center min-h-svh w-full px-6"
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Top subtitle */}
              <motion.div
                className="mb-10 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="uppercase tracking-widest"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '10px',
                    letterSpacing: '6px',
                    color: 'rgba(122,12,20,0.5)',
                  }}
                >
                  A Special Invitation
                </p>
                <motion.div
                  className="mt-2 mx-auto"
                  style={{
                    width: 60,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />
              </motion.div>

              {/* Envelope */}
              <div className="relative">
                <Particles active={showParticles} />
                <Envelope onOpenComplete={handleOpenComplete} />
              </div>

              {/* Bottom tagline */}
              <motion.div
                className="mt-14 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  style={{
                    fontFamily: 'Great Vibes, cursive',
                    fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
                    color: 'rgba(122,12,20,0.7)',
                    lineHeight: 1.2,
                  }}
                >
                  Nihal &amp; Hou
                </p>
                <p
                  className="mt-1 uppercase tracking-widest"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '9px',
                    letterSpacing: '5px',
                    color: 'rgba(184,150,12,0.6)',
                  }}
                >
                  July 30, 2026
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invitation phase */}
        <AnimatePresence>
          {(phase === 'revealing' || phase === 'invitation') && (
            <motion.div
              className="w-full flex flex-col items-center px-4 sm:px-6 py-10 sm:py-16 gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative top */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p
                  className="uppercase tracking-widest text-center"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '9px',
                    letterSpacing: '6px',
                    color: 'rgba(212,175,55,0.4)',
                  }}
                >
                  Wedding Invitation
                </p>
              </motion.div>

              {/* Invitation card */}
              <div className="w-full flex justify-center max-w-lg">
                <InvitationCard visible={phase === 'invitation'} />
              </div>

              {/* Divider */}
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                <div
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
                  }}
                />
              </motion.div>

              {/* Countdown */}
              <motion.div
                className="w-full max-w-md pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 3 }}
              >
                <Countdown />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
