import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './components/pages/HomePage'
import { AboutPage } from './components/pages/AboutPage'
import { ServicesPage } from './components/pages/ServicesPage'
import { AutomationPage } from './components/pages/AutomationPage'
import { CaseStudiesPage } from './components/pages/CaseStudiesPage'
import { ContactPage } from './components/pages/ContactPage'

type Page = 'home' | 'about' | 'services' | 'automation' | 'case-studies' | 'contact'

export default function App() {
  useSmoothScroll()
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const handleNav = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
          {page === 'services'     && <ServicesPage onContact={() => handleNav('contact')} />}
          {page === 'automation'   && <AutomationPage onContact={() => handleNav('contact')} />}
          {page === 'case-studies' && <CaseStudiesPage />}
          {page === 'contact'      && <ContactPage />}
        </motion.main>
      </AnimatePresence>
      <Footer onNav={handleNav} />
    </div>
  )
}
