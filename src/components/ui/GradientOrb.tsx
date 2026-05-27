import { motion } from 'framer-motion'

interface Props {
  size?: number
  color?: 'purple' | 'blue' | 'cyan'
  className?: string
  animate?: boolean
}

const colorMap = {
  purple: 'rgba(108,92,231,',   // #6c5ce7
  blue:   'rgba(100,149,237,',  // #6495ed
  cyan:   'rgba(142,68,173,',   // #8e44ad
}

export function GradientOrb({ size = 400, color = 'purple', className = '', animate = true }: Props) {
  const c = colorMap[color]
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${c}0.22) 0%, ${c}0.08) 50%, transparent 70%)`,
      }}
      animate={animate ? {
        scale:   [1, 1.1, 1],
        opacity: [0.4, 0.65, 0.4],
      } : undefined}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
