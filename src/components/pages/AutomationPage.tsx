import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Bot, Cpu, Code2, Database, BarChart3, Brain, ArrowRight, Rocket, Flag, Sparkles, TrendingDown, TrendingUp, AlertCircle, DollarSign, Users, Workflow, ScanLine, Network, ShieldCheck, Plug, Building, ChevronRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerItem } from '../ui/AnimatedSection'
import { GlassCard } from '../ui/GlassCard'
import { GradientOrb } from '../ui/GradientOrb'

const BOTTLENECKS = [
  { icon: FileText,  title: 'Intelligent Document Processing',   desc: 'AI-powered extraction and validation across documents (deeds, mortgages, releases) with greater speed and accuracy.',       impact: '99%+ accuracy with 70% faster processing',                    color: 'from-[#6495ed] via-[#6c5ce7] to-[#8e44ad]' },
  { icon: Bot,       title: 'Agentic AI for Order Management',   desc: 'Fully automated order management workflow achieving 100% adherence to client SLAs and reducing order management time.',    impact: '25% reduction in order management time, 100% SLA adherence', color: 'from-[#6c5ce7] to-[#8e44ad]' },
  { icon: Cpu,       title: 'RPA for Report Generation',         desc: 'BluePrism-based bot retrieving loan details and generating reports, resulting in 90% improvement in cycle time.',           impact: '90% improvement in cycle time, zero defects',                  color: 'from-[#8e44ad] to-[#4b0082]' },
  { icon: Code2,     title: 'Custom Application Development',    desc: 'Custom, user-centric software that streamlines interaction and scaling — ADA/WCAG compliant by default.',                  impact: 'Modernized, scalable enterprise applications',                 color: 'from-[#6495ed] to-[#6c5ce7]' },
  { icon: Database,  title: 'Data Strategy & Cloud Migration',   desc: 'Migrated on-premise data to a unified scalable cloud platform achieving significant cost savings and improved reporting.', impact: '40% reduced infrastructure cost, zero downtime',               color: 'from-[#6c5ce7] to-[#4b0082]' },
  { icon: BarChart3, title: 'Business Intelligence',             desc: 'Unified data view and visualizations enabling business insights for quick management action.',                              impact: 'Real-time analytics and actionable insights',                  color: 'from-[#6495ed] to-[#8e44ad]' },
]

const PHASES = [
  { icon: Flag,     title: '2 to 4 Weeks POC',         desc: 'Focus on one high-impact flow to demonstrate feasibility, establish clear success criteria, and determine a Go/No-Go decision.' },
  { icon: Sparkles, title: '4 to 8 Weeks MVP',          desc: 'Launch a working solution with real users and your data to achieve measurable results (quicker document prep, reduced support load).' },
  { icon: Rocket,   title: 'Expand: Bi-weekly Releases', desc: 'Continuous expansion of features and integration with your systems, ensuring value delivery every two weeks.' },
]

const OPERATING_MODEL = [
  { title: 'Intake Automation',                    color: 'from-red-500 to-red-600' },
  { title: 'AI Assisted Title Search',             color: 'from-green-500 to-green-600' },
  { title: 'Automation for Title Examination',     color: 'from-[#6495ed] to-[#6c5ce7]' },
  { title: 'Curative Automation',                  color: 'from-[#6c5ce7] to-[#8e44ad]' },
  { title: 'Settlement & Closing Support Automation', color: 'from-orange-500 to-orange-600' },
  { title: 'Digital Delivery',                     color: 'from-rose-500 to-rose-600' },
]

const OVERLAYS = [
  { icon: Workflow,    label: 'RPA' },
  { icon: ScanLine,   label: 'Intelligent OCR, NLP' },
  { icon: Brain,      label: 'AI/ML Decision Engine' },
  { icon: Network,    label: 'Workflow Orchestration' },
  { icon: Plug,       label: 'API Integrations' },
  { icon: ShieldCheck,label: 'Audit & Compliance' },
]

const METRICS = [
  { icon: TrendingDown, label: '50-70% reduction in manual effort',                up: false },
  { icon: TrendingUp,   label: '30-50% faster turnaround',                          up: true  },
  { icon: AlertCircle,  label: 'Errors < 2%',                                       up: false },
  { icon: DollarSign,   label: '20-40% operating cost reduction',                   up: false },
  { icon: Users,        label: 'Higher lender retention due to SLA consistency',    up: true  },
]

