import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

type Page = 'home' | 'about' | 'services' | 'automation' | 'case-studies' | 'contact'

interface Props {
  currentPage: Page
  onNav: (page: Page) => void
}

const SERVICES_DROP = {
  mortgage: ['Document Processing', 'Title Search', 'Compliance & Quality', 'LOS (Loan Origination System)', 'Process Automation', 'Curative Services'],
  tech: ['Engineering Services', 'AI & Advanced Automation', 'Data & Business Intelligence', 'Secure Cloud & Integration'],
}

const AUTO_DROP = {
  ai: ['Intelligent Document Processing', 'Agentic AI for Order Management', 'RPA for Report Generation'],
  strategy: ['Target Operating Model'],
}

const CASE_DROP = ['Automating Report Generation', 'AI Solution for Order Management', 'Web & Mobile App for Mortgage Lender', 'Data Strategy & Platform']

export function Navbar({ currentPage, onNav }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (p: Page) => { onNav(p); setMobileOpen(false) }

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
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <button onClick={() => go('home')} className="flex items-center gap-3 cursor-pointer group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-[#8e44ad]/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-primary/[0.12] to-[#8e44ad]/[0.12] rounded-xl px-2.5 py-1.5 border border-primary/25 shadow-[0_0_18px_rgba(108,92,231,0.22)]">
                <img src="/swajay-logo.png" alt="Swajay Solutions" className="h-9 w-auto object-contain drop-shadow-[0_0_6px_rgba(108,92,231,0.45)]" />
              </div>
            </div>
            <span className="hidden sm:block font-display text-lg font-bold tracking-tight text-foreground group-hover:text-gradient transition-all duration-300">
              Swajay Solutions
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <NavBtn label="Home"    active={currentPage === 'home'}    onClick={() => go('home')} />
            <NavBtn label="About"   active={currentPage === 'about'}   onClick={() => go('about')} />

            <DropNav label="Services" active={currentPage === 'services'} onClick={() => go('services')}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 p-6 min-w-[560px]">
                <DropCol title="Mortgage Capabilities"  items={SERVICES_DROP.mortgage} onClick={() => go('services')} />
                <DropCol title="Technology Excellence"  items={SERVICES_DROP.tech}     onClick={() => go('services')} />
              </div>
            </DropNav>

            <DropNav label="AI & Automation" active={currentPage === 'automation'} onClick={() => go('automation')}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 p-6 min-w-[500px]">
                <DropCol title="Artificial Intelligence" items={AUTO_DROP.ai}       onClick={() => go('automation')} />
                <DropCol title="Strategy"                items={AUTO_DROP.strategy} onClick={() => go('automation')} />
              </div>
            </DropNav>

            <DropNav label="Case Studies" active={currentPage === 'case-studies'} onClick={() => go('case-studies')}>
              <div className="p-6 min-w-[280px]">
                <DropCol title="Success Stories" items={CASE_DROP} onClick={() => go('case-studies')} />
              </div>
            </DropNav>

            <NavBtn label="Contact" active={currentPage === 'contact'} onClick={() => go('contact')} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => go('contact')}
              className="hidden md:flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] hover:shadow-glow transition-shadow"
            >
              Get Started
            </motion.button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center bg-card border border-border"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-background/97 backdrop-blur-2xl border-t border-border"
          >
            <div className="px-6 py-4 space-y-1">
              {(['home', 'about', 'services', 'automation', 'case-studies', 'contact'] as Page[]).map(p => (
                <button key={p} onClick={() => go(p)}
                  className={`cursor-pointer block w-full text-left px-4 py-3 rounded-xl font-display text-sm font-medium transition-colors ${
                    currentPage === p
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-card hover:text-foreground'
                  }`}>
                  {p === 'case-studies' ? 'Case Studies' : p === 'automation' ? 'AI & Automation' : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
              <button onClick={() => go('contact')}
                className="cursor-pointer w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white font-display font-semibold text-sm">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`cursor-pointer relative px-4 py-2 rounded-xl font-display text-sm font-medium transition-colors ${
        active
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-card'
      }`}>
      {label}
      {active && <motion.span layoutId="nav-dot" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
    </button>
  )
}

function DropNav({ label, active, onClick, children }: { label: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button onClick={onClick}
        className={`cursor-pointer flex items-center gap-1 px-4 py-2 rounded-xl font-display text-sm font-medium transition-colors ${
          active
            ? 'text-primary bg-primary/10'
            : 'text-muted-foreground hover:text-foreground hover:bg-card'
        }`}>
        {label} <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
        <div className="bg-card/98 backdrop-blur-2xl rounded-2xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

function DropCol({ title, items, onClick }: { title: string; items: string[]; onClick: () => void }) {
  return (
    <div>
      <p className="text-[10px] font-display font-bold tracking-[0.15em] text-primary/80 uppercase mb-3 pb-2 border-b border-border">{title}</p>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li key={item}>
            <button onClick={onClick} className="cursor-pointer block w-full text-left text-sm font-display text-muted-foreground hover:text-foreground py-1 transition-colors font-medium">
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
