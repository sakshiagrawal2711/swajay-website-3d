import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Bot, Smartphone, Database, AlertTriangle, CheckCircle2, Workflow, TrendingUp } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GlassCard } from '../ui/GlassCard'
import { GradientOrb } from '../ui/GradientOrb'

type CaseStudy = {
  id: string; tag: string; title: string; image: string
  kpis: { value: string; label: string }[]
  challenge: string[]; solution: string[]; execution: string[]; outcomes: string[]
  icon: React.ReactNode
  testimonial?: { quote: string; author: string; role: string }
  technologies?: string[]
}

const studies: CaseStudy[] = [
  {
    id: 'rpa', tag: 'RPA AUTOMATION', title: 'Automating Report Generation',
    icon: <Cpu className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    kpis: [
      { value: '90%',         label: 'improvement in cycle time (120 mins → 4 mins)' },
      { value: '$80K–$100K',  label: 'Annual Cost Saving Optimization on FTE' },
    ],
    challenge: ['The order management process starting from receipt of orders through mails and managing it through execution process was all manually done.', 'Manually this entire process was time-consuming as there were multiple systems involved, leading to additional cost and manual errors resulting in inaccurate reports.', 'Challenges included — missing SLAs, accuracy in management, potential human errors, time consumption.'],
    solution:  ['Built using Blue Prism with integration to both Web and Mainframe applications as part of the automation process.', 'A BluePrism-based bot retrieves loan details and generates reports automatically.', 'Enter retrieved details, a pre-defined set of investor codes, and current date into a mainframe system for the report to get generated in AIP portal.', 'A report gets generated and sent to the business team for further action.'],
    execution: ['Collaborating with business team and IT teams to outline the automation solution.', 'Detailed process analysis identifying bottlenecks and opportunities for process refinement.', 'All rules were built integral to the solution and validated.', 'Edge case scenarios identified and solution enhanced to handle them.'],
    outcomes:  ['90% improvement in cycle time — reduced from 120 mins to 4 mins', '$80K to $100K annual cost saving optimization on FTE', 'Zero defects and full SLA adherence', 'Reduced manual errors and improved compliance'],
  },
  {
    id: 'ai', tag: 'AI & AUTOMATION', title: 'AI Solution - Automating the entire order management workflow',
    icon: <Bot className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    testimonial: { quote: "The AI solution completely transformed our order management. The accuracy and speed we've achieved are unprecedented, allowing our team to focus on strategic growth rather than manual entry.", author: 'D', role: 'Director of Operations' },
    kpis: [
      { value: '100%',    label: "adherence to client SLA's" },
      { value: '20%',     label: 'Reduced Order Management time' },
      { value: '$20K USD',label: 'savings from Cost optimization by eliminating manual intervention' },
    ],
    challenge: ["The order management process starting from receipt of orders through mails and managing it through execution process was all manually done.", "Challenges included – missing SLA's, Accuracy in management, potential human errors, Time consumption."],
    solution:  ['Detailed Process Analysis identifying bottlenecks and opportunities for process refinements.', 'Collaborating with business team and IT teams to outline the automation solution.', 'AI Based solution design and demo of MVP.', 'It took 2 weeks to completely automate the entire order management process.'],
    execution: ['All user personas and actions captured.', 'Developed UI for various roles.', 'All rules were built integral to solutions and validated.', 'Edge case scenarios identified and solution enhanced to handle it.', 'Performance of solution for high loads tested to ensure minimum latency.', 'QC checks for automated order execution process and productionized the solution post achieving 100% accuracy.'],
    outcomes:  ['100% adherence to client SLAs achieved', '20% reduction in order management time', '$20K USD savings from cost optimization by eliminating manual intervention', 'Dramatic decrease in manual order handling through intelligent automation'],
  },
  {
    id: 'app', tag: 'APP DEVELOPMENT', title: 'Developed Web & Mobile application for a Seasoned Mortgage Lender',
    icon: <Smartphone className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    technologies: ['Java', 'Springboot', 'React JS', 'AWS components & services', 'REST API'],
    kpis: [
      { value: 'Zero downtime', label: "since product launched in Sep'22 with full load of 1.7M customers." },
      { value: '30%',           label: 'Reduced infra cost after cloud migration' },
      { value: '60K/day',       label: 'Increased user volumes due to improved API response time (<2 secs)' },
      { value: 'Reduced Calls', label: 'Drastically reduced calls to call-center because of the user-friendly application' },
    ],
    challenge: ['Mortgage applications process was lengthy, difficult to scale, maintain & update due to tightly coupled architecture.', 'Non user-friendly applications for Customer Interaction.', 'Frequent downtime of the applications resulting in business loss.', 'Existing applications were not Accessibility compliant (ADA, WCAG etc.).'],
    solution:  ['Defined a transformation approach to migrate Monolithic based application to Microservices application.', 'Enriched UI interface to enhance CX.', 'Migrated the services from on-premise to cloud.', 'Developed mobile application which is 100% American Disability Act Compliant.'],
    execution: ['Microservices-based web and mobile applications with zero-downtime deployments and optimized infrastructure costs.', 'Continuous expansion of features and integration ensuring value delivery every two weeks.', 'Performance testing and load validation for full customer volume.'],
    outcomes:  ['Zero downtime since launch with 1.7M customers', '30% reduced infrastructure cost after cloud migration', '60K/day increased user volumes with sub-2-second API response', '100% ADA / WCAG accessibility compliance achieved'],
  },
  {
    id: 'data', tag: 'DATA & ANALYTICS', title: 'Define & Implement a Data Strategy & Platform for a Leading Mortgage Company',
    icon: <Database className="w-5 h-5" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    technologies: ['SSIS', 'SSRS, PowerBI', 'SQL, SSMS', 'Snowflake'],
    kpis: [
      { value: 'Fresh Insights', label: 'Uncovered fresh business insights such as bankruptcy details, foreclosure details which helped management team to take appropriate & quick action' },
      { value: '5%',   label: 'Increase in sales with provision of area sales reporting' },
      { value: '30%',  label: 'of cost saving after moving data from On-Prem to Snowflake' },
      { value: '94%',  label: 'Increased the efficiency of report generation' },
    ],
    challenge: ['Unstructured mortgage data scattered across disparate systems leading to inefficient & inaccurate business insight generation.', 'Difficult to manage the high-volume data as they were located on-premise making cost expensive & time consuming for scaling up/down.', 'No technical/data strategy.', 'Adhoc & unstructured jobs.'],
    solution:  ['Created a unified data view & developed visualizations to help business infer the data better and make accurate decisions.', 'Migrated data from on-premise SQL server to Snowflake cloud.', 'Cumbersome SQL statements are converted to simple SSIS transformations.', 'Automated generation of complex reports based on cadence defined by business.'],
    execution: ['Defined and implemented a comprehensive data strategy and cloud platform roadmap.', 'Migrated on-premise data to Snowflake Cloud, achieving significant cost savings and improved reporting efficiency.', 'Built advanced analytics dashboards and KPI tracking with capacity planning insights.'],
    outcomes:  ['Fresh business insights uncovered for quick management action', '5% increase in sales with area sales reporting', '30% cost savings after moving data from On-Prem to Snowflake', '94% increased efficiency of report generation'],
  },
]

