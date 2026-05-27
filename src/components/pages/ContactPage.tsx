import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Send } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GlassCard } from '../ui/GlassCard'

// ← Paste your Web3Forms access key here once you have it
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

export function ContactPage() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', company: '', message: '' })
  const [sent, setSent]         = useState(false)
  const [error, setError]       = useState<string | false>(false)
  const [loading, setLoading]   = useState(false)

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent submission if the API key hasn't been configured yet.
    // Web3Forms returns success:true for any key but silently drops the email.
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      setError('Contact form is not configured yet. Please email us directly at support@swajaysolutions.com.')
      setTimeout(() => setError(false), 6000)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name:    form.fullName,
          email:   form.email,
          phone:   form.phone,
          company: form.company,
          message: form.message,
          subject: `New enquiry from ${form.fullName} — Swajay Solutions`,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSent(true)
        setForm({ fullName: '', email: '', phone: '', company: '', message: '' })
        setTimeout(() => setSent(false), 5000)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
        setTimeout(() => setError(false), 5000)
      }
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
      setTimeout(() => setError(false), 5000)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm'
  const labelCls = 'block text-sm font-semibold text-foreground/80 mb-1.5'

  return (
    <div className="pt-[86px] bg-background overflow-hidden">

      {/* Hero + Form */}
      <section className="py-20 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-25" />

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
                {/* USA */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-0.5">USA Headquarters</div>
                    <p className="text-sm text-muted-foreground">8 The Green STE R, Dover, DE 19901</p>
                  </div>
                </div>
                {/* India locations — grouped */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-1.5">India Operations</div>
                    <ul className="space-y-1.5">
                      {[
                        'No 21, Binnamangala, Indiranagar, Bengaluru 560038',
                        'Summit A, Brigade Metropolis, Garudachar Palya, Bengaluru 560048',
                        '#1788/23, 5th Main, 9th Cross, Hampinagar, Vijayanagar 2nd Stage, Bengaluru 560104',
                      ].map((addr, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0 font-bold">•</span>
                          {addr}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-0.5">Email Us</div>
                    <a href="mailto:support@swajaysolutions.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">support@swajaysolutions.com</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <GlassCard className="p-8">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-2">Message Us</p>
                <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-[-0.01em]">Send us a Message</h2>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-semibold"
                  >
                    ✓ Message sent! We'll get back to you shortly.
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-semibold"
                  >
                    {error}
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
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
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
              <GlassCard className="p-8 h-full">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-2">Reach Us</p>
                <h2 className="text-2xl font-extrabold text-foreground mb-7 tracking-[-0.01em]">Contact Information</h2>
                <div className="space-y-6">
                  {/* USA */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-0.5 text-sm">USA Headquarters</div>
                      <p className="text-muted-foreground text-sm leading-relaxed">8 The Green STE R, Dover, DE 19901</p>
                    </div>
                  </div>

                  {/* India — all 3 under one heading */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1.5 text-sm">India Operations</div>
                      <ul className="space-y-1.5">
                        {[
                          'No 21, Binnamangala, Indiranagar, Bengaluru 560038',
                          'Summit A, Brigade Metropolis, Garudachar Palya, Bengaluru 560048',
                          '#1788/23, 5th Main, 9th Cross, Hampinagar, Vijayanagar 2nd Stage, Bengaluru 560104',
                        ].map((addr, i) => (
                          <li key={i} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-primary mt-0.5 flex-shrink-0 font-bold">•</span>
                            {addr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

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
                      className="inline-flex w-10 h-10 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-xl items-center justify-center hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <GlassCard className="p-8 h-full">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-2">Where We Are</p>
                <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-[-0.01em]">Our Locations</h2>
                <div className="rounded-xl overflow-hidden h-[360px] ring-1 ring-border">
                  <iframe
                    title="Swajay Solutions – Bengaluru Office"
                    src="https://maps.google.com/maps?q=1788%2F23+5th+Main+9th+Cross+Hampinagar+Vijayanagar+2nd+Stage+Bengaluru+560104+India&output=embed&z=16"
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
