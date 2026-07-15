import type { Metadata } from 'next';
import DemoBookingForm from '@/components/Demo/DemoBookingForm';
import { getClasses } from '@/services/class';
import { getSubjects } from '@/services/subject';
import { safeFetch } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Book a Free Demo Class',
  description: "Book a free, no-obligation online demo class with a verified Eduveyn tutor. Choose your child's grade and subject and get started in minutes.",
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    url: '/demo',
    title: 'Book a Free Demo Class | Eduveyn',
    description: 'Book a free online demo class with a verified Eduveyn tutor.',
  },
  twitter: {
    title: 'Book a Free Demo Class | Eduveyn',
    description: 'Book a free online demo class with a verified Eduveyn tutor.',
  },
};

export default async function DemoPage() {
  const classes = await safeFetch(async () => (await getClasses()).data, []);
  const subjects = await safeFetch(async () => (await getSubjects()).data, []);

  return <DemoBookingForm classes={classes} subjects={subjects} />;
}
