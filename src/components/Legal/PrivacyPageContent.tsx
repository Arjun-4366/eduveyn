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
    id: 'overview',
    title: '1. Overview',
    content: (
      <p>
        Eduveyn operates an online tutoring marketplace that connects students and parents with
        verified tutors. This Privacy Policy explains what personal information we collect when you
        visit our website or use our services, and how we use, store, share, and protect it.
        By accessing Eduveyn, you agree to the practices described in this policy.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    content: (
      <>
        <p className="font-semibold text-gray-800 mb-2">Information You Provide</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Account registration: name, email, phone number, country/city.</li>
          <li>Student/parent profile: grade level, subjects of interest, learning goals.</li>
          <li>Tutor registration: qualifications, subject expertise, government-issued ID, payment details.</li>
          <li>Demo booking: name, email, phone, preferred date/time, and subject.</li>
          <li>Contact form submissions: name, email, and message.</li>
        </ul>
        <p className="font-semibold text-gray-800 mt-5 mb-2">Information Collected Automatically</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>IP address, browser type, device type.</li>
          <li>Pages visited, time on pages (via analytics).</li>
          <li>Session and authentication tokens stored in cookies.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>To create and manage your account and authenticate your identity.</li>
        <li>To match students with suitable tutors and facilitate sessions.</li>
        <li>To process payments, issue receipts, and manage refunds.</li>
        <li>To verify tutor credentials and ensure user safety.</li>
        <li>To send transactional emails (booking confirmations, reminders, invoices).</li>
        <li>To send marketing communications — only with your consent; you may opt out at any time.</li>
        <li>To comply with legal obligations, including fraud prevention.</li>
      </ul>
    ),
  },
  {
    id: 'children-privacy',
    title: "4. Children's Privacy",
    content: (
      <>
        <p>
          Accounts for students under 18 must be created and managed by a parent or legal guardian.
          We do not knowingly collect personal information from children under 13 without verifiable
          parental consent.
        </p>
        <p className="mt-3">
          Parents and guardians may review, update, or request deletion of their child&apos;s information
          at any time by contacting us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4915b0] underline underline-offset-2">{CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: '5. Sharing of Information',
    content: (
      <>
        <p>We do not sell your personal data. We may share your information only in the following circumstances:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>With tutors:</strong> Student name, subject needs, and session time are shared with the assigned tutor.</li>
          <li><strong>With service providers:</strong> Trusted third parties (hosting, payments, analytics) who process data under strict agreements.</li>
          <li><strong>For legal reasons:</strong> If required by law, court order, or government authority.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> Request that we delete your personal data.</li>
          <li><strong>Objection:</strong> Object to certain processing, including marketing.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4915b0] underline underline-offset-2">{CONTACT_EMAIL}</a>.
          We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: '7. Data Security',
    content: (
      <p>
        We implement industry-standard security measures including HTTPS encryption, secure password
        hashing, and role-based access controls. In the event of a data breach affecting your rights,
        we will notify you promptly in accordance with applicable law.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '8. Changes to This Policy',
    content: (
      <p>
        We may update this Privacy Policy to reflect changes in our practices or legal requirements.
        We will notify you of material changes by posting the updated policy with a revised
        &quot;Last Updated&quot; date. Your continued use of Eduveyn after changes are posted constitutes
        your acceptance.
      </p>
    ),
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: (
      <p>
        For questions or requests regarding this Privacy Policy, contact our Privacy Team at:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4915b0] underline underline-offset-2 font-semibold">{CONTACT_EMAIL}</a>
        {' '}or visit our{' '}
        <Link href="/contact" className="text-[#4915b0] underline underline-offset-2 font-semibold">Contact Page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPageContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
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
            <Link href="/terms" className="text-sm text-[#4915b0] font-semibold hover:underline">
              Read our Terms &amp; Conditions →
            </Link>
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
