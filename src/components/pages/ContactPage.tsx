import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Send } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GlassCard } from '../ui/GlassCard'
import { GradientOrb } from '../ui/GradientOrb'

export function ContactPage() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ fullName: '', email: '', phone: '', company: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const inputCls = 'w-full px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm'
  const labelCls = 'block text-sm font-semibold text-foreground/80 mb-1.5'

  return (
    <div className="pt-20 bg-background overflow-hidden">

      {/* Hero + Form */}
      <section className="py-20 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-25" />
        <GradientOrb size={500} color="purple" className="top-0 right-0 opacity-40" />
        <GradientOrb size={400} color="blue"   className="bottom-0 left-0 opacity-35" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <AnimatedSection direction="left" className="pt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Contact Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-[-0.02em]">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Ready to transform your business? Let's start the conversation and explore how we can help you achieve your goals.
              </p>

              {/* Quick info */}
              <div className="mt-10 space-y-4">
                {[
                  { icon: MapPin, label: 'USA Headquarters', text: '8 The Green STE R, Dover, DE 19901' },
                  { icon: MapPin, label: 'India Operations',  text: 'Brigade IRV, Nallurhalli, Whitefield, Bangalore 560066' },
                  { icon: Mail,   label: 'Email Us',          text: 'support@swajaysolutions.com', href: 'mailto:support@swajaysolutions.com' },
                ].map(({ icon: Icon, label, text, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{text}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <GlassCard glow className="p-8">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-2">Message Us</p>
                <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-[-0.01em]">Send us a Message</h2>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-semibold"
                  >
                    Thanks! Your message has been sent successfully.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                      <input type="text" required value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                      <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="name@example.com" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 (555) 000-0000" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Company Name</label>
                      <input type="text" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Your Company" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Message <span className="text-red-400">*</span></label>
                    <textarea required rows={5} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Tell us about your project or inquiry..." className={inputCls + ' resize-none'} />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl font-bold shadow-glow hover:shadow-glow-lg transition-shadow"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </motion.button>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-16 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <GlassCard glow className="p-8 h-full">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-2">Reach Us</p>
                <h2 className="text-2xl font-extrabold text-foreground mb-7 tracking-[-0.01em]">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { label: 'USA Headquarters', text: '8 The Green STE R, Dover, DE 19901' },
                    { label: 'India Operations',  text: 'Brigade IRV, Nallurhalli, Whitefield, Bangalore 560066' },
                    { label: 'India Operations',  text: '#1788/23, 5th Main, 9th Cross, Hampinagar, Vijayanagar 2nd Stage, Bengaluru – 560104' },
                  ].map(({ label, text }) => (
                    <div key={text} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary mb-0.5 text-sm">{label}</div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-0.5 text-sm">Email Us</div>
                      <a href="mailto:support@swajaysolutions.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        support@swajaysolutions.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-border">
                    <h3 className="text-base font-bold text-foreground mb-3">Connect With Us</h3>
                    <a href="https://www.linkedin.com/company/swajay-solutions" target="_blank" rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex w-10 h-10 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl items-center justify-center hover:shadow-glow-sm transition-shadow">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <GlassCard glow className="p-8 h-full">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-2">Where We Are</p>
                <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-[-0.01em]">Our Locations</h2>
                <div className="rounded-xl overflow-hidden h-[360px] ring-1 ring-border">
                  <iframe
                    title="Swajay Solutions Locations"
                    src="https://www.google.com/maps?q=8+The+Green+STE+R,+Dover,+DE+19901&output=embed"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
