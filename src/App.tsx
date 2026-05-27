import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSmoothScroll, scrollToTop } from './hooks/useSmoothScroll'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './components/pages/HomePage'
import { AboutPage } from './components/pages/AboutPage'
import { ServicesPage } from './components/pages/ServicesPage'
import { AutomationPage } from './components/pages/AutomationPage'
import { CaseStudiesPage } from './components/pages/CaseStudiesPage'
import { ContactPage } from './components/pages/ContactPage'
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage'
import { TermsOfServicePage } from './components/pages/TermsOfServicePage'

type Page = 'home' | 'about' | 'services' | 'automation' | 'case-studies' | 'contact' | 'privacy' | 'terms'

export type NavExtra = {
  section?: string
  servicesTab?: 'mortgage' | 'technology'
  automationTab?: 'ai' | 'strategy'
  caseStudyId?: string
}

export default function App() {
  useSmoothScroll()
  const [page, setPage]         = useState<Page>('home')
  const [navExtra, setNavExtra] = useState<NavExtra | null>(null)
  // Increments on every targeted nav so useEffect deps always differ, even
  // when tab/section values are the same (e.g. clicking two mortgage items).
  const [navKey, setNavKey]     = useState(0)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const handleNav = (p: Page, extra?: NavExtra) => {
    setPage(p)
    scrollToTop() // bypasses Lenis' internal state correctly
    if (extra) {
      setNavExtra(extra)
      setNavKey(k => k + 1)
    } else {
      setNavExtra(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar currentPage={page} onNav={handleNav} />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'home'         && <HomePage onNav={handleNav} />}
          {page === 'about'        && <AboutPage />}
          {page === 'services'     && (
            <ServicesPage
              onContact={() => handleNav('contact')}
              initialTab={navExtra?.servicesTab}
              scrollToSection={navExtra?.section}
              navKey={navKey}
            />
          )}
          {page === 'automation'   && (
            <AutomationPage
              onContact={() => handleNav('contact')}
              initialTab={navExtra?.automationTab}
              scrollToSection={navExtra?.section}
              navKey={navKey}
            />
          )}
          {page === 'case-studies' && (
            <CaseStudiesPage openCaseId={navExtra?.caseStudyId} navKey={navKey} />
          )}
          {page === 'contact'      && <ContactPage />}
          {page === 'privacy'      && <PrivacyPolicyPage />}
          {page === 'terms'        && <TermsOfServicePage />}
        </motion.main>
      </AnimatePresence>
      <Footer onNav={handleNav} />
    </div>
  )
}
