import DemoBookingForm from '@/components/Demo/DemoBookingForm';
import { getClasses } from '@/services/class';
import { getSubjects } from '@/services/subject';
import { safeFetch } from '@/lib/utils';

export default async function DemoPage() {
  const classes = await safeFetch(async () => (await getClasses()).data, []);
  const subjects = await safeFetch(async () => (await getSubjects()).data, []);

  return <DemoBookingForm classes={classes} subjects={subjects} />;
}
