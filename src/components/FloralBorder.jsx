export default function FloralBorder({ color = '#D4AF37', opacity = 0.5 }) {
  const c = color
  const o = opacity

  return (
    <svg
      viewBox="0 0 400 60"
      className="w-full"
      style={{ maxWidth: 360, display: 'block', margin: '0 auto' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="petalGrad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity={o * 1.5} />
          <stop offset="100%" stopColor={c} stopOpacity={o * 0.3} />
        </radialGradient>
      </defs>

      {/* Center ornament */}
      <g transform="translate(200,30)">
        <circle cx="0" cy="0" r="3" fill={c} opacity={o} />
        <circle cx="0" cy="0" r="5" fill="none" stroke={c} strokeWidth="0.5" opacity={o * 0.5} />
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-8"
            rx="2.5"
            ry="5"
            fill={c}
            opacity={o * 0.6}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* Left branch */}
      <g transform="translate(200,30)">
        {[-40, -70, -100, -130, -160].map((x, i) => (
          <g key={i} transform={`translate(${x}, 0)`}>
            <circle cx="0" cy="0" r="1.5" fill={c} opacity={o * 0.7} />
          </g>
        ))}
        <path
          d="M-20,0 C-40,0 -60,-6 -80,-2 C-100,2 -120,-4 -160,0"
          fill="none"
          stroke={c}
          strokeWidth="0.8"
          opacity={o * 0.4}
        />
        {/* Leaves */}
        {[[-35, -5, -15], [-65, 4, 15], [-100, -4, -20], [-135, 3, 10]].map(([x, y, rot], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="7"
            ry="3"
            fill={c}
            opacity={o * 0.25}
            transform={`rotate(${rot}, ${x}, ${y})`}
          />
        ))}
        {/* Mini flowers */}
        {[[-50, -8], [-90, 6], [-130, -6]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="0" r="2" fill={c} opacity={o * 0.5} />
            {[0, 72, 144, 216, 288].map((a, j) => (
              <ellipse key={j} cx="0" cy="-4" rx="1.5" ry="3" fill={c} opacity={o * 0.35} transform={`rotate(${a})`} />
            ))}
          </g>
        ))}
      </g>

      {/* Right branch (mirrored) */}
      <g transform="translate(200,30) scale(-1,1)">
        {[-40, -70, -100, -130, -160].map((x, i) => (
          <g key={i} transform={`translate(${x}, 0)`}>
            <circle cx="0" cy="0" r="1.5" fill={c} opacity={o * 0.7} />
          </g>
        ))}
        <path
          d="M-20,0 C-40,0 -60,-6 -80,-2 C-100,2 -120,-4 -160,0"
          fill="none"
          stroke={c}
          strokeWidth="0.8"
          opacity={o * 0.4}
        />
        {[[-35, -5, -15], [-65, 4, 15], [-100, -4, -20], [-135, 3, 10]].map(([x, y, rot], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="7"
            ry="3"
            fill={c}
            opacity={o * 0.25}
            transform={`rotate(${rot}, ${x}, ${y})`}
          />
        ))}
        {[[-50, -8], [-90, 6], [-130, -6]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="0" r="2" fill={c} opacity={o * 0.5} />
            {[0, 72, 144, 216, 288].map((a, j) => (
              <ellipse key={j} cx="0" cy="-4" rx="1.5" ry="3" fill={c} opacity={o * 0.35} transform={`rotate(${a})`} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}
