import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, Bot, Smartphone, Database,
  AlertTriangle, CheckCircle2, Workflow, TrendingUp,
  ArrowLeft, ArrowRight,
} from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerItem } from '../ui/AnimatedSection'
import { GlassCard } from '../ui/GlassCard'
import { GradientOrb } from '../ui/GradientOrb'

/* ─── Types ──────────────────────────────────────────────────────────────── */

type CaseStudy = {
  id: string; tag: string; title: string; image: string
  kpis:       { value: string; label: string }[]
  challenge:  string[]; solution: string[]; execution: string[]; outcomes: string[]
  icon:       React.ReactNode
  testimonial?: { quote: string; author: string; role: string }
  technologies?: string[]
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const studies: CaseStudy[] = [
  {
    id: 'rpa', tag: 'RPA AUTOMATION', title: 'Automating Report Generation',
    icon: <Cpu className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    kpis: [
      { value: '90%',        label: 'Cycle time cut (120 min → 4 min)' },
      { value: '$80K–$100K', label: 'Annual FTE cost savings' },
      { value: '0 Defects',  label: 'Accuracy after automation' },
      { value: '100%',       label: 'SLA adherence achieved' },
    ],
    challenge: [
      'Order management — from receipt via email through to execution — was entirely manual across multiple systems.',
      'Manually processing caused frequent SLA misses, inaccurate reports, and high FTE cost.',
      'Human errors led to compliance risks and time-consuming reconciliations.',
    ],
    solution: [
      'Built on Blue Prism integrating both web and mainframe applications end-to-end.',
      'A BluePrism bot retrieves loan details and generates reports automatically without human touch.',
      'Predefined investor codes and current date are entered into the mainframe; the AIP portal generates and routes the report.',
      'Generated reports are pushed directly to the business team for action.',
    ],
    execution: [
      'Deep collaboration with business and IT teams to outline the automation blueprint.',
      'Detailed process analysis identifying bottlenecks and opportunities for refinement.',
      'All business rules embedded into the solution and validated against live data.',
      'Edge-case scenarios identified and handled before production deployment.',
    ],
    outcomes: [
      '90% cycle time improvement — from 120 minutes to under 4 minutes per report',
      '$80K–$100K annual cost savings through FTE optimization',
      'Zero defects and full SLA adherence post go-live',
      'Eliminated manual errors and strengthened compliance posture',
    ],
  },
  {
    id: 'ai', tag: 'AI & AUTOMATION', title: 'AI-Powered End-to-End Order Management Automation',
    icon: <Bot className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    testimonial: {
      quote: "The AI solution completely transformed our order management. The accuracy and speed we've achieved are unprecedented, allowing our team to focus on strategic growth rather than manual entry.",
      author: 'D',
      role: 'Director of Operations',
    },
    kpis: [
      { value: '100%',   label: "Client SLA adherence" },
      { value: '20%',    label: 'Reduction in order management time' },
      { value: '$20K',   label: 'Annual savings from eliminating manual intervention' },
      { value: '2 Weeks',label: 'Full deployment timeline' },
    ],
    challenge: [
      'The entire order management lifecycle — from email receipt to execution — was fully manual.',
      'Missing SLAs, accuracy issues, and heavy time consumption compounded risk at scale.',
      'No unified view of orders across systems led to reconciliation delays and client dissatisfaction.',
    ],
    solution: [
      'Conducted detailed process analysis to map bottlenecks and define the automation scope.',
      'Collaborated across business and IT to design an AI-first solution architecture.',
      'Built an AI-based MVP and demonstrated it to stakeholders for rapid sign-off.',
      'Achieved full production deployment within 2 weeks with 100% accuracy validation.',
    ],
    execution: [
      'All user personas and role-specific actions captured and encoded into workflow logic.',
      'Custom UI developed for each role with clear status dashboards.',
      'Business rules embedded and validated with real transaction data sets.',
      'Edge-case scenarios identified and resolved before go-live.',
      'Performance tested under peak load with minimum latency thresholds.',
      'QC checks passed at 100% accuracy before productionisation.',
    ],
    outcomes: [
      '100% adherence to client SLAs from day one of production',
      '20% reduction in overall order management time',
      '$20K USD annual savings from removing manual intervention',
      'Dramatic decrease in manual order handling through intelligent automation',
    ],
  },
  {
    id: 'app', tag: 'APP DEVELOPMENT', title: 'Web & Mobile Platform for a Seasoned Mortgage Lender',
    icon: <Smartphone className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    technologies: ['Java', 'Spring Boot', 'React JS', 'AWS', 'REST API'],
    kpis: [
      { value: 'Zero',    label: 'Downtime since Sep\'22 launch with 1.7M customers' },
      { value: '30%',     label: 'Infrastructure cost reduction post cloud migration' },
      { value: '60K/day', label: 'User volumes with sub-2 second API response time' },
      { value: '100%',    label: 'ADA / WCAG accessibility compliance' },
    ],
    challenge: [
      'Monolithic architecture made the mortgage application difficult to scale, maintain, and update.',
      'Legacy UX resulted in poor customer experience and high call-centre volumes.',
      'Frequent downtime of core applications caused direct business loss.',
      'Existing applications were non-compliant with ADA and WCAG accessibility standards.',
    ],
    solution: [
      'Defined a full transformation roadmap migrating monolith to microservices architecture.',
      'Enriched the UI to dramatically improve customer experience.',
      'Migrated all services from on-premise infrastructure to AWS cloud.',
      'Developed a mobile application with 100% American Disability Act compliance.',
    ],
    execution: [
      'Microservices-based web and mobile apps designed for zero-downtime deployments.',
      'Continuous delivery cadence — new features and integrations shipped every two weeks.',
      'Performance testing and load validation against full 1.7M customer volume before launch.',
    ],
    outcomes: [
      'Zero downtime since September 2022 launch across 1.7M customers',
      '30% infrastructure cost reduction after cloud migration',
      '60K daily active users with API response times under 2 seconds',
      'Full ADA / WCAG compliance — drastically reduced inbound call volumes',
    ],
  },
  {
    id: 'data', tag: 'DATA & ANALYTICS', title: 'Data Strategy & Cloud Analytics Platform for a Leading Mortgage Company',
    icon: <Database className="w-4 h-4" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    technologies: ['SSIS', 'SSRS', 'Power BI', 'SQL / SSMS', 'Snowflake'],
    kpis: [
      { value: '94%',    label: 'Increased efficiency of report generation' },
      { value: '30%',    label: 'Cost saving after On-Prem → Snowflake migration' },
      { value: '5%',     label: 'Sales increase with area sales reporting' },
      { value: 'Fresh',  label: 'Bankruptcy & foreclosure insights surfaced for management' },
    ],
    challenge: [
      'Unstructured mortgage data scattered across disparate on-premise systems — inefficient and inaccurate.',
      'High cost and complexity of scaling on-premise storage and compute.',
      'No formal technical or data strategy — everything was ad-hoc.',
      'Complex SQL jobs lacked documentation, were brittle, and hard to maintain.',
    ],
    solution: [
      'Created a unified data view and built interactive visualisations for accurate decision-making.',
      'Migrated all data from on-premise SQL Server to Snowflake cloud data warehouse.',
      'Replaced cumbersome SQL with structured SSIS transformation pipelines.',
      'Automated complex report generation on business-defined cadences.',
    ],
    execution: [
      'Defined and implemented a comprehensive data strategy and cloud platform roadmap.',
      'Executed On-Prem to Snowflake migration with zero data loss and validation checkpoints.',
      'Built advanced analytics dashboards with KPI tracking, capacity planning, and drill-down insights.',
    ],
    outcomes: [
      '94% increase in report generation efficiency',
      '30% cost savings after migrating to Snowflake',
      '5% sales uplift enabled by area-level sales reporting',
      'Bankruptcy and foreclosure insights surfaced — enabling faster management intervention',
    ],
  },
]

/* ─── Tag colours (brand spectrum) ─────────────────────────────────────── */

const tagColors: Record<string, string> = {
  'RPA AUTOMATION':  'from-[#4472cc] to-[#6c5ce7]',
  'AI & AUTOMATION': 'from-[#6c5ce7] to-[#8e44ad]',
  'APP DEVELOPMENT': 'from-[#7c3aed] to-[#6940d8]',
  'DATA & ANALYTICS':'from-[#8e44ad] to-[#b04dcc]',
}

/* ─── Hero carousel ─────────────────────────────────────────────────────── */

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -56 : 56, opacity: 0 }),
}

