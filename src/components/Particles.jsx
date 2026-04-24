import { useEffect, useRef } from 'react'

export default function Particles({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Spawn particles
    const spawnBurst = () => {
      const cx = canvas.width / 2
      const cy = canvas.height * 0.45
      for (let i = 0; i < 24; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.3 + Math.random() * 1.2
        const size = 1 + Math.random() * 3
        const isGold = Math.random() > 0.3
        particles.current.push({
          x: cx + (Math.random() - 0.5) * 40,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          alpha: 0.9,
          size,
          color: isGold
            ? `rgba(212,175,55,`
            : `rgba(240,210,120,`,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          gravity: 0.03,
        })
      }
    }

    spawnBurst()
    setTimeout(spawnBurst, 300)
    setTimeout(spawnBurst, 600)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.life > 0)
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.99
        p.life -= p.decay
        p.alpha = Math.max(0, p.life)

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.shadowColor = '#D4AF37'
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      if (particles.current.length > 0) {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 30 }}
    />
  )
}
