import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Clock, Zap, Settings, Key, Code2, Bot, BarChart3, Cloud, Home, ChevronRight, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerItem } from '../ui/AnimatedSection'
import { GlassCard } from '../ui/GlassCard'
import { GradientOrb } from '../ui/GradientOrb'

type ServiceCard = { icon: React.ReactNode; title: string; description: string; benefits: string[] }

const mortgageCards: ServiceCard[] = [
  { icon: <FileText className="w-5 h-5" />, title: 'Document Processing', description: 'Intelligent document extraction, validation, and management using advanced AI and OCR technology for faster, more accurate processing.', benefits: ['AI-powered extraction', '99% accuracy', 'Faster turnaround'] },
  { icon: <Search className="w-5 h-5" />, title: 'Title Search', description: 'Comprehensive property title research and examination services, processing 5,000+ orders monthly with zero defects. Our AI-powered workflows ensure accuracy and speed.', benefits: ['5,000+ orders/month', 'Zero defects', 'AI-powered workflows'] },
  { icon: <Clock className="w-5 h-5" />, title: 'Compliance & Quality', description: 'Rigorous quality assurance and regulatory compliance monitoring to protect your business and maintain the highest standards.', benefits: ['Regulatory compliance', 'Quality assurance', 'Risk mitigation'] },
  { icon: <Zap className="w-5 h-5" />, title: 'LOS (Loan Origination System)', description: 'End-to-end loan origination support, from application through approval. We streamline processes and integrate seamlessly with existing systems.', benefits: ['Application to approval', 'System integration', 'Process streamlining'] },
  { icon: <Settings className="w-5 h-5" />, title: 'Process Automation', description: 'End-to-end workflow automation reducing manual effort by up to 70%, allowing your team to focus on high-value activities.', benefits: ['70% manual effort reduction', 'Improved efficiency', 'Cost savings'] },
  { icon: <Key className="w-5 h-5" />, title: 'Curative Services', description: 'Expert resolution of title defects and encumbrances, ensuring clean title transfer. Our specialists handle complex situations with precision.', benefits: ['Title defect resolution', 'Expert handling', 'Clean transfers'] },
]

const technologyCards: ServiceCard[] = [
  { icon: <Code2 className="w-5 h-5" />, title: 'Engineering Services', description: 'Custom, user-centric software that streamlines interaction and scaling.', benefits: ['Web & mobile application development', 'Technology consulting', 'Quality engineering'] },
  { icon: <Bot className="w-5 h-5" />, title: 'AI & Advanced Automation', description: 'Machine learning and generative AI to manage complexity and eliminate errors.', benefits: ['Agentic AI solutions', 'Workflow automation', 'RPA (Blue Prism, UiPath)'] },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Data & Business Intelligence', description: 'Unified, governable data platform for strategic decision-making.', benefits: ['Data modernization', 'ETL engineering', 'Analytics & visualization'] },
  { icon: <Cloud className="w-5 h-5" />, title: 'Secure Cloud & Integration', description: 'Compliant, flexible foundation connecting all systems seamlessly.', benefits: ['Cloud migration & optimization', 'Infrastructure engineering', 'Integration solutions'] },
]