function HeroCarousel({
  onSelect,
}: {
  onSelect: (id: string) => void
}) {
  const [idx, setIdx]       = useState(0)
  const [dir, setDir]       = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % studies.length)
    }, 4200)
    return () => clearInterval(t)
  }, [paused])

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }

  const s = studies[idx]

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.button
            key={s.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => { onSelect(s.id); window.scrollTo(0, 0) }}
            className="group w-full text-left rounded-3xl overflow-hidden border border-border hover:border-primary/40 transition-colors bg-card cursor-pointer block"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={s.image} alt={s.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[rgba(8,6,20,0.92)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${tagColors[s.tag]} text-white text-[10px] font-bold tracking-widest rounded-full shadow-lg`}>
                  {s.icon}{s.tag}
                </span>
              </div>
              {/* Counter chip */}
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white/80 font-medium tabular-nums">
                {idx + 1}&thinsp;/&thinsp;{studies.length}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 pb-6">
              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors pr-4">
                {s.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.kpis.slice(0, 2).map(k => (
                  <div key={k.label} className="flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-2.5 py-1.5">
                    <span className="text-base font-extrabold text-gradient tabular-nums leading-none">{k.value}</span>
                    <span className="text-[10px] text-muted-foreground font-medium leading-tight max-w-[120px]">{k.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                <span>Read Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-4 px-1">
        {/* Prev / Next */}
        <div className="flex gap-2">
          <button
            onClick={() => go((idx - 1 + studies.length) % studies.length)}
            className="w-8 h-8 rounded-full border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => go((idx + 1) % studies.length)}
            className="w-8 h-8 rounded-full border border-border hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {studies.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === idx
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-border hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function CaseStudiesPage({ openCaseId, navKey }: { openCaseId?: string; navKey?: number }) {
  const [selected, setSelected] = useState<string | null>(null)

  // Open a specific case study when navigated from navbar dropdown.
  // navKey ensures re-fire even if the same case is clicked twice.
  useEffect(() => {
    if (openCaseId) setSelected(openCaseId)
  }, [navKey, openCaseId])

  // Scroll to top whenever a study is opened or closed
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selected])

  const study      = selected ? studies.find(s => s.id === selected)! : null
  const currentIdx = selected ? studies.findIndex(s => s.id === selected) : -1

  return (
    <div className="pt-[86px] bg-background overflow-hidden">
      <AnimatePresence mode="wait">

        {/* ══════════════════════════════════════════════════════════
            LIST VIEW — hero + case study cards
        ══════════════════════════════════════════════════════════ */}
        {!study && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="relative min-h-[600px] flex items-center py-24 overflow-hidden bg-card/40">
              <div className="absolute inset-0 bg-grid-dark opacity-25" />
              <GradientOrb size={600} color="purple" className="top-0 right-0 opacity-40" />
              <GradientOrb size={400} color="blue"   className="bottom-0 left-0 opacity-25" />

              <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                  {/* Left — text */}
                  <AnimatedSection>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">Success Stories</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground mb-6 leading-[1.06] tracking-[-0.025em]">
                      Proof That <br /><span className="text-gradient">Transformation</span><br /> Is Possible
                    </h1>

                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-[480px]">
                      From RPA bots to AI-powered workflows, cloud migrations to mobile-first platforms — real outcomes we've delivered for our clients.
                    </p>

                    <button
                      onClick={() => document.getElementById('cs-grid')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-[#8e44ad] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-glow-sm"
                    >
                      View All Case Studies <ArrowRight className="w-4 h-4" />
                    </button>
                  </AnimatedSection>

                  {/* Right — carousel */}
                  <motion.div
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <HeroCarousel onSelect={setSelected} />
                  </motion.div>

                </div>
              </div>
            </section>

            {/* ── Case study cards ──────────────────────────────── */}
            <section id="cs-grid" className="py-20 bg-background">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">

                <AnimatedSection className="mb-12">
                  <p className="text-sm font-semibold tracking-[0.22em] text-primary uppercase mb-3">Our Work</p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-[-0.02em]">
                    Select a Case Study
                  </h2>
                </AnimatedSection>

                <StaggerContainer className="grid md:grid-cols-2 gap-6" stagger={0.1}>
                  {studies.map(s => (
                    <motion.div key={s.id} variants={staggerItem}>
                      <motion.button
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => { setSelected(s.id); window.scrollTo(0, 0) }}
                        className="group relative w-full text-left rounded-3xl overflow-hidden cursor-pointer border border-border hover:border-primary/40 transition-colors bg-card"
                      >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={s.image} alt={s.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(8,6,20,0.95)]" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {/* Category tag */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${tagColors[s.tag]} text-white text-[10px] font-bold tracking-widest rounded-full shadow-lg`}>
                              {s.icon}{s.tag}
                            </span>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors duration-200 pr-6">
                            {s.title}
                          </h3>

                          {/* Top 2 KPIs */}
                          <div className="flex flex-wrap gap-3 mb-4">
                            {s.kpis.slice(0, 2).map(k => (
                              <div key={k.label} className="flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
                                <span className="text-lg font-extrabold text-gradient tabular-nums leading-none">{k.value}</span>
                                <span className="text-[10px] text-muted-foreground font-medium leading-tight max-w-[130px]">{k.label}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech badges */}
                          {s.technologies && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {s.technologies.map(t => (
                                <span key={t} className="px-2.5 py-0.5 bg-card border border-border rounded-full text-[10px] text-muted-foreground font-medium">{t}</span>
                              ))}
                            </div>
                          )}

                          {/* CTA row */}
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200 pt-1">
                            <span>Read Case Study</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Bottom sheen */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.button>
                    </motion.div>
                  ))}
                </StaggerContainer>

              </div>
            </section>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════
            DETAIL VIEW — full case study article
        ══════════════════════════════════════════════════════════ */}
        {study && (
          <motion.div
            key={selected!}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.38 }}
          >
            {/* ── Hero image banner ─────────────────────────────── */}
            <div className="relative h-72 md:h-[420px] overflow-hidden">
              <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />

              {/* Back + prev/next — top-left overlay, blends into the image */}
              <div className="absolute top-6 left-0 right-0">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-sm text-white/80 hover:text-white text-sm font-semibold transition-colors cursor-pointer border border-white/10 hover:border-white/25"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    All Case Studies
                  </button>

                  {/* Prev / Next */}
                  <div className="flex items-center gap-2">
                    {currentIdx > 0 && (
                      <button
                        onClick={() => { setSelected(studies[currentIdx - 1].id); window.scrollTo(0, 0) }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/30 backdrop-blur-sm text-white/70 hover:text-white text-xs font-semibold border border-white/10 hover:border-white/25 transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Prev
                      </button>
                    )}
                    <span className="text-xs text-white/50 px-1 tabular-nums">{currentIdx + 1}&thinsp;/&thinsp;{studies.length}</span>
                    {currentIdx < studies.length - 1 && (
                      <button
                        onClick={() => { setSelected(studies[currentIdx + 1].id); window.scrollTo(0, 0) }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/30 backdrop-blur-sm text-white/70 hover:text-white text-xs font-semibold border border-white/10 hover:border-white/25 transition-all cursor-pointer"
                      >
                        Next <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Title + tag — bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${tagColors[study.tag]} text-white text-[10px] font-bold tracking-widest rounded-full mb-4 shadow-lg`}>
                    {study.icon}{study.tag}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-[-0.025em] max-w-4xl">
                    {study.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* ── Content body ──────────────────────────────────── */}
            <section className="py-14 bg-background">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">

                {/* KPI metrics strip */}
                <div className={`grid gap-4 mb-12 ${
                  study.kpis.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4'
                  : study.kpis.length === 3 ? 'sm:grid-cols-3'
                  : 'sm:grid-cols-2'
                }`}>
                  {study.kpis.map((k, i) => (
                    <motion.div
                      key={k.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/[0.05] to-[#8e44ad]/[0.04]" />
                      <div className="relative">
                        <div className="text-4xl font-extrabold text-gradient mb-2 tabular-nums leading-none">{k.value}</div>
                        <div className="text-sm text-muted-foreground font-medium leading-snug">{k.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Challenge + Solution */}
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <GlassCard className="p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">The Challenge</h3>
                    </div>
                    <ul className="space-y-4">
                      {study.challenge.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                          <span className="w-5 h-5 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400 text-[10px] font-bold">{i + 1}</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>

                  <GlassCard className="p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-green-500/15 rounded-xl flex items-center justify-center text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">The Solution</h3>
                    </div>
                    <ul className="space-y-4">
                      {study.solution.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                          <span className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-green-400 text-[10px] font-bold">{i + 1}</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

                {/* Execution + Outcomes */}
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <GlassCard className="p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4472cc] to-[#6c5ce7] rounded-xl flex items-center justify-center text-white">
                        <Workflow className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Execution Strategy</h3>
                    </div>
                    <ul className="space-y-4">
                      {study.execution.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-gradient-to-br from-[#6495ed] to-[#6c5ce7] rounded-full mt-2 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>

                  <GlassCard className="p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6c5ce7] to-[#8e44ad] rounded-xl flex items-center justify-center text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Outcomes</h3>
                    </div>
                    <ul className="space-y-3">
                      {study.outcomes.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

                {/* Tech stack + Testimonial (conditional) */}
                {(study.technologies || study.testimonial) && (
                  <div className={`grid gap-5 mb-5 ${study.technologies && study.testimonial ? 'md:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
                    {study.technologies && (
                      <GlassCard className="p-7">
                        <h3 className="text-lg font-bold text-foreground mb-4">Technology Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map(t => (
                            <span key={t} className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    )}
                    {study.testimonial && (
                      <GlassCard className="p-7">
                        <h3 className="text-lg font-bold text-foreground mb-4">Client Testimonial</h3>
                        <p className="text-muted-foreground italic leading-relaxed mb-5 text-sm">
                          "{study.testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {study.testimonial.author}
                          </div>
                          <span className="text-sm font-semibold text-primary">{study.testimonial.role}</span>
                        </div>
                      </GlassCard>
                    )}
                  </div>
                )}

                {/* Next case study CTA */}
                <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to all case studies
                  </button>

                  {currentIdx < studies.length - 1 && (
                    <div className="flex items-center gap-5">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-0.5">Next</p>
                        <p className={`inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r ${tagColors[studies[currentIdx + 1].tag]} text-white text-[10px] font-bold tracking-widest rounded-full`}>
                          {studies[currentIdx + 1].icon}
                          {studies[currentIdx + 1].tag}
                        </p>
                      </div>
                      <button
                        onClick={() => { setSelected(studies[currentIdx + 1].id); window.scrollTo(0, 0) }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-[#8e44ad] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-glow-sm"
                      >
                        Read Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </section>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
