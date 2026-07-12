import SubjectsPageContent from '@/components/Subjects/SubjectsPageContent';
import { getSubjects } from '@/services/subject';
import { safeFetch } from '@/lib/utils';

export default async function SubjectsPage() {
  const subjects = await safeFetch(async () => (await getSubjects()).data, []);

  return <SubjectsPageContent subjects={subjects} />;
}