function ServiceCardItem({ card }: { card: ServiceCard }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-6 h-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden cursor-default"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/50 to-transparent transition-all duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/[0.05] to-[#8e44ad]/[0.04]" />
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-[#6495ed]/20 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:from-primary/30 group-hover:to-[#8e44ad]/30 transition-all duration-300">
          {card.icon}
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{card.description}</p>
        <p className="text-[10px] font-semibold tracking-[0.15em] text-primary uppercase mb-3">Key Benefits</p>
        <ul className="space-y-1.5">
          {card.benefits.map(b => (
            <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#6495ed] to-[#8e44ad] flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function ServicesPage({ onContact, initialTab, scrollToSection, navKey }: {
  onContact: () => void
  initialTab?: 'mortgage' | 'technology'
  scrollToSection?: string
  navKey?: number
}) {
  const [activeTab, setActiveTab] = useState<'mortgage' | 'technology'>(initialTab ?? 'mortgage')

  // navKey increments on every nav click, ensuring re-fire even when
  // tab/section are unchanged (e.g. two different mortgage sub-items).
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab)
    if (!scrollToSection) return
    const id = setTimeout(() => {
      document.getElementById(scrollToSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 420)
    return () => clearTimeout(id)
  }, [navKey, initialTab, scrollToSection])

  return (
    <div className="pt-[86px] bg-background overflow-hidden">

      {/* ─── Hero ─── */}
      <section className="py-24 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-25" />
        <GradientOrb size={500} color="purple" className="top-0 right-0 opacity-40" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Our Services</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-[-0.02em]">Services</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                We move beyond traditional BPO by embedding advanced technology — from proprietary applications to sophisticated AI models — directly into your workflows.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <GlassCard glow className="p-6">
                <p className="text-[11px] font-bold text-muted-foreground tracking-[0.18em] uppercase mb-4">AI Process</p>
                <div className="flex items-center gap-2 flex-wrap mb-5">
                  {['Ingest Data', 'Flag Exceptions', 'Generate Report'].map((step, i, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${i === 0 ? 'bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white' : 'bg-background text-muted-foreground border border-border'}`}>
                        {step}
                      </div>
                      {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 mb-6">
                  <div className="h-1 flex-1 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] rounded-full" />
                  <div className="h-1 flex-1 bg-border rounded-full" />
                  <div className="h-1 flex-1 bg-border rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: <Search className="w-4 h-4 text-primary" />, title: 'AI-Powered Search', desc: 'Machine learning algorithms that understand context and continuously improve accuracy.' },
                    { icon: <Cloud className="w-4 h-4 text-[#6495ed]" />, title: 'Multi-Source Integration', desc: 'Seamless access to county security, court databases, and third party providers.' },
                    { icon: <Settings className="w-4 h-4 text-primary" />, title: 'Exception Management', desc: 'Automatic flagging of liens, judgements and title issues with automated routing.' },
                    { icon: <FileText className="w-4 h-4 text-[#6495ed]" />, title: 'Automated Reporting', desc: 'Generate comprehensive, compliant title reports with built-in quality assurance.' },
                  ].map(item => (
                    <div key={item.title} className="bg-background rounded-xl p-3 border border-border hover:border-primary/20 transition-colors">
                      <div className="mb-2">{item.icon}</div>
                      <p className="text-foreground text-xs font-semibold mb-1">{item.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <section id="services-cards" className="py-24 bg-background scroll-mt-[86px] border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="flex justify-center mb-14">
            <div className="inline-flex bg-card rounded-2xl p-1.5 gap-1 border border-border">
              {[
                { id: 'mortgage'   as const, label: 'Mortgage Capabilities', Icon: Home },
                { id: 'technology' as const, label: 'Technology Excellence', Icon: Code2 },
              ].map(({ id, label, Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  whileTap={{ scale: 0.97 }}
                  className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white shadow-glow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {activeTab === 'mortgage' && (
            <>
              <AnimatedSection className="mb-10">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-3">Mortgage Capabilities</p>
                <h2 className="text-4xl font-extrabold text-foreground mb-2 leading-tight tracking-[-0.02em]">Mortgage Functional Capabilities</h2>
                <p className="text-muted-foreground">
                  End-to-end mortgage processing with{' '}
                  <span className="text-gradient font-semibold">AI-powered efficiency</span>
                </p>
              </AnimatedSection>
              <StaggerContainer className="grid md:grid-cols-3 gap-5" stagger={0.08}>
                {mortgageCards.map(card => (
                  <motion.div key={card.title} variants={staggerItem}>
                    <ServiceCardItem card={card} />
                  </motion.div>
                ))}
              </StaggerContainer>
            </>
          )}

          {activeTab === 'technology' && (
            <>
              <AnimatedSection className="mb-10">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-3">Technology Excellence</p>
                <h2 className="text-4xl font-extrabold text-foreground mb-2 leading-tight tracking-[-0.02em]">Blueprint of Technology Excellence</h2>
                <p className="text-muted-foreground">
                  Swajay leverages its{' '}
                  <span className="text-gradient font-semibold">multi-industry expertise</span>{' '}
                  to deliver secure, scalable, and outcome-driven digital solutions
                </p>
              </AnimatedSection>
              <StaggerContainer className="grid md:grid-cols-2 gap-5" stagger={0.1}>
                {technologyCards.map(card => (
                  <motion.div key={card.title} variants={staggerItem}>
                    <ServiceCardItem card={card} />
                  </motion.div>
                ))}
              </StaggerContainer>
            </>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 relative overflow-hidden bg-card/60 border-t border-border">
        {/* Gradient accent line sitting on top of the border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-[#8e44ad]/10" />
        <div className="absolute inset-0 bg-[size:60px_60px] bg-grid-dark opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#6495ed]/6 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <AnimatedSection className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-[-0.02em]">
              Ready to Get <span className="text-gradient">Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Let's discuss how our services can transform your business operations and drive growth.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(108,92,231,0.45)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onContact}
                className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl font-bold shadow-glow">
                Request Demo <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onContact}
                className="cursor-pointer px-8 py-4 bg-card border border-border text-muted-foreground rounded-xl font-semibold hover:text-foreground hover:border-primary/40 transition-colors">
                Contact Sales
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