export function AutomationPage({ onContact }: { onContact: () => void }) {
  const [activeTab, setActiveTab] = useState<'ai' | 'strategy'>('ai')

  return (
    <div className="pt-20 bg-background overflow-hidden">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-25" />
        <GradientOrb size={500} color="purple" className="top-0 left-0 opacity-40" />
        <GradientOrb size={400} color="blue"   className="bottom-0 right-0 opacity-35" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Process Focus</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-[-0.02em]">
                AI &{' '}
                <span className="text-gradient">Automation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We apply specific AI solutions to mission-critical mortgage and title processes, transforming time-consuming tasks into compliant, automated workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'ai'       as const, Icon: Brain,    label: 'Artificial Intelligence' },
                  { id: 'strategy' as const, Icon: Building, label: 'Mortgage Title Automation Strategy' },
                ].map(({ id, Icon, label }) => (
                  <motion.button
                    key={id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(id)}
                    className={`cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                      activeTab === id
                        ? 'bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white shadow-glow-sm'
                        : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>

            {/* Diamond diagram */}
            <AnimatedSection direction="right">
              <div className="relative flex items-center justify-center min-h-[340px]">
                <GradientOrb size={300} color="purple" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative w-full max-w-sm">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {['Business Objectives', 'Task Automation'].map((label, i) => (
                      <motion.div key={label}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className={`w-20 h-20 bg-gradient-to-br ${i === 0 ? 'from-[#6495ed] via-[#6c5ce7] to-[#8e44ad]' : 'from-[#6c5ce7] to-[#8e44ad]'} transform rotate-45 rounded-xl shadow-glow`} />
                        <span className="text-sm font-bold text-foreground text-center">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#6495ed] to-[#8e44ad] transform rotate-45 rounded-xl shadow-glow" />
                    <span className="text-sm font-bold text-foreground">Process Automation</span>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Content */}
      {activeTab === 'ai' ? <AIContent onContact={onContact} /> : <StrategyContent onContact={onContact} />}
    </div>
  )
}

function AIContent({ onContact }: { onContact: () => void }) {
  return (
    <>
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Real-world Impact</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-[-0.02em]">
              Eliminating Manual <span className="text-gradient">Bottlenecks</span>
            </h2>
            <p className="text-lg text-muted-foreground">Real-world AI implementations delivering measurable business impact</p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
            {BOTTLENECKS.map(({ icon: Icon, title, desc, impact, color }) => (
              <motion.div key={title} variants={staggerItem}>
                <GlassCard className="p-6 h-full" glow>
                  <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-glow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-bold text-primary tracking-widest uppercase mb-1">MEASURABLE IMPACT</div>
                    <div className="text-sm text-foreground/80 font-medium">{impact}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 relative bg-card/40 overflow-hidden">
        <GradientOrb size={500} color="blue" className="top-0 right-0 opacity-35" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Delivery Model</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-[-0.02em]">
              Outcomes & Plan{' '}
              <span className="text-gradient">(POC → MVP)</span>
            </h2>
            <p className="text-lg text-muted-foreground">Prove it, then scale</p>
          </AnimatedSection>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <StaggerContainer className="grid md:grid-cols-3 gap-8" stagger={0.12}>
              {PHASES.map(({ icon: Icon, title, desc }, idx) => (
                <motion.div key={idx} variants={staggerItem} className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 blur-xl" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary/10 to-[#8e44ad]/10 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#6495ed] to-[#8e44ad] flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">{idx + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 tracking-[-0.01em]">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">{desc}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.3}>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={onContact}
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl font-bold shadow-glow hover:shadow-glow-lg transition-shadow"
            >
              Start Your POC <ArrowRight className="w-4 h-4" />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

function StrategyContent({ onContact }: { onContact: () => void }) {
  return (
    <>
      {/* Target Operating Model */}
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Architecture</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-[-0.02em]">
              Target Operating <span className="text-gradient">Model</span>
            </h2>
            <p className="text-lg text-muted-foreground">End-to-end automation architecture driving efficiency and compliance</p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {OPERATING_MODEL.map((item, i) => (
              <div key={item.title} className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`bg-gradient-to-br ${item.color} text-white rounded-xl px-4 py-4 w-36 h-24 flex items-center justify-center text-center shadow-glow-sm cursor-default`}
                >
                  <span className="text-sm font-bold leading-tight">{item.title}</span>
                </motion.div>
                {i < OPERATING_MODEL.length - 1 && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
              </div>
            ))}
          </AnimatedSection>

          <AnimatedSection className="text-center mb-5">
            <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">AUTOMATION & AI OVERLAY</span>
          </AnimatedSection>

          <AnimatedSection>
            <GlassCard glow className="p-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {OVERLAYS.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-foreground shadow-sm hover:border-primary/30 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-16 relative bg-card/40 overflow-hidden">
        <GradientOrb size={400} color="cyan" className="top-0 right-0 opacity-25" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="mb-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-3">Expected Returns</p>
            <h2 className="text-3xl font-extrabold text-foreground leading-tight tracking-[-0.02em]">
              ROI <span className="text-gradient">Metrics</span>
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-4" stagger={0.08}>
            {METRICS.map(({ icon: Icon, label, up }) => (
              <motion.div key={label} variants={staggerItem}>
                <GlassCard className="p-5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${up ? 'bg-green-500/15 text-green-500' : 'bg-primary/15 text-primary'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-foreground text-sm">{label}</span>
                </GlassCard>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Methodology</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-[-0.02em]">
              Swajay's <span className="text-gradient">Approach</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Accelerators + Squads: Building faster and smarter through specialized teams, proven methodologies, and outcome-driven collaboration
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-10" stagger={0.12}>
            {[
              { title: 'Outcome-First',      desc: 'Define success upfront for one high-impact use case, prioritizing features that directly move the business needle.', badge: 'GUARANTEED ROI',   sub: 'Focus on measurable results like reduced cost, faster processing time, or zero defects.' },
              { title: 'Lean Co-Build Squad', desc: 'Dedicated specialists with deep mortgage business and technology expertise work in sync with your team.',            badge: 'SPEED & AGILITY', sub: 'Modular, pod-based teams that ramp quickly, integrate seamlessly, and evolve with your needs.' },
            ].map(card => (
              <motion.div key={card.title} variants={staggerItem}>
                <GlassCard className="p-8 h-full" glow>
                  <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{card.desc}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-bold text-primary tracking-widest uppercase mb-1">{card.badge}</div>
                    <div className="text-sm text-foreground/80">{card.sub}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={onContact}
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl font-bold shadow-glow">
              Discuss Your Strategy <ArrowRight className="w-4 h-4" />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
