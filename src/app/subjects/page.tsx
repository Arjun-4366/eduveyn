import type { Metadata } from 'next';
import SubjectsPageContent from '@/components/Subjects/SubjectsPageContent';
import { getSubjects } from '@/services/subject';
import { safeFetch } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Browse Subjects',
  description: 'Explore all subjects available on Eduveyn — Maths, Science, English, Coding, Social Studies, and more — and find expert online tutors for each.',
  alternates: {
    canonical: '/subjects',
  },
  openGraph: {
    url: '/subjects',
    title: 'Browse Subjects | Eduveyn',
    description: 'Explore all subjects available on Eduveyn and find expert online tutors for each.',
  },
};

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? '';

  const subjects = await safeFetch(async () => (await getSubjects({ search: search || undefined })).data, []);

  return <SubjectsPageContent subjects={subjects} initialSearch={search} />;
}
