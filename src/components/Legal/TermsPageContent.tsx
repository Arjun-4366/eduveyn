'use client';

import Link from 'next/link';

const LAST_UPDATED = 'August 22, 2026';
const CONTACT_EMAIL = 'hello@eduveyn.com';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <p>
        By accessing or using Eduveyn&apos;s website, platform, or services (the &quot;Platform&quot;),
        you agree to be bound by these Terms and Conditions. These Terms apply to all users including
        students, parents, guardians, and tutors. If you do not agree, please do not use the Platform.
        Eduveyn reserves the right to modify these Terms at any time; continued use constitutes your acceptance.
      </p>
    ),
  },
  {
    id: 'platform-description',
    title: '2. Platform Description',
    content: (
      <>
        <p>
          Eduveyn is an online tutoring marketplace that connects students and parents with independent,
          verified tutors for personalised one-on-one sessions across Mathematics, Science, English,
          Arabic, Coding, and Commerce — spanning primary, middle, and high school levels.
        </p>
        <p className="mt-3">
          Tutors are independent service providers, not employees or agents of Eduveyn. Eduveyn is
          responsible for tutor verification, platform operations, payment processing, and customer support.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: '3. Eligibility & Account Registration',
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>You must be at least 18 years of age to register. Parents or guardians must register on behalf of minor students.</li>
        <li>You agree to provide accurate, current information and keep your account details up to date.</li>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>Tutors must complete Eduveyn&apos;s verification process before their profiles are made publicly visible.</li>
      </ul>
    ),
  },
  {
    id: 'booking-sessions',
    title: '4. Booking & Sessions',
    content: (
      <>
        <p><strong>Demo Classes:</strong> New students may book one free demo class per tutor.</p>
        <p className="mt-3"><strong>Cancellations by Students:</strong> Sessions cancelled more than 24 hours in advance receive a full credit. Within 24 hours, a fee of up to 50% may apply.</p>
        <p className="mt-3"><strong>Cancellations by Tutors:</strong> The student receives a full refund or credit. Frequent tutor cancellations may result in account penalties.</p>
        <p className="mt-3"><strong>No-shows:</strong> If a tutor is absent without notice, the student receives a full refund. If a student is absent without notice, the session fee is not refunded.</p>
      </>
    ),
  },
  {
    id: 'payments',
    title: '5. Payments & Refunds',
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>All session fees are processed securely via third-party providers. Eduveyn does not store card details.</li>
        <li>Tutor payouts are processed weekly after deducting Eduveyn&apos;s commission and applicable taxes.</li>
        <li>Refund requests for completed sessions must be raised within 48 hours of session completion.</li>
        <li>Eduveyn is not liable for payment failures caused by your bank or payment network.</li>
      </ul>
    ),
  },
  {
    id: 'prohibited-conduct',
    title: '6. Prohibited Conduct',
    content: (
      <>
        <p>Users must not:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Use the Platform for any unlawful, fraudulent, or harmful purpose.</li>
          <li>Harass, abuse, or discriminate against any tutor, student, or Eduveyn staff.</li>
          <li>Attempt to hack, scrape, or disrupt the Platform.</li>
          <li>Arrange sessions outside the Platform to circumvent fees.</li>
          <li>Share or transfer your account to another person.</li>
        </ul>
        <p className="mt-3">Violations may result in immediate account suspension or termination.</p>
      </>
    ),
  },
  {
    id: 'limitation-liability',
    title: '7. Limitation of Liability',
    content: (
      <p>
        To the fullest extent permitted by applicable law, Eduveyn shall not be liable for any
        indirect, incidental, or consequential damages. Eduveyn&apos;s total liability for any claim
        shall not exceed the total fees paid by that user in the three months preceding the claim.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '8. Governing Law',
    content: (
      <p>
        These Terms are governed by the laws of the United Arab Emirates (UAE). Disputes shall first
        be subject to good-faith negotiation, and if unresolved within 30 days, referred to the courts
        of Dubai, UAE.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '9. Contact',
    content: (
      <p>
        For questions about these Terms, contact our Legal Team at:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4915b0] underline underline-offset-2 font-semibold">{CONTACT_EMAIL}</a>
        {' '}or visit our{' '}
        <Link href="/contact" className="text-[#4915b0] underline underline-offset-2 font-semibold">Contact Page</Link>.
      </p>
    ),
  },
];

export default function TermsPageContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms &amp; Conditions</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 className="text-base font-semibold text-gray-900 mb-3">{s.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed">{s.content}</div>
            </div>
          ))}

          {/* Bottom nav */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Link href="/privacy" className="text-sm text-[#4915b0] font-semibold hover:underline">
              ← Read our Privacy Policy
            </Link>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Back to Home →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
