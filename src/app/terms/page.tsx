import type { Metadata } from 'next';
import TermsPageContent from '@/components/Legal/TermsPageContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read the Terms and Conditions governing your use of Eduveyn — the personalized online tutoring platform connecting students with verified expert tutors.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
