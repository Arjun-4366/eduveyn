import type { Metadata } from 'next';
import PrivacyPageContent from '@/components/Legal/PrivacyPageContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Eduveyn collects, uses, and protects the personal information of students, parents, and tutors on our personalized online tutoring platform.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
