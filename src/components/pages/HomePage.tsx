import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  FileText, CheckCircle, Cpu, Zap, Shield, Layers, Repeat, Lock,
  Handshake, Briefcase, TrendingUp, Rocket, ArrowRight, Database,
  BarChart3, Bot, Cloud, Search, GitBranch
} from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'

type Page = 'home' | 'about' | 'services' | 'automation' | 'case-studies' | 'contact'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reveal: any = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection({ onNav }: { onNav: (p: Page) => void }) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Spline 3D */}
      <motion.div className="absolute inset-y-0 z-0" style={{ left: '18%', right: '-18%', y: sceneY }}>
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(26,29,35,0.88) 0%, rgba(26,29,35,0.76) 22%, rgba(26,29,35,0.52) 42%, rgba(26,29,35,0.18) 62%, rgba(26,29,35,0.04) 80%, transparent 100%)',
        }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-background/70 via-transparent to-transparent" />

      {/* Grid */}
      <div className="absolute inset-0 z-[1] bg-[size:60px_60px] bg-grid-dark opacity-[0.15] pointer-events-none" />

      {/* Content */}
      <motion.div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 w-full pt-[120px] pb-32 pointer-events-none" style={{ y: contentY }}>
        <div className="max-w-[520px]">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-sans font-semibold text-primary tracking-[0.18em] uppercase">
              AI-Powered Mortgage Solutions
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black tracking-[-0.03em] leading-[0.93] mb-8"
            style={{ fontSize: 'clamp(42px, 4.8vw, 66px)' }}
          >
            <span className="block text-foreground">Transforming</span>
            <span className="block" style={{ background: 'linear-gradient(135deg, #6c5ce7 0%, #8e44ad 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Mortgage</span>
            <span className="block text-foreground">Operations</span>
            <span className="block" style={{ background: 'linear-gradient(135deg, #6c5ce7 0%, #8e44ad 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>with AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="font-sans text-lg sm:text-xl text-muted-foreground leading-[1.65] max-w-[560px] mb-12"
          >
            End-to-end mortgage operations, title services, and intelligent
            automation — delivered by a specialized team combining deep domain
            expertise with cutting-edge AI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-14 pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(108,92,231,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNav('contact')}
              className="cursor-pointer flex items-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-[15px] text-white bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] shadow-glow"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNav('case-studies')}
              className="cursor-pointer flex items-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-[15px] text-muted-foreground bg-card border border-border hover:bg-card/80 hover:text-foreground transition-all"
            >
              See Case Studies
            </motion.button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.6 }}
            className="flex items-center gap-6 flex-wrap"
          >
            {[
              { icon: CheckCircle, label: '5,000+ Orders/Month', color: 'text-green-400' },
              { icon: Shield,       label: 'SOC 2 Compliant',    color: 'text-[#6495ed]' },
              { icon: TrendingUp,   label: '90% Cost Reduction', color: 'text-primary' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <t.icon className={`w-4 h-4 ${t.color} flex-shrink-0`} />
                <span className="text-sm font-sans font-medium text-muted-foreground">{t.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-[10px] font-sans font-medium text-muted-foreground/40 tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-muted-foreground/30 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub, index }: { value: string; label: string; sub: string; index: number }) {
  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-[#8e44ad]/0 group-hover:from-primary/5 group-hover:to-[#8e44ad]/5 transition-all duration-500" />
      <div className="relative">
        <div className="font-display text-5xl lg:text-6xl font-black text-gradient-static mb-3 tabular-nums">{value}</div>
        <div className="font-display text-lg font-semibold text-foreground mb-1.5">{label}</div>
        <div className="font-sans text-sm text-muted-foreground">{sub}</div>
      </div>
    </motion.div>
  )
}

function useParallaxBg(speed = 60) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed])
  return { ref, y }
}

