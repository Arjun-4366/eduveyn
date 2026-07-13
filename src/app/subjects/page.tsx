import SubjectsPageContent from '@/components/Subjects/SubjectsPageContent';
import { getSubjects } from '@/services/subject';
import { safeFetch } from '@/lib/utils';

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