const tagColors: Record<string, string> = {
  'RPA AUTOMATION':  'from-[#6495ed] to-[#6c5ce7]',
  'AI & AUTOMATION': 'from-[#6c5ce7] to-[#8e44ad]',
  'APP DEVELOPMENT': 'from-green-600 to-teal-600',
  'DATA & ANALYTICS':'from-orange-600 to-amber-600',
}

export function CaseStudiesPage() {
  const [active, setActive] = useState(studies[0].id)
  const study = studies.find(s => s.id === active)!

  return (
    <div className="pt-20 bg-background overflow-hidden">

      {/* Hero */}
      <section className="py-20 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-25" />
        <GradientOrb size={500} color="purple" className="top-0 right-0 opacity-40" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Success Stories</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight tracking-[-0.02em]">
              Case <span className="text-gradient">Studies</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Real-world examples of how we help businesses transform and succeed through technology and innovation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">

          {/* Study selector tabs */}
          <AnimatedSection className="flex flex-wrap gap-3 mb-12">
            {studies.map(s => (
              <motion.button
                key={s.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(s.id)}
                className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active === s.id
                    ? `bg-gradient-to-r ${tagColors[s.tag]} text-white shadow-glow-sm`
                    : 'bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.tag}</span>
              </motion.button>
            ))}
          </AnimatedSection>

          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-2">
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${tagColors[study.tag]} text-white text-xs font-bold tracking-widest rounded-full`}>{study.tag}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">{study.title}</h2>

              {/* Image + KPIs */}
              <div className="grid md:grid-cols-[280px_1fr] gap-6 mb-8">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#6495ed]/20 blur-2xl" />
                    <img src={study.image} alt={study.title} loading="lazy"
                      className="relative w-full h-64 object-cover rounded-2xl ring-1 ring-border" />
                  </div>
                  {study.testimonial && (
                    <GlassCard className="p-4">
                      <p className="text-xs text-muted-foreground italic leading-relaxed mb-3">"{study.testimonial.quote}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{study.testimonial.author}</div>
                        <span className="text-xs font-semibold text-primary">{study.testimonial.role}</span>
                      </div>
                    </GlassCard>
                  )}
                  {study.technologies && (
                    <GlassCard className="p-4">
                      <div className="text-xs font-bold text-foreground mb-2">Technologies</div>
                      <div className="flex flex-wrap gap-1.5">
                        {study.technologies.map(t => (
                          <span key={t} className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium">{t}</span>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                </div>

                <div className={`grid gap-4 ${study.kpis.length >= 4 ? 'sm:grid-cols-2' : study.kpis.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                  {study.kpis.map(k => (
                    <motion.div
                      key={k.label}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/[0.05] to-[#8e44ad]/[0.04]" />
                      <div className="relative">
                        <div className="text-4xl font-extrabold text-gradient mb-2 tabular-nums leading-none">{k.value}</div>
                        <div className="text-sm text-muted-foreground font-medium leading-snug">{k.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Challenge + Solution */}
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center text-red-500"><AlertTriangle className="w-5 h-5" /></div>
                    <h3 className="text-xl font-bold text-foreground">The Challenge</h3>
                  </div>
                  <ul className="space-y-3">{study.challenge.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />{c}
                    </li>
                  ))}</ul>
                </GlassCard>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/15 rounded-xl flex items-center justify-center text-green-500"><CheckCircle2 className="w-5 h-5" /></div>
                    <h3 className="text-xl font-bold text-foreground">The Solution</h3>
                  </div>
                  <ul className="space-y-3">{study.solution.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />{c}
                    </li>
                  ))}</ul>
                </GlassCard>
              </div>

              {/* Execution + Outcomes */}
              <div className="grid md:grid-cols-2 gap-5">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] rounded-xl flex items-center justify-center text-white"><Workflow className="w-5 h-5" /></div>
                    <h3 className="text-xl font-bold text-foreground">Execution Strategy</h3>
                  </div>
                  <ul className="space-y-3">{study.execution.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] rounded-full mt-2 flex-shrink-0" />{c}
                    </li>
                  ))}</ul>
                </GlassCard>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#6495ed] via-[#6c5ce7] to-[#8e44ad] rounded-xl flex items-center justify-center text-white"><TrendingUp className="w-5 h-5" /></div>
                    <h3 className="text-xl font-bold text-foreground">Outcomes</h3>
                  </div>
                  <ul className="space-y-3">{study.outcomes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{c}
                    </li>
                  ))}</ul>
                </GlassCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
