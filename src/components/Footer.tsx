import { MapPin, Mail, Globe } from 'lucide-react'
import { AnimatedSection } from './ui/AnimatedSection'

type Page = 'home' | 'about' | 'services' | 'automation' | 'case-studies' | 'contact'

export function Footer({ onNav }: { onNav: (page: Page) => void }) {
  return (
    <footer className="relative overflow-hidden bg-card border-t border-border">
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <AnimatedSection>
          <div className="grid md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl p-1.5 ring-1 ring-primary/20">
                  <img src="/swajay-logo.png" alt="Swajay" className="h-9 w-auto object-contain" />
                </div>
                <div>
                  <p className="font-bold text-base text-foreground leading-none">Swajay</p>
                  <p className="text-primary text-xs font-semibold tracking-widest uppercase mt-0.5">Smart Solutions</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Transforming enterprises through innovative technology. Collaboration, Innovation, Smart Solutions.
              </p>
              <div className="flex gap-2">
                <a href="https://www.linkedin.com/company/swajay-solutions" target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-background hover:bg-primary/20 border border-border flex items-center justify-center transition-colors group">
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://swajay-solutions.onrender.com/" target="_blank" rel="noopener noreferrer"
                  aria-label="Website"
                  className="w-9 h-9 rounded-xl bg-background hover:bg-primary/20 border border-border flex items-center justify-center transition-colors group">
                  <Globe className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">Capabilities</h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                {(['services', 'automation', 'case-studies'] as Page[]).map((p) => (
                  <li key={p}>
                    <button onClick={() => onNav(p)} className="cursor-pointer hover:text-primary transition-colors">
                      {p === 'case-studies' ? 'Case Studies' : p === 'automation' ? 'AI & Automation' : 'Services'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* USA Locations */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">USA Locations</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>19 Holly Cove Ln, Dover, DE 19901, United States</span>
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>12863, Tradd St., Apt 2D, Carmel, IN 46032, United States</span>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <a href="mailto:support@swajaysolutions.com" className="text-primary hover:text-primary/80 transition-colors break-all">
                    support@swajaysolutions.com
                  </a>
                </li>
              </ul>
            </div>

            {/* India Locations */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">India Locations</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>No 21, Binnamangala, Indiranagar, Bengaluru, Karnataka 560038</span>
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Summit A, Brigade Metropolis, Garudachar Palya, Bengaluru 560048</span>
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>#1788/23, 5th Main, 9th Cross, Hampinagar, Vijayanagar 2nd Stage, Bengaluru 560104</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-muted-foreground text-sm">
            <p>&copy; 2026 Swajay Business Solutions, LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</button>
              <button className="cursor-pointer hover:text-primary transition-colors">Terms of Service</button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}
