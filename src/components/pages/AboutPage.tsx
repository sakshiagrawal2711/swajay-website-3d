import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Target, Eye, CheckCircle2, Briefcase, TrendingUp, Handshake, Zap } from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerItem } from '../ui/AnimatedSection'
import { GradientOrb } from '../ui/GradientOrb'

const ADVANTAGES = [
  { icon: Briefcase,  label: 'Deep Industry\nExperience' },
  { icon: TrendingUp, label: 'Multidisciplinary\nExecution' },
  { icon: Handshake,  label: 'Scalable Delivery\nModel' },
  { icon: Zap,        label: 'Strategic Advisory\nNetwork' },
]

const STATS = [
  { v: '100%',  l: 'Client Satisfaction',   sub: 'Every engagement' },
  { v: '24/7',  l: 'Support Available',     sub: 'Round-the-clock' },
  { v: '99.7%', l: 'Quality Score',         sub: 'Zero defect target' },
  { v: '100%',  l: 'Regulatory Compliance', sub: 'Every transaction' },
]

const TEAM = [
  { name: 'Raju Gourishetty',         img: '/muniraju.png' },
  { name: 'Nagaraj Srinivasamurthy',  img: '/nagaraj.jpg' },
  { name: 'Muniraju S',               img: '/raju.jpg' },
  { name: 'Thirumalesh M V',          img: '/thiru.png' },
]

const PARTNERS = ['Resware', 'Qualia', 'SoftPro', 'Encompass', 'ICE Mortgage Technology']

export function AboutPage() {
  return (
    <div className="pt-20 bg-background overflow-hidden">

      {/* ─── Hero ─── */}
      <section className="py-24 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <GradientOrb size={500} color="purple" className="top-0 right-0 opacity-40" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <AnimatedSection direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">About Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-[-0.02em]">
                About <span className="text-gradient">Swajay</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Decades of expertise, modern innovation, and a commitment to solving real business challenges
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative flex items-center justify-center w-full h-[380px]">
                <GradientOrb size={300} color="purple" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-primary/30" />

                {ADVANTAGES.map((adv, i) => {
                  const Icon = adv.icon
                  const positions: CSSProperties[] = [
                    { top: '0%',   left: '50%', transform: 'translate(-50%,0)' },
                    { top: '50%',  right: '0%', transform: 'translate(0,-50%)' },
                    { bottom: '0%',left: '50%', transform: 'translate(-50%,0)' },
                    { top: '50%',  left: '0%',  transform: 'translate(0,-50%)' },
                  ]
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                      className="absolute w-28 h-28 bg-card border border-border rounded-2xl backdrop-blur-xl shadow-glass flex flex-col items-center justify-center text-center p-3 cursor-default"
                      style={positions[i]}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-lg flex items-center justify-center text-primary mb-1.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-[11px] font-bold text-foreground whitespace-pre-line leading-tight">{adv.label}</div>
                    </motion.div>
                  )
                })}

                <motion.div
                  className="relative z-10 w-32 h-32 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] rounded-full flex items-center justify-center text-white text-center p-4"
                  animate={{ boxShadow: ['0 0 30px rgba(108,92,231,0.35)', '0 0 55px rgba(142,68,173,0.45)', '0 0 30px rgba(108,92,231,0.35)'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="font-bold text-sm leading-tight">Swajay's Advantages</span>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Partners Marquee ─── */}
      <section className="py-8 bg-background border-y border-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] flex-shrink-0" />
            <p className="text-sm font-bold text-foreground">Our Deep Expertise on Third Party Products</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex gap-4 w-max"
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 rounded-xl bg-card border border-border cursor-default"
              >
                <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">{p}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Our Mission</p>
              <h2 className="text-4xl font-extrabold text-foreground mb-6 leading-tight tracking-[-0.02em]">
                What Drives Us <span className="text-gradient">Forward</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Make advanced AI solutions useful and affordable — shipped quickly, run responsibly, and scaled with customers.
              </p>
              <ul className="space-y-4">
                {['Speed without sacrifice', 'Affordability at scale', 'Responsible innovation'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6495ed] to-[#8e44ad] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-primary/50 via-[#6495ed]/30 to-[#8e44ad]/50">
                <div className="rounded-2xl bg-card p-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-[#8e44ad]/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <Target className="w-7 h-7" />
                  </div>
                  <p className="text-xl text-foreground leading-relaxed font-semibold mb-6">
                    Mission-driven innovation focused on real business outcomes
                  </p>
                  <div className="pt-5 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Trusted by leading mortgage companies</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Vision ─── */}
      <section className="py-24 relative bg-card/40 overflow-hidden">
        <GradientOrb size={400} color="blue" className="bottom-0 right-0 opacity-40" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" className="order-2 md:order-1">
              <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[#6495ed]/50 via-primary/30 to-[#8e44ad]/50">
                <div className="rounded-2xl bg-card p-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6495ed]/20 to-primary/20 rounded-2xl flex items-center justify-center text-[#6495ed] mb-6">
                    <Eye className="w-7 h-7" />
                  </div>
                  <p className="text-xl text-foreground leading-relaxed font-semibold">
                    Enabling organizational excellence across industries
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="order-1 md:order-2">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Our Vision</p>
              <h2 className="text-4xl font-extrabold text-foreground mb-6 leading-tight tracking-[-0.02em]">
                Where We're <span className="text-gradient">Headed</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                To deliver intelligent Automation and AI solutions that empower organizations in Mortgage, BFSI/Healthcare, Commerce, and Legal domains to achieve superior customer outcomes and operational excellence.
              </p>
              <ul className="space-y-4">
                {['Industry-leading automation', 'Superior customer outcomes', 'Operational excellence'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6495ed] to-[#8e44ad] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-20 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group overflow-hidden cursor-default text-center"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/5 group-hover:to-[#8e44ad]/5 transition-all duration-500" />
                <div className="relative">
                  <div className="text-5xl lg:text-6xl font-extrabold text-gradient mb-2 tabular-nums leading-none">{s.v}</div>
                  <div className="font-semibold text-foreground mb-1">{s.l}</div>
                  <div className="text-sm text-muted-foreground">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="py-24 relative bg-card/40 overflow-hidden">
        <GradientOrb size={500} color="purple" className="top-0 left-0 opacity-30" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">Leadership</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight tracking-[-0.02em]">Our Team</h2>
            <p className="text-lg text-gradient font-semibold">Better outcomes, built together</p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={0.1}>
            {TEAM.map(person => (
              <motion.div key={person.name} variants={staggerItem}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative bg-card border border-border rounded-2xl p-4 text-center hover:border-primary/30 transition-colors cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-[#8e44ad]/5 rounded-2xl" />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-[#8e44ad]/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={person.img}
                      alt={person.name}
                      className="relative w-full aspect-square object-cover object-top rounded-xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                    />
                  </div>
                  <h3 className="relative text-sm font-bold text-foreground leading-tight">{person.name}</h3>
                </motion.div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
