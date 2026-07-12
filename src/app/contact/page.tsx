import ContactPageContent from '@/components/Contact/ContactPageContent';
import { getSiteContent, EMPTY_SITE_CONTENT } from '@/services/siteContent';
import { safeFetch } from '@/lib/utils';

export default async function ContactPage() {
  const siteContent = await safeFetch(async () => (await getSiteContent()).data, EMPTY_SITE_CONTENT);

  return <ContactPageContent contact={siteContent.contact} />;
}
