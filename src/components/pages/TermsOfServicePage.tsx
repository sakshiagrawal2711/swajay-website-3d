import { motion } from 'framer-motion'

const LAST_UPDATED = 'May 27, 2026'

type Section = { title: string; content: (string | { sub: string; text: string })[] }

const sections: Section[] = [
  {
    title: '1. Agreement to Terms',
    content: [
      'These Terms of Service ("Terms") constitute a legally binding agreement between you and Swajay Business Solutions, LLC ("Swajay", "we", "our", or "us"), governing your access to and use of our website at swajaysolutions.com and any services we provide.',
      'By accessing our website, submitting an enquiry, or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not access our website or use our services.',
      'These Terms apply to all visitors, clients, business partners, and any other individuals who access or use our website or services. Where services are rendered under a separate written agreement or Statement of Work ("SOW"), that agreement shall govern in the event of any conflict with these Terms.',
    ],
  },
  {
    title: '2. Description of Services',
    content: [
      'Swajay Business Solutions, LLC is a business process outsourcing and technology company providing services primarily to the mortgage and financial services industry. Our services include, but are not limited to:',
      {
        sub: '2.1 Mortgage & Title Services',
        text: 'Mortgage loan processing, underwriting support, pre-underwriting, post-closing, title search and examination, curative services, title insurance support, and related document processing and review services.',
      },
      {
        sub: '2.2 AI & Automation Solutions',
        text: 'Artificial intelligence strategy and consulting, intelligent document processing, robotic process automation (RPA), workflow automation design and implementation, and AI-powered operational transformation engagements.',
      },
      {
        sub: '2.3 Technology Consulting',
        text: 'Custom software development, systems integration, API development, cloud infrastructure services, data engineering, and enterprise technology consulting.',
      },
      'All services are subject to the specific terms and scope outlined in individual service agreements, Statements of Work, or Data Processing Agreements entered into between Swajay and the client.',
    ],
  },
  {
    title: '3. Eligibility and Use of Website',
    content: [
      'Our website and services are intended exclusively for business professionals and commercial entities. By using our website, you represent and warrant that:',
      '• You are at least 18 years of age and have the legal capacity to enter into binding agreements.',
      '• You are accessing the website on behalf of a business or organisation, and you have authority to bind that entity to these Terms.',
      '• You will use the website and any information obtained from it solely for lawful business purposes.',
      '• You will not use our website or services in any manner that violates applicable federal, state, or local laws or regulations.',
      'We reserve the right to restrict access to our website or refuse service to any user or entity, at our sole discretion, without notice.',
    ],
  },
  {
    title: '4. Intellectual Property',
    content: [
      'All content on this website — including but not limited to text, graphics, logos, icons, images, software, and the overall design and arrangement thereof — is the exclusive intellectual property of Swajay Business Solutions, LLC or its licensors, and is protected by applicable copyright, trademark, and other intellectual property laws.',
      {
        sub: '4.1 Permitted Use',
        text: 'You may access and view website content for personal, non-commercial informational purposes only. You may not reproduce, republish, distribute, transmit, display, modify, create derivative works of, or exploit any part of this website without our prior written consent.',
      },
      {
        sub: '4.2 Client Deliverables',
        text: 'Unless expressly stated otherwise in a signed written agreement, all work product, reports, analyses, software, documentation, and other deliverables created by Swajay in connection with client engagements are owned by Swajay until full payment is received, at which point ownership transfers to the client as specified in the applicable service agreement.',
      },
      {
        sub: '4.3 Feedback',
        text: 'Any feedback, suggestions, or ideas you provide regarding our website or services may be used by Swajay freely and without restriction, compensation, or attribution to you.',
      },
    ],
  },
  {
    title: '5. Confidentiality',
    content: [
      'In the course of evaluating or engaging our services, both parties may disclose confidential and proprietary information. Each party agrees to:',
      '• Hold the other party\'s confidential information in strict confidence using at least the same degree of care it uses to protect its own confidential information (but no less than reasonable care).',
      '• Use confidential information solely for the purposes of evaluating or performing the agreed services.',
      '• Not disclose confidential information to any third party without prior written consent, except to employees or contractors who have a need to know and are bound by equivalent confidentiality obligations.',
      'Confidentiality obligations do not apply to information that is or becomes publicly available through no fault of the receiving party, was already known to the receiving party prior to disclosure, or is required to be disclosed by law or regulatory authority.',
      'Where services involve processing of personal or sensitive data, a separate Data Processing Agreement (DPA) shall govern the handling of such data in compliance with applicable privacy laws.',
    ],
  },
  {
    title: '6. Payment Terms',
    content: [
      'For all paid services, the following payment terms apply unless otherwise specified in a signed service agreement:',
      '• Invoices are issued in United States Dollars (USD) and are due within thirty (30) days of the invoice date.',
      '• Swajay reserves the right to suspend or discontinue services in the event of non-payment beyond the agreed payment period.',
      '• Late payments may be subject to interest at the rate of 1.5% per month (or the maximum rate permitted by applicable law, whichever is lower).',
      '• All fees are exclusive of applicable taxes, duties, or levies. The client is responsible for any taxes arising in connection with the services.',
      '• Disputes regarding invoices must be raised in writing within ten (10) business days of the invoice date. Undisputed amounts remain due as stated.',
    ],
  },
  {
    title: '7. Disclaimer of Warranties',
    content: [
      'THE WEBSITE AND ALL CONTENT AND INFORMATION PROVIDED THEREON ARE OFFERED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.',
      'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, SWAJAY EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
      'We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or reliability of any content on the website. Information on our website is provided for general informational purposes only and does not constitute professional legal, financial, or regulatory advice.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    content: [
      'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SWAJAY BUSINESS SOLUTIONS, LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES — INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF DATA, BUSINESS INTERRUPTION, OR LOSS OF GOODWILL — ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE WEBSITE OR OUR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
      'Our total aggregate liability to you for any claims arising out of or related to these Terms or our services shall not exceed the greater of: (a) the total fees paid by you to Swajay in the three (3) months immediately preceding the event giving rise to the claim, or (b) one hundred US dollars (USD $100).',
      'Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such jurisdictions, the above limitations apply to the fullest extent permitted by law.',
    ],
  },
  {
    title: '9. Indemnification',
    content: [
      'You agree to indemnify, defend, and hold harmless Swajay Business Solutions, LLC and its officers, directors, employees, agents, and licensors from and against any claims, actions, proceedings, losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to:',
      '• Your access to or use of our website or services.',
      '• Your violation of these Terms or any applicable law or regulation.',
      '• Any content you submit, transmit, or make available through our website or in connection with our services.',
      '• Your infringement of any third-party intellectual property, privacy, or other rights.',
    ],
  },
  {
    title: '10. Third-Party Links and Integrations',
    content: [
      'Our website may contain links to third-party websites, tools, or platforms (including LinkedIn and external service providers). Such links are provided for convenience only. Swajay has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party sites or services.',
      'The inclusion of any link does not imply endorsement, sponsorship, or affiliation. We encourage you to review the terms and privacy policies of any third-party services you access through our website.',
    ],
  },
  {
    title: '11. Governing Law and Jurisdiction',
    content: [
      'These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of laws principles.',
      'Any legal action or proceeding arising out of or relating to these Terms or our services shall be brought exclusively in the state or federal courts located in the State of Delaware. By using our website or services, you consent to the personal jurisdiction of such courts.',
      'If you are accessing our services from India or another jurisdiction, you agree that Delaware law governs and that you submit to Delaware jurisdiction for dispute resolution purposes.',
    ],
  },
  {
    title: '12. Dispute Resolution',
    content: [
      'Before commencing any formal legal proceeding, the parties agree to attempt to resolve any dispute informally. The aggrieved party shall provide written notice describing the dispute in reasonable detail. The parties will then attempt in good faith to negotiate a resolution within thirty (30) days of receipt of such notice.',
      {
        sub: '12.1 Arbitration',
        text: 'If informal resolution fails, any dispute, claim, or controversy arising out of or relating to these Terms or our services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall take place in Dover, Delaware. The arbitrator\'s award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.',
      },
      {
        sub: '12.2 Class Action Waiver',
        text: 'You agree that any dispute resolution proceeding will be conducted on an individual basis only, and not as a class, consolidated, or representative action. You waive your right to participate in any class action lawsuit or class-wide arbitration.',
      },
      {
        sub: '12.3 Exceptions',
        text: 'Notwithstanding the above, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent actual or threatened infringement of intellectual property rights or breach of confidentiality obligations.',
      },
    ],
  },
  {
    title: '13. Termination',
    content: [
      'These Terms remain in effect for as long as you use our website or services. We reserve the right to suspend or terminate your access to our website at any time, for any reason, with or without notice.',
      'If a service engagement is governed by a separate service agreement, termination of that agreement shall be subject to the termination provisions contained therein.',
      'Upon termination: (a) all rights granted to you under these Terms cease immediately; (b) you must cease all use of our website and services; (c) any provisions of these Terms that by their nature should survive termination shall survive, including but not limited to Sections 4, 5, 7, 8, 9, 11, and 12.',
    ],
  },
  {
    title: '14. Changes to These Terms',
    content: [
      'We reserve the right to modify these Terms at any time. When we make changes, we will update the "Last Updated" date at the top of this page. Where changes are material, we will make reasonable efforts to notify affected parties.',
      'Your continued use of our website or services following any changes to these Terms constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must discontinue use of our website and services.',
    ],
  },
  {
    title: '15. Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:',
      'Swajay Business Solutions, LLC',
      '8 The Green STE R, Dover, DE 19901, United States',
      'Email: support@swajaysolutions.com',
      'We are committed to resolving any concerns promptly and transparently.',
    ],
  },
]

export function TermsOfServicePage() {
  return (
    <div className="pt-[86px] bg-background min-h-screen">

      {/* Hero */}
      <section className="py-16 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 bg-grid-dark opacity-25" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight tracking-[-0.02em]">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm">Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-background">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-10"
          >
            {sections.map((sec, i) => (
              <div key={i} className="border-b border-border pb-10 last:border-0">
                <h2 className="text-xl font-bold text-foreground mb-5 tracking-[-0.01em]">
                  {sec.title}
                </h2>
                <div className="space-y-4">
                  {sec.content.map((item, j) =>
                    typeof item === 'string' ? (
                      <p key={j} className="text-muted-foreground text-sm leading-relaxed">
                        {item}
                      </p>
                    ) : (
                      <div key={j} className="pl-4 border-l-2 border-primary/30">
                        <p className="text-sm font-semibold text-foreground mb-1.5">{item.sub}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
