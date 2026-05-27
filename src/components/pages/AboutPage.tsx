import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useInView, animate } from 'framer-motion'
import {
  Sparkles, Target, Eye, CheckCircle2,
  Briefcase, TrendingUp, Handshake, Zap,
  ChevronDown, Mail,
} from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerItem } from '../ui/AnimatedSection'
import { GradientOrb } from '../ui/GradientOrb'
import { InteractiveRobotSpline } from '../ui/interactive-3d-robot'

/* ─── CountUp helper ────────────────────────────────────────────────────── */

/** Parse a display string like "100%", "24/7", "99.7%" into parts */
function parseStatValue(v: string) {
  const m = v.match(/^([^0-9]*)([0-9]+\.?[0-9]*)(.*)$/)
  if (!m) return { target: 0, prefix: '', suffix: v, decimals: 0 }
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0
  return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3], decimals }
}

interface CountUpNumberProps {
  value: string
  delay?: number
  className?: string
}

function CountUpNumber({ value, delay = 0, className }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const { prefix, target, suffix, decimals } = parseStatValue(value)
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(count, target, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],          // fast start, soft landing
      onUpdate: (latest) =>
        setDisplay(
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.floor(latest).toString()
        ),
    })
    return () => ctrl.stop()
  }, [isInView, count, target, decimals, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const ROBOT_SCENE_URL = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode'

const ADVANTAGES = [
  { icon: Briefcase,   label: 'Deep Industry\nExperience' },
  { icon: TrendingUp,  label: 'Multidisciplinary\nExecution' },
  { icon: Handshake,   label: 'Scalable Delivery\nModel' },
  { icon: Zap,         label: 'Strategic Advisory\nNetwork' },
]

const STATS = [
  { v: '100%',  l: 'Client Satisfaction',   sub: 'Every engagement' },
  { v: '24/7',  l: 'Support Available',     sub: 'Round-the-clock' },
  { v: '99.7%', l: 'Quality Score',         sub: 'Zero defect target' },
  { v: '100%',  l: 'Regulatory Compliance', sub: 'Every transaction' },
]

const TEAM = [
  {
    name:     'Raju Gourishetty',
    img:      '/muniraju.png',
    email:    'raju.gourishetty@swajay.com',
    linkedin: 'https://linkedin.com/in/raju-gourishetty',
  },
  {
    name:     'Nagaraj Srinivasamurthy',
    img:      '/nagaraj.jpg',
    email:    'nagaraj.srinivasamurthy@swajay.com',
    linkedin: 'https://linkedin.com/in/nagaraj-srinivasamurthy',
  },
  {
    name:     'Muniraju S',
    img:      '/raju.jpg',
    email:    'muniraju.s@swajay.com',
    linkedin: 'https://linkedin.com/in/muniraju-s',
  },
  {
    name:     'Thirumalesh M V',
    img:      '/thiru.png',
    email:    'thirumalesh.mv@swajay.com',
    linkedin: 'https://linkedin.com/in/thirumalesh-mv',
  },
]

const PARTNERS = ['Resware', 'Qualia', 'SoftPro', 'Encompass', 'ICE Mortgage Technology']

/* ─── Spotlight gradient builders ───────────────────────────────────────── */

/** Dark-vignette with a bright "hole" wherever the robot looks */
function buildActiveSpotlight(x: number, y: number): string {
  return `radial-gradient(
    circle 400px at ${x}px ${y}px,
    transparent            0%,
    transparent           18%,
    rgba(8, 7, 20, 0.28)  42%,
    rgba(8, 7, 20, 0.58)  68%,
    rgba(8, 7, 20, 0.74) 100%
  )`
}

/** Soft center-default before first mouse interaction */
const defaultSpotlight =
  `radial-gradient(
    circle 360px at 30% 50%,
    transparent            0%,
    transparent           12%,
    rgba(8, 7, 20, 0.22)  38%,
    rgba(8, 7, 20, 0.52)  65%,
    rgba(8, 7, 20, 0.68) 100%
  )`

/** Warm-halo glow that sits *on top* of text in spotlight center */
function buildGlowSpotlight(x: number, y: number): string {
  return `radial-gradient(
    circle 320px at ${x}px ${y}px,
    rgba(255, 220, 140, 0.13)  0%,
    rgba(180, 110, 255, 0.09) 35%,
    transparent               70%
  )`
}

const defaultGlow =
  `radial-gradient(
    circle 280px at 30% 50%,
    rgba(180, 110, 255, 0.07) 0%,
    transparent              60%
  )`

/* ─── Component ──────────────────────────────────────────────────────────── */

export function AboutPage() {
  const heroRef     = useRef<HTMLElement>(null)
  const vignRef     = useRef<HTMLDivElement>(null)   // dark-vignette overlay
  const glowRef     = useRef<HTMLDivElement>(null)   // warm-glow overlay
  const hasMovedRef = useRef(false)

  /* Direct DOM writes — zero React re-renders, silky smooth at 60fps */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (vignRef.current) {
      vignRef.current.style.background = buildActiveSpotlight(x, y)
    }
    if (glowRef.current) {
      glowRef.current.style.background = buildGlowSpotlight(x, y)
      if (!hasMovedRef.current) {
        glowRef.current.style.opacity = '1'
        hasMovedRef.current = true
      }
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (vignRef.current) vignRef.current.style.background = defaultSpotlight
    if (glowRef.current) {
      glowRef.current.style.background = defaultGlow
      glowRef.current.style.opacity = '0.6'
      hasMovedRef.current = false
    }
  }, [])

  return (
    <div className="bg-background overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO  —  Interactive 3-D Robot with spotlight-on-text effect
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden pt-[86px]"
        style={{ background: '#09090f' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* ── Ambient background mesh ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 20% 30%,  rgba(108, 92, 231, 0.14) 0%, transparent 65%),
              radial-gradient(ellipse 50% 50% at 80% 70%,  rgba(142, 68, 173, 0.10) 0%, transparent 65%),
              radial-gradient(ellipse 60% 55% at 55% 10%,  rgba(100, 149, 237, 0.08) 0%, transparent 65%),
              #09090f
            `,
          }}
        />

        {/* ── Robot scene (right 65 %) ── */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] z-10">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="w-full h-full"
          />
        </div>

        {/* ── Left-fade — blends robot into dark bg so text is readable ── */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #09090f 28%, rgba(9,9,15,0.72) 52%, transparent 78%)',
          }}
        />

        {/* ── Bottom fade — hero → page ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
          }}
        />

        {/* ── Dark vignette with spotlight "hole" ── */}
        <div
          ref={vignRef}
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ background: defaultSpotlight }}
        />

        {/* ── Warm glow at spotlight center (additive brightness) ── */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-40 pointer-events-none"
          style={{
            background: defaultGlow,
            opacity: 0.6,
            mixBlendMode: 'screen',
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* ── Text content ── */}
        <div className="relative z-50 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="min-h-screen flex items-center">
            <AnimatedSection direction="left" className="max-w-[520px] py-24">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
                style={{
                  background: 'rgba(108, 92, 231, 0.12)',
                  borderColor: 'rgba(108, 92, 231, 0.3)',
                }}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-violet-300 uppercase">
                  About Us
                </span>
              </div>

              {/* Headline — spotlight makes these pop */}
              <h1
                className="font-extrabold leading-tight tracking-[-0.02em] mb-6"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                About{' '}
                <span className="text-gradient">Swajay</span>
              </h1>

              {/* Subtext — more muted so spotlight contrast is visible */}
              <p
                className="text-lg leading-relaxed mb-10"
                style={{ color: 'rgba(255,255,255,0.48)' }}
              >
                Decades of expertise, modern innovation, and a commitment to
                solving real business challenges
              </p>

              {/* Advantages mini-grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {ADVANTAGES.map((adv) => {
                  const Icon = adv.icon
                  return (
                    <motion.div
                      key={adv.label}
                      whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                      className="flex items-center gap-2.5 p-3 rounded-xl cursor-default"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(100,149,237,0.25), rgba(142,68,173,0.25))',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 text-violet-300" />
                      </div>
                      <span
                        className="text-xs font-semibold whitespace-pre-line leading-tight"
                        style={{ color: 'rgba(255,255,255,0.72)' }}
                      >
                        {adv.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>


            </AnimatedSection>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          />
        </motion.div>

      </section>

      {/* ─── Partners Marquee ──────────────────────────────────────────────── */}
      <section className="py-8 bg-background border-y border-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] flex-shrink-0" />
            <p className="text-sm font-bold text-foreground">Our Deep Expertise on Third Party Products</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 w-max"
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 rounded-xl bg-card border border-border cursor-default"
              >
                <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">{p}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Our Mission</p>
              <h2 className="text-4xl font-extrabold text-foreground mb-6 leading-tight tracking-[-0.02em]">
                What Drives Us <span className="text-gradient">Forward</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Make advanced AI solutions useful and affordable — shipped quickly, run responsibly, and scaled with customers.
              </p>
              <ul className="space-y-4">
                {['Speed without sacrifice', 'Affordability at scale', 'Responsible innovation'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6495ed] to-[#8e44ad] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-primary/50 via-[#6495ed]/30 to-[#8e44ad]/50">
                <div className="rounded-2xl bg-card p-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <Target className="w-7 h-7" />
                  </div>
                  <p className="text-xl text-foreground leading-relaxed font-semibold mb-6">
                    Mission-driven innovation focused on real business outcomes
                  </p>
                  <div className="pt-5 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Trusted by leading mortgage companies</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Vision ───────────────────────────────────────────────────────── */}
      <section className="py-24 relative bg-card/40 overflow-hidden">
        <GradientOrb size={400} color="blue" className="bottom-0 right-0 opacity-40" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" className="order-2 md:order-1">
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#6495ed]/50 via-primary/30 to-[#8e44ad]/50">
                <div className="rounded-2xl bg-card p-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6495ed]/20 to-primary/20 rounded-2xl flex items-center justify-center text-[#6495ed] mb-6">
                    <Eye className="w-7 h-7" />
                  </div>
                  <p className="text-xl text-foreground leading-relaxed font-semibold">
                    Enabling organizational excellence across industries
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="order-1 md:order-2">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Our Vision</p>
              <h2 className="text-4xl font-extrabold text-foreground mb-6 leading-tight tracking-[-0.02em]">
                Where We're <span className="text-gradient">Headed</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                To deliver intelligent Automation and AI solutions that empower organizations in Mortgage, BFSI/Healthcare,
                Commerce, and Legal domains to achieve superior customer outcomes and operational excellence.
              </p>
              <ul className="space-y-4">
                {['Industry-leading automation', 'Superior customer outcomes', 'Operational excellence'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6495ed] to-[#8e44ad] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group overflow-hidden cursor-default text-center"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/5 group-hover:to-[#8e44ad]/5 transition-all duration-500" />
                <div className="relative">
                  <div className="text-5xl lg:text-6xl font-extrabold text-gradient mb-2 tabular-nums leading-none">
                    <CountUpNumber value={s.v} delay={i * 0.15} />
                  </div>
                  <div className="font-semibold text-foreground mb-1">{s.l}</div>
                  <div className="text-sm text-muted-foreground">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-24 relative bg-card/40 overflow-hidden">
        <GradientOrb size={500} color="purple" className="top-0 left-0 opacity-30" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.22em] text-primary uppercase mb-4">Leadership</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-[-0.02em]">Our Team</h2>
            <p className="text-lg text-gradient font-semibold">Better outcomes, built together</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={0.1}>
            {TEAM.map(person => (
              <motion.div key={person.name} variants={staggerItem}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative bg-card border border-border rounded-2xl p-4 text-center hover:border-primary/40 transition-colors cursor-default overflow-hidden"
                >
                  {/* card gradient wash */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-[#8e44ad]/5 rounded-2xl" />
                  {/* top-edge sheen */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                  {/* image + hover overlay */}
                  <div className="relative mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-[#8e44ad]/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={person.img}
                      alt={person.name}
                      className="relative w-full aspect-square object-cover object-top rounded-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                    />

                    {/* ── Contact slide-up overlay ── */}
                    <div
                      className="
                        absolute inset-0 rounded-xl
                        flex flex-col items-center justify-center gap-2.5
                        bg-[rgba(7,5,22,0.86)] backdrop-blur-[6px]
                        opacity-0 translate-y-3
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300 ease-out
                      "
                    >
                      {/* Email */}
                      <a
                        href={`mailto:${person.email}`}
                        onClick={e => e.stopPropagation()}
                        className="
                          flex items-center gap-2 w-[82%]
                          px-3 py-2 rounded-lg
                          text-[11px] text-violet-200/90 hover:text-white
                          hover:bg-white/10 transition-colors duration-150
                        "
                      >
                        <Mail size={13} className="shrink-0 text-violet-400" />
                        <span className="truncate">{person.email}</span>
                      </a>

                      <div className="w-[72%] h-px bg-violet-500/20" />

                      {/* LinkedIn */}
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="
                          flex items-center gap-2 w-[82%]
                          px-3 py-2 rounded-lg
                          text-[11px] text-violet-200/90 hover:text-white
                          hover:bg-white/10 transition-colors duration-150
                        "
                      >
                        {/* LinkedIn logo mark */}
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 text-violet-400">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn Profile</span>
                      </a>
                    </div>
                  </div>

                  <h3 className="relative text-sm font-bold text-foreground leading-tight">{person.name}</h3>
                </motion.div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

    </div>
  )
}
