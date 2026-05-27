import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

type Page = 'home' | 'about' | 'services' | 'automation' | 'case-studies' | 'contact' | 'privacy' | 'terms'

type NavExtra = {
  section?: string
  servicesTab?: 'mortgage' | 'technology'
  automationTab?: 'ai' | 'strategy'
  caseStudyId?: string
}

interface Props {
  currentPage: Page
  onNav: (page: Page, extra?: NavExtra) => void
}

export function Navbar({ currentPage, onNav }: Props) {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Collapse mobile menu when page changes
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [currentPage])

  const go     = (p: Page)                => { onNav(p);        setMobileOpen(false) }
  const goFull = (p: Page, e: NavExtra)   => { onNav(p, e);     setMobileOpen(false) }
  const toggle = (s: string)              => setMobileExpanded(prev => prev === s ? null : s)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/90 backdrop-blur-2xl border-b border-border' : '',
      ].join(' ')}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-[86px]">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <button onClick={() => go('home')} className="flex items-center gap-3 cursor-pointer group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-[#8e44ad]/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-primary/[0.12] to-[#8e44ad]/[0.12] rounded-xl px-2.5 py-1.5 border border-primary/25 shadow-[0_0_18px_rgba(108,92,231,0.22)]">
                <img src="/swajay-logo.png" alt="Swajay Solutions" className="h-9 w-auto object-contain drop-shadow-[0_0_6px_rgba(108,92,231,0.45)]" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="font-display text-lg font-bold tracking-tight text-foreground group-hover:text-gradient transition-all duration-300">
                Swajay Solutions
              </span>
              <span className="text-[10px] font-semibold tracking-wide text-gradient">
                Collaboration&nbsp;|&nbsp;Innovation&nbsp;|&nbsp;Smart Solutions
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            <NavBtn label="Home"  active={currentPage === 'home'}  onClick={() => go('home')} />
            <NavBtn label="About" active={currentPage === 'about'} onClick={() => go('about')} />

            {/* Services dropdown */}
            <DropNav label="Services" active={currentPage === 'services'} onClick={() => go('services')}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 px-6 pt-6 pb-8 min-w-[560px]">
                <DropCol title="Mortgage Capabilities" items={[
                  { label: 'Document Processing',           onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Title Search',                  onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Compliance & Quality',          onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'LOS (Loan Origination System)', onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Process Automation',            onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Curative Services',             onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                ]} />
                <DropCol title="Technology Excellence" items={[
                  { label: 'Engineering Services',          onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                  { label: 'AI & Advanced Automation',      onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                  { label: 'Data & Business Intelligence',  onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                  { label: 'Secure Cloud & Integration',    onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                ]} />
              </div>
            </DropNav>

            {/* AI & Automation dropdown */}
            <DropNav label="AI & Automation" active={currentPage === 'automation'} onClick={() => go('automation')}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 px-6 pt-6 pb-8 min-w-[500px]">
                <DropCol title="Artificial Intelligence" items={[
                  { label: 'Intelligent Document Processing', onClick: () => goFull('automation', { automationTab: 'ai',       section: 'automation-solutions' }) },
                  { label: 'Agentic AI for Order Management', onClick: () => goFull('automation', { automationTab: 'ai',       section: 'automation-solutions' }) },
                  { label: 'RPA for Report Generation',       onClick: () => goFull('automation', { automationTab: 'ai',       section: 'automation-solutions' }) },
                ]} />
                <DropCol title="Strategy" items={[
                  { label: 'Target Operating Model',          onClick: () => goFull('automation', { automationTab: 'strategy', section: 'automation-strategy'  }) },
                ]} />
              </div>
            </DropNav>

            {/* Case Studies dropdown */}
            <DropNav label="Case Studies" active={currentPage === 'case-studies'} onClick={() => go('case-studies')}>
              <div className="px-6 pt-6 pb-8 min-w-[340px]">
                <DropCol title="Success Stories" items={[
                  { label: 'Automating Report Generation',         onClick: () => goFull('case-studies', { caseStudyId: 'rpa'  }) },
                  { label: 'AI Solution for Order Management',     onClick: () => goFull('case-studies', { caseStudyId: 'ai'   }) },
                  { label: 'Web & Mobile App for Mortgage Lender', onClick: () => goFull('case-studies', { caseStudyId: 'app'  }) },
                  { label: 'Data Strategy & Platform',             onClick: () => goFull('case-studies', { caseStudyId: 'data' }) },
                ]} />
              </div>
            </DropNav>

            <NavBtn label="Contact" active={currentPage === 'contact'} onClick={() => go('contact')} />
          </div>

          {/* ── Actions ────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => go('contact')}
              className="hidden md:flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] hover:shadow-glow transition-shadow"
            >
              Get Started
            </motion.button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center bg-card border border-border"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden bg-background/97 backdrop-blur-2xl border-t border-border"
          >
            <div className="px-5 py-4 space-y-0.5 max-h-[calc(100dvh-80px)] overflow-y-auto">

              <MobileNavBtn label="Home"    active={currentPage === 'home'}    onClick={() => go('home')} />
              <MobileNavBtn label="About"   active={currentPage === 'about'}   onClick={() => go('about')} />

              {/* Services expandable */}
              <MobileExpandable
                label="Services"
                active={currentPage === 'services'}
                expanded={mobileExpanded === 'services'}
                onNav={() => go('services')}
                onToggle={() => toggle('services')}
              >
                <MobileSubSection title="Mortgage" items={[
                  { label: 'Document Processing',           onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Title Search',                  onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Compliance & Quality',          onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'LOS (Loan Origination)',        onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Process Automation',            onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                  { label: 'Curative Services',             onClick: () => goFull('services', { servicesTab: 'mortgage',   section: 'services-cards' }) },
                ]} />
                <MobileSubSection title="Technology" items={[
                  { label: 'Engineering Services',          onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                  { label: 'AI & Advanced Automation',      onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                  { label: 'Data & Intelligence',           onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                  { label: 'Secure Cloud & Integration',    onClick: () => goFull('services', { servicesTab: 'technology', section: 'services-cards' }) },
                ]} />
              </MobileExpandable>

              {/* AI & Automation expandable */}
              <MobileExpandable
                label="AI & Automation"
                active={currentPage === 'automation'}
                expanded={mobileExpanded === 'automation'}
                onNav={() => go('automation')}
                onToggle={() => toggle('automation')}
              >
                <MobileSubSection title="AI Solutions" items={[
                  { label: 'Intelligent Document Processing', onClick: () => goFull('automation', { automationTab: 'ai',       section: 'automation-solutions' }) },
                  { label: 'Agentic AI for Order Management', onClick: () => goFull('automation', { automationTab: 'ai',       section: 'automation-solutions' }) },
                  { label: 'RPA for Report Generation',       onClick: () => goFull('automation', { automationTab: 'ai',       section: 'automation-solutions' }) },
                ]} />
                <MobileSubSection title="Strategy" items={[
                  { label: 'Target Operating Model',          onClick: () => goFull('automation', { automationTab: 'strategy', section: 'automation-strategy' }) },
                ]} />
              </MobileExpandable>

              {/* Case Studies expandable */}
              <MobileExpandable
                label="Case Studies"
                active={currentPage === 'case-studies'}
                expanded={mobileExpanded === 'case-studies'}
                onNav={() => go('case-studies')}
                onToggle={() => toggle('case-studies')}
              >
                <MobileSubSection title="Success Stories" items={[
                  { label: 'Automating Report Generation',         onClick: () => goFull('case-studies', { caseStudyId: 'rpa'  }) },
                  { label: 'AI Solution for Order Management',     onClick: () => goFull('case-studies', { caseStudyId: 'ai'   }) },
                  { label: 'Web & Mobile App for Lender',          onClick: () => goFull('case-studies', { caseStudyId: 'app'  }) },
                  { label: 'Data Strategy & Platform',             onClick: () => goFull('case-studies', { caseStudyId: 'data' }) },
                ]} />
              </MobileExpandable>

              <MobileNavBtn label="Contact" active={currentPage === 'contact'} onClick={() => go('contact')} />

              <div className="pt-2">
                <button
                  onClick={() => go('contact')}
                  className="cursor-pointer w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white font-display font-semibold text-sm"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ── Desktop helpers ──────────────────────────────────────────────────────── */

function NavBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`cursor-pointer relative px-4 py-2 rounded-xl font-display text-sm font-medium transition-colors ${
        active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-card'
      }`}>
      {label}
      {active && <motion.span layoutId="nav-dot" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
    </button>
  )
}

function DropNav({ label, active, onClick, children }: {
  label: string; active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <div className="relative group">
      <button onClick={onClick}
        className={`cursor-pointer flex items-center gap-1 px-4 py-2 rounded-xl font-display text-sm font-medium transition-colors ${
          active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-card'
        }`}>
        {label} <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-[999]">
        <div className="bg-card rounded-2xl border border-border shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          {children}
        </div>
      </div>
    </div>
  )
}

function DropCol({ title, items }: { title: string; items: { label: string; onClick: () => void }[] }) {
  return (
    <div>
      <p className="text-[10px] font-display font-bold tracking-[0.15em] text-primary/80 uppercase mb-3 pb-2 border-b border-border">{title}</p>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li key={item.label}>
            <button
              onClick={item.onClick}
              className="cursor-pointer block w-full text-left text-sm font-display text-muted-foreground hover:text-foreground py-1 px-1 rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Mobile helpers ──────────────────────────────────────────────────────── */

function MobileNavBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`cursor-pointer block w-full text-left px-4 py-3 rounded-xl font-display text-sm font-medium transition-colors ${
        active ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-card hover:text-foreground'
      }`}>
      {label}
    </button>
  )
}

function MobileExpandable({ label, active, expanded, onNav, onToggle, children }: {
  label: string; active: boolean; expanded: boolean
  onNav: () => void; onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-stretch">
        <button onClick={onNav}
          className={`cursor-pointer flex-1 text-left px-4 py-3 rounded-l-xl font-display text-sm font-medium transition-colors ${
            active ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-card hover:text-foreground'
          }`}>
          {label}
        </button>
        <button onClick={onToggle}
          className={`cursor-pointer px-3 py-3 rounded-r-xl transition-colors border-l border-transparent ${
            active ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-card hover:text-foreground'
          }`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-3 border-l border-primary/20 mt-1 mb-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileSubSection({ title, items }: { title: string; items: { label: string; onClick: () => void }[] }) {
  return (
    <div className="py-1">
      <p className="text-[9px] font-bold tracking-[0.18em] text-primary/70 uppercase mb-1 px-1">{title}</p>
      {items.map(item => (
        <button key={item.label} onClick={item.onClick}
          className="cursor-pointer block w-full text-left px-2 py-1.5 text-xs font-display text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-primary/5">
          {item.label}
        </button>
      ))}
    </div>
  )
}
