import type { Metadata } from 'next';
import TeacherApplicationForm from '@/components/TeacherRegister/TeacherApplicationForm';
import { getSubjects } from '@/services/subject';
import { getClasses } from '@/services/class';
import { getSyllabi } from '@/services/syllabus';
import { safeFetch } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Become a Tutor',
  description: 'Join Eduveyn as an online tutor. Teach students one-on-one, set your own schedule, and earn on your terms. Apply in minutes.',
  alternates: {
    canonical: '/register/teacher',
  },
  openGraph: {
    url: '/register/teacher',
    title: 'Become a Tutor | Eduveyn',
    description: 'Join Eduveyn as an online tutor and teach students one-on-one, on your own schedule.',
  },
  twitter: {
    title: 'Become a Tutor | Eduveyn',
    description: 'Join Eduveyn as an online tutor and teach students one-on-one, on your own schedule.',
  },
};

export default async function TeacherRegisterPage() {
  const subjects = await safeFetch(async () => (await getSubjects()).data, []);
  const classes = await safeFetch(async () => (await getClasses()).data, []);
  const syllabi = await safeFetch(async () => (await getSyllabi()).data, []);

  return <TeacherApplicationForm subjects={subjects} classes={classes} syllabi={syllabi} />;
}
