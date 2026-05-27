import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ children, className = '', hover = true, glow = false, ...props }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={[
        'relative rounded-2xl overflow-hidden transition-shadow duration-300',
        'bg-card border border-border hover:border-primary/30',
        'backdrop-blur-xl shadow-glass',
        glow ? 'shadow-glow hover:shadow-glow' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  )
}
