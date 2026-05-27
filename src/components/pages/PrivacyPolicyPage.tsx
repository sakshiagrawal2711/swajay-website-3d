import { motion } from 'framer-motion'

const LAST_UPDATED = 'May 27, 2026'

type Section = { title: string; content: (string | { sub: string; text: string })[] }

const sections: Section[] = [
  {
    title: '1. Introduction',
    content: [
      'Swajay Business Solutions, LLC ("Swajay", "we", "our", or "us") is committed to protecting the privacy and security of personal information entrusted to us by our clients, website visitors, and business partners.',
      'This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website (swajaysolutions.com) or engage with our services. By accessing our website or using our services, you agree to the practices described in this policy.',
      'Given the sensitive nature of the mortgage and financial services industry in which we operate, we hold ourselves to the highest standards of data stewardship and comply with all applicable data protection laws, including but not limited to the California Consumer Privacy Act (CCPA), the General Data Protection Regulation (GDPR) where applicable, and relevant US federal and state financial privacy regulations.',
    ],
  },
  {
    title: '2. Information We Collect',
    content: [
      {
        sub: '2.1 Information You Provide Directly',
        text: 'We collect information you voluntarily submit through our website contact forms, email correspondence, service agreements, or business enquiries. This includes: full name, business email address, phone number, company name, job title, and the content of your messages or project briefs.',
      },
      {
        sub: '2.2 Information Collected Automatically',
        text: 'When you visit our website, we automatically collect certain technical data including: IP address, browser type and version, operating system, pages viewed, time spent on pages, referring URLs, and device identifiers. This data is collected through standard web server logs and analytics tools.',
      },
      {
        sub: '2.3 Client and Project Data',
        text: 'In the course of delivering our services — including mortgage processing, title search, document automation, and technology solutions — we may process business and operational data on behalf of our clients. Such data is governed by separate Data Processing Agreements (DPAs) and applicable service contracts.',
      },
      {
        sub: '2.4 Cookies and Tracking Technologies',
        text: 'Our website uses essential cookies required for basic functionality. We do not use advertising or third-party tracking cookies. You may disable cookies through your browser settings; however, certain website features may not function correctly as a result.',
      },
    ],
  },
  {
    title: '3. How We Use Your Information',
    content: [
      'We use the information we collect for the following purposes:',
      '• To respond to your enquiries, contact form submissions, and service requests in a timely and professional manner.',
      '• To provide, operate, and improve our services, including mortgage processing, AI automation, title services, and technology consulting.',
      '• To send you relevant communications about our services, updates, or industry insights where you have consented or where we have a legitimate business interest.',
      '• To fulfil our contractual obligations under service agreements and data processing agreements with clients.',
      '• To comply with applicable legal and regulatory requirements, including financial services regulations and data protection laws.',
      '• To protect the security, integrity, and availability of our systems, services, and client data.',
      '• To analyse website usage patterns and improve user experience on our website.',
    ],
  },
  {
    title: '4. Legal Basis for Processing',
    content: [
      'Where the GDPR or similar legislation applies, our legal bases for processing personal data are:',
      '• Contractual necessity — processing required to fulfil a contract or pre-contractual steps at your request.',
      '• Legitimate interests — for responding to business enquiries, improving our services, and maintaining website security, provided these interests are not overridden by your rights.',
      '• Legal obligation — where we are required to process data to comply with applicable law.',
      '• Consent — where you have given explicit consent, for example to receive marketing communications. You may withdraw consent at any time.',
    ],
  },
  {
    title: '5. Information Sharing and Disclosure',
    content: [
      'We do not sell, rent, or trade your personal information to third parties. We may share information in the following limited circumstances:',
      {
        sub: '5.1 Service Providers',
        text: 'We work with trusted third-party service providers who assist in operating our website and delivering our services (e.g., cloud hosting providers, email platforms, analytics services). These providers are contractually bound to process data only on our instructions and in accordance with this policy.',
      },
      {
        sub: '5.2 Business Partners',
        text: 'Where required for service delivery — for example, in connection with title search databases, county record providers, or third-party integration platforms — we may share relevant operational data under appropriate data agreements.',
      },
      {
        sub: '5.3 Legal Requirements',
        text: 'We may disclose information if required to do so by law, court order, regulatory authority, or government request, or where necessary to protect the rights, safety, or property of Swajay, our clients, or the public.',
      },
      {
        sub: '5.4 Business Transfers',
        text: 'In the event of a merger, acquisition, or sale of all or part of our business assets, personal data held by us may be transferred to the acquiring entity, subject to equivalent privacy protections.',
      },
    ],
  },
  {
    title: '6. Data Security',
    content: [
      'We implement industry-standard administrative, technical, and physical security measures to protect your information against unauthorised access, disclosure, alteration, or destruction. Our security practices include:',
      '• Encryption of data in transit using TLS/HTTPS protocols.',
      '• Access controls and role-based permissions limiting data access to authorised personnel only.',
      '• Regular security assessments and vulnerability monitoring.',
      '• Employee training on data security and confidentiality obligations.',
      '• SOC 2-aligned security practices across our operations.',
      'While we take all reasonable precautions, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to promptly addressing any security incidents.',
    ],
  },
  {
    title: '7. Data Retention',
    content: [
      'We retain personal data for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law or contract. Specifically:',
      '• Contact form submissions and business enquiry data are retained for up to 24 months from the date of submission unless a business relationship is established.',
      '• Client and project data is retained for the duration of the engagement and for a period thereafter as required by applicable law or contract terms.',
      '• Website analytics data is retained in aggregated, anonymised form.',
      'When data is no longer required, we securely delete or anonymise it in accordance with our data retention procedures.',
    ],
  },
  {
    title: '8. International Data Transfers',
    content: [
      'Swajay operates in the United States and India. Information collected through our website or services may be transferred to and processed in both jurisdictions. We take appropriate steps to ensure that such transfers comply with applicable data protection laws, including implementing standard contractual clauses or other approved transfer mechanisms where required.',
    ],
  },
  {
    title: '9. Your Rights',
    content: [
      'Depending on your location and applicable law, you may have the following rights regarding your personal data:',
      '• Right of Access — to request a copy of the personal data we hold about you.',
      '• Right to Rectification — to request correction of inaccurate or incomplete data.',
      '• Right to Erasure — to request deletion of your personal data in certain circumstances.',
      '• Right to Restriction — to request that we limit how we process your data.',
      '• Right to Data Portability — to receive your data in a structured, machine-readable format.',
      '• Right to Object — to object to processing based on legitimate interests or for direct marketing purposes.',
      '• Right to Withdraw Consent — where processing is based on consent, to withdraw it at any time.',
      'To exercise any of these rights, please contact us at support@swajaysolutions.com. We will respond within 30 days. We may need to verify your identity before processing your request.',
    ],
  },
  {
    title: '10. Third-Party Links',
    content: [
      'Our website may contain links to third-party websites or services, including LinkedIn and other platforms. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies before providing any personal information.',
    ],
  },
  {
    title: '11. Children\'s Privacy',
    content: [
      'Our website and services are directed exclusively to business professionals and are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately and we will take steps to delete it.',
    ],
  },
  {
    title: '12. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. We will indicate the date of the most recent revision at the top of this page. Where changes are material, we will make reasonable efforts to notify affected parties. Continued use of our website or services following any changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    title: '13. Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
      'Swajay Business Solutions, LLC',
      '8 The Green STE R, Dover, DE 19901, United States',
      'Email: support@swajaysolutions.com',
      'We are committed to resolving any privacy concerns promptly and transparently.',
    ],
  },
]

export function PrivacyPolicyPage() {
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
              Privacy Policy
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
