import TeacherApplicationForm from '@/components/TeacherRegister/TeacherApplicationForm';
import { getSubjects } from '@/services/subject';
import { getClasses } from '@/services/class';
import { getSyllabi } from '@/services/syllabus';
import { safeFetch } from '@/lib/utils';

export default async function TeacherRegisterPage() {
  const subjects = await safeFetch(async () => (await getSubjects()).data, []);
  const classes = await safeFetch(async () => (await getClasses()).data, []);
  const syllabi = await safeFetch(async () => (await getSyllabi()).data, []);

  return <TeacherApplicationForm subjects={subjects} classes={classes} syllabi={syllabi} />;
}
