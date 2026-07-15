import type { Metadata } from 'next';
import ContactPageContent from '@/components/Contact/ContactPageContent';
import { getSiteContent, EMPTY_SITE_CONTENT } from '@/services/siteContent';
import { safeFetch } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Eduveyn by WhatsApp, email, or phone for questions about online tutoring, booking a free demo class, or becoming a tutor.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
    title: 'Contact Eduveyn',
    description: 'Get in touch with Eduveyn by WhatsApp, email, or phone.',
  },
  twitter: {
    title: 'Contact Eduveyn',
    description: 'Get in touch with Eduveyn by WhatsApp, email, or phone.',
  },
};

export default async function ContactPage() {
  const siteContent = await safeFetch(async () => (await getSiteContent()).data, EMPTY_SITE_CONTENT);

  return <ContactPageContent contact={siteContent.contact} />;
}