function StatsSection() {
  const { ref, y } = useParallaxBg(50)
  const STATS = [
    { value: '5,000+', label: 'Orders / Month',    sub: 'Zero defect SLA' },
    { value: '90%',    label: 'Cost Reduction',     sub: 'vs. traditional ops' },
    { value: '$1.7M+', label: 'Loan Volume',        sub: 'Processed to date' },
    { value: '40%',    label: 'Faster Turnaround',  sub: 'Average cycle time' },
  ]

  return (
    <div ref={ref} className="relative py-20 overflow-hidden bg-background">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" style={{ y }} />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
        </div>
      </div>
    </div>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const MORTGAGE_SERVICES = [
  { icon: FileText,   title: 'Document Processing', desc: 'AI-powered extraction and validation across all mortgage document types with 99.8% accuracy.' },
  { icon: Search,     title: 'Title Search',         desc: 'Comprehensive title examination, lien searches, and chain of title analysis.' },
  { icon: Shield,     title: 'Compliance & Quality', desc: 'Built-in regulatory compliance checks and quality assurance for every transaction.' },
  { icon: GitBranch,  title: 'LOS Integration',      desc: 'Seamless integration with all major Loan Origination Systems.' },
  { icon: Repeat,     title: 'Process Automation',   desc: 'End-to-end workflow automation reducing manual touchpoints by up to 80%.' },
  { icon: CheckCircle,title: 'Curative Services',    desc: 'Rapid resolution of title defects, liens, and encumbrances.' },
]

const TECH_SERVICES = [
  { icon: Cpu,     title: 'Engineering Services',         desc: 'Full-stack development teams specializing in mortgage and fintech platforms.' },
  { icon: Bot,     title: 'AI & Automation',              desc: 'Intelligent document processing, agentic AI, and RPA for mortgage workflows.' },
  { icon: BarChart3,title: 'Data & Business Intelligence', desc: 'Advanced analytics, reporting dashboards, and data strategy.' },
  { icon: Cloud,   title: 'Secure Cloud & Integration',   desc: 'AWS/Azure cloud architecture with enterprise-grade security and compliance.' },
]

function ServiceCard({ icon: Icon, title, desc, index }: { icon: React.ElementType; title: string; desc: string; index: number }) {
  return (
    <motion.div
      {...fadeUp(index * 0.07)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all cursor-default overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/6 to-[#8e44ad]/4" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />
      <div className="relative">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2.5">{title}</h3>
        <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

function ServicesSection({ onNav }: { onNav: (p: Page) => void }) {
  const [tab, setTab] = useState<'mortgage' | 'tech'>('mortgage')
  const { ref, y } = useParallaxBg(40)

  return (
    <div ref={ref} className="relative py-28 overflow-hidden bg-background">
      <motion.div className="absolute inset-0 bg-[size:60px_60px] bg-grid-dark opacity-40" style={{ y }} />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-sans text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-5"
          >
            What We Do
          </motion.p>
          <motion.h2
            custom={1} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.02em] text-foreground mb-5 leading-[1.1]"
          >
            End-to-End Mortgage<br />
            <span className="text-gradient">Operations & Technology</span>
          </motion.h2>
          <motion.p
            custom={2} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            From title search to AI automation — we cover every layer of the mortgage value chain.
          </motion.p>
        </div>

        {/* Tab toggle */}
        <motion.div
          variants={reveal} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex p-1.5 rounded-xl bg-card border border-border gap-1">
            {[
              { id: 'mortgage', label: 'Mortgage Capabilities' },
              { id: 'tech',     label: 'Technology Excellence' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as 'mortgage' | 'tech')}
                className={`cursor-pointer px-5 py-2.5 rounded-lg font-sans text-sm font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white shadow-glow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className={`grid gap-4 ${tab === 'mortgage' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}
          >
            {(tab === 'mortgage' ? MORTGAGE_SERVICES : TECH_SERVICES).map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          variants={reveal} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button onClick={() => onNav('services')}
            className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm text-muted-foreground border border-border hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-all group">
            Explore All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── AUTOMATION SHOWCASE ──────────────────────────────────────────────────────
const PIPELINE_STEPS = [
  { icon: FileText, label: 'Document Intake',  desc: 'PDF, TIFF, images auto-classified',        color: '#6c5ce7', done: true },
  { icon: Bot,      label: 'AI Extraction',    desc: 'Fields extracted at 99.8% accuracy',        color: '#6495ed', done: true },
  { icon: Shield,   label: 'Compliance Check', desc: 'RESPA, TILA, state regs validated',         color: '#8e44ad', done: true },
  { icon: Database, label: 'LOS Push',         desc: 'Data pushed directly into your system',     color: '#4b0082', done: false },
]

function AutomationSection({ onNav }: { onNav: (p: Page) => void }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % PIPELINE_STEPS.length), 1800)
    return () => clearInterval(id)
  }, [])
  const { ref, y } = useParallaxBg(60)

  return (
    <div ref={ref} className="relative py-28 overflow-hidden bg-card/40">
      <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-[#8e44ad]/8" style={{ y }} />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <div>
            <motion.p
              variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-sans text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-5"
            >
              AI & Automation
            </motion.p>
            <motion.h2
              custom={1} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.02em] text-foreground mb-6 leading-[1.1]"
            >
              From Document to<br />
              <span className="text-gradient">Decision in Seconds</span>
            </motion.h2>
            <motion.p
              custom={2} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Our AI pipeline handles the entire lifecycle — intake, extraction, validation, and system push — without human intervention.
            </motion.p>

            <motion.div
              custom={3} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-4 mb-10"
            >
              {[
                { icon: Zap,          label: '80% reduction in manual touchpoints' },
                { icon: CheckCircle,  label: 'Sub-2-second document processing' },
                { icon: Lock,         label: 'Audit trail on every transaction' },
                { icon: Layers,       label: 'Integrates with any LOS or platform' },
              ].map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-sans text-[15px] font-medium text-muted-foreground">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              custom={4} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => onNav('automation')}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] hover:shadow-glow transition-shadow"
            >
              Explore AI Solutions <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right: pipeline visual */}
          <motion.div
            variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <div className="relative bg-card rounded-2xl border border-border p-6 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-sans font-medium text-muted-foreground">AI Processing Pipeline — Live</span>
              </div>

              <div className="space-y-3">
                {PIPELINE_STEPS.map((step, i) => (
                  <motion.div
                    key={step.label}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                      active === i ? 'bg-background border border-border' : 'bg-background/50 border border-transparent'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500`}
                        style={{ background: active === i ? `${step.color}25` : 'rgba(255,255,255,0.04)' }}>
                        <step.icon className="w-5 h-5" style={{ color: active === i ? step.color : 'var(--muted-foreground)' }} />
                      </div>
                      {active === i && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ boxShadow: `0 0 20px ${step.color}50` }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-sm font-semibold text-foreground/80">{step.label}</span>
                        {active >= i ? (
                          <span className="text-[10px] font-sans font-medium text-green-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Done
                          </span>
                        ) : (
                          <span className="text-[10px] font-sans text-muted-foreground/50">Waiting</span>
                        )}
                      </div>
                      <p className="font-sans text-[13px] text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                <span className="text-sm font-sans text-muted-foreground">Total Processing Time</span>
                <motion.span
                  className="font-display text-sm font-bold text-green-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  1.4 seconds
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── CASE STUDIES PREVIEW ─────────────────────────────────────────────────────
const CASES = [
  {
    metric: '90%', metricLabel: 'Cost Reduction',
    title: 'Automating Report Generation',
    desc: 'Replaced manual reporting with RPA bots — thousands of reports generated monthly with zero errors.',
    tags: ['RPA', 'Automation', 'Reporting'],
    color: 'from-[#6495ed] to-[#6c5ce7]',
  },
  {
    metric: '5,000+', metricLabel: 'Orders/Month',
    title: 'AI Order Management System',
    desc: 'Agentic AI solution processing thousands of orders monthly with full audit trail and compliance.',
    tags: ['Agentic AI', 'Order Mgmt', 'Compliance'],
    color: 'from-[#6c5ce7] to-[#8e44ad]',
  },
  {
    metric: '$1.7M+', metricLabel: 'Loan Volume',
    title: 'Web & Mobile App for Lender',
    desc: 'End-to-end digital lending platform with real-time processing and mobile-first borrower experience.',
    tags: ['Product', 'Mobile', 'Fintech'],
    color: 'from-[#8e44ad] to-[#4b0082]',
  },
]

function CaseStudiesSection({ onNav }: { onNav: (p: Page) => void }) {
  const { ref, y } = useParallaxBg(50)
  return (
    <div ref={ref} className="relative py-28 overflow-hidden bg-background">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/4 to-transparent" style={{ y }} />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 relative">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <motion.p
              variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-sans text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-5"
            >
              Proven Results
            </motion.p>
            <motion.h2
              custom={1} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.02em] text-foreground leading-[1.1]"
            >
              Real Outcomes,<br />
              <span className="text-gradient">Measured Impact</span>
            </motion.h2>
          </div>
          <motion.button
            variants={reveal} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
            whileHover={{ scale: 1.03 }} onClick={() => onNav('case-studies')}
            className="cursor-pointer flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold text-sm text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all"
          >
            All Case Studies <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-7 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-[#8e44ad]/5" />

              <div className={`inline-block font-display text-6xl font-black bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-1.5 tabular-nums`}>
                {c.metric}
              </div>
              <div className="font-sans text-sm font-medium text-muted-foreground mb-5">{c.metricLabel}</div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3 leading-snug">{c.title}</h3>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-5">{c.desc}</p>

              <div className="flex flex-wrap gap-2">
                {c.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-primary/10 text-[11px] font-sans font-medium text-primary">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── WHY SWAJAY ───────────────────────────────────────────────────────────────
const WHY = [
  {
    icon: Briefcase,
    title: 'Industry Expertise',
    desc: 'Decades of hands-on experience across mortgage servicing, operations, and regulated enterprise environments.',
    stat: '20+', statLabel: 'Years combined experience',
    color: '#6c5ce7',
  },
  {
    icon: TrendingUp,
    title: 'Proven Outcomes',
    desc: 'Measurable results in cost reduction, faster processing times, and operational efficiency at every engagement.',
    stat: '50+', statLabel: 'Projects delivered',
    color: '#6495ed',
  },
  {
    icon: Rocket,
    title: 'Speed to Value',
    desc: 'Outcome-first approach delivering results in weeks, not months — with specialized squads and proven accelerators.',
    stat: '2–4 wks', statLabel: 'Average time to first delivery',
    color: '#8e44ad',
  },
]

function WhySection({ onNav }: { onNav: (p: Page) => void }) {
  const { ref, y } = useParallaxBg(50)
  return (
    <div ref={ref} className="relative py-28 overflow-hidden bg-card/40">
      <motion.div className="absolute inset-0 bg-[size:60px_60px] bg-grid-dark opacity-25" style={{ y }} />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 relative">
        <div className="text-center mb-16">
          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-sans text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-5"
          >
            Why Swajay
          </motion.p>
          <motion.h2
            custom={1} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.02em] text-foreground leading-[1.1]"
          >
            The Partner You Need<br />
            <span className="text-gradient">to Scale With Confidence</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              custom={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-2xl bg-card border border-border overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${w.color}80, transparent)` }} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${w.color}10 0%, transparent 70%)` }} />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ background: `${w.color}18` }}>
                  <w.icon className="w-6 h-6" style={{ color: w.color }} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{w.title}</h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-7">{w.desc}</p>
                <div className="pt-5 border-t border-border">
                  <span className="font-display text-3xl font-black tabular-nums" style={{ color: w.color }}>{w.stat}</span>
                  <span className="font-sans text-sm font-medium text-muted-foreground ml-2.5">{w.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={reveal} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mt-14"
        >
          <button onClick={() => onNav('about')}
            className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-all group">
            About Our Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── PURPOSE / HOW WE WORK ────────────────────────────────────────────────────
const PURPOSE_ITEMS = [
  { icon: Zap,       title: 'Outcome with Agility & Speed',        desc: 'Rapid delivery without compromising quality or compliance. We ship results fast.', tag: '01' },
  { icon: Repeat,    title: 'Reuse Before Reinvent',                desc: 'Leverage proven accelerators and frameworks for faster, lower-risk implementation.', tag: '02' },
  { icon: Lock,      title: 'Information & Data Privacy by Default', desc: 'Security and compliance baked into every layer — not bolted on afterward.', tag: '03' },
  { icon: Cpu,       title: 'Technology Excellence',                desc: 'Cutting-edge AI, cloud, and automation embedded directly into your workflows.', tag: '04' },
  { icon: Layers,    title: 'Scalable Delivery',                    desc: 'Modular, pod-based teams that ramp quickly and evolve with your needs.', tag: '05' },
  { icon: Handshake, title: 'Trusted Partnership',                  desc: 'Co-build model with dedicated specialists who deeply understand your objectives.', tag: '06' },
]

function PurposeSection() {
  const { ref, y } = useParallaxBg(40)
  return (
    <div ref={ref} className="relative py-28 overflow-hidden bg-background">
      <motion.div className="absolute inset-0 bg-gradient-to-b from-primary/4 via-transparent to-primary/4" style={{ y }} />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 relative">
        <div className="text-center mb-16">
          <motion.p
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-sans text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-5"
          >
            Our Principles
          </motion.p>
          <motion.h2
            custom={1} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.02em] text-foreground leading-[1.1]"
          >
            How We Work &<br />
            <span className="text-gradient">What Drives Us</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PURPOSE_ITEMS.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/25 transition-all overflow-hidden cursor-default"
            >
              <div className="absolute top-4 right-5 font-display text-4xl font-black text-foreground/[0.04] group-hover:text-foreground/[0.07] transition-colors select-none">
                {p.tag}
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2.5 pr-8">{p.title}</h3>
                <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection({ onNav }: { onNav: (p: Page) => void }) {
  const { ref, y } = useParallaxBg(80)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const blob2Y = useTransform(scrollYProgress, [0, 1], [60, -60])
  return (
    <div ref={ref} className="relative py-28 overflow-hidden bg-card/60">
      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background to-[#8e44ad]/12" style={{ y }} />
      <div className="absolute inset-0 bg-[size:60px_60px] bg-grid-dark opacity-30" />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px]" style={{ y: blob1Y }} />
      <motion.div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#6495ed]/8 blur-[100px]" style={{ y: blob2Y }} />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 text-center">
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <Rocket className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-sans font-semibold text-primary tracking-[0.18em] uppercase">Ready to Transform?</span>
        </motion.div>

        <motion.h2
          custom={1} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-[-0.03em] text-foreground mb-7 leading-[1.0]"
        >
          Let's Build Your<br />
          <span className="text-gradient">AI-Powered Future</span>
        </motion.h2>

        <motion.p
          custom={2} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-sans text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Whether you need to automate operations, modernize your tech stack, or launch a new digital product — we're your specialized partner.
        </motion.p>

        <motion.div
          custom={3} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(108,92,231,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNav('contact')}
            className="cursor-pointer flex items-center gap-2.5 px-9 py-4 rounded-xl font-display font-bold text-base text-white bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] shadow-glow"
          >
            Schedule a Discovery Call <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNav('services')}
            className="cursor-pointer flex items-center gap-2.5 px-9 py-4 rounded-xl font-display font-bold text-base text-muted-foreground bg-card border border-border hover:text-foreground hover:bg-card/80 transition-colors"
          >
            View Services
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export function HomePage({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <div className="bg-background">
      <HeroSection onNav={onNav} />
      <StatsSection />
      <ServicesSection onNav={onNav} />
      <AutomationSection onNav={onNav} />
      <CaseStudiesSection onNav={onNav} />
      <WhySection onNav={onNav} />
      <PurposeSection />
      <CTASection onNav={onNav} />
    </div>
  )
}
