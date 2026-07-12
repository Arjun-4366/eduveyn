import TeachersBrowser from '@/components/Teachers/TeachersBrowser';
import { getTutors } from '@/services/tutor';
import { safeFetch } from '@/lib/utils';
import { ITutorListResponse } from '@/types/tutors/tutors';

const EMPTY_RESULT: ITutorListResponse = {
  success: true,
  data: { tutors: [], pagination: { limit: 9, page: 1, total: 0, total_pages: 1 } },
};

export default async function TeachersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page) || 1;

  const result = await safeFetch(
    () => getTutors({ search: search || undefined, page, limit: 9 }),
    EMPTY_RESULT
  );

  return (
    <TeachersBrowser
      tutors={result.data.tutors}
      pagination={result.data.pagination}
      initialSearch={search}
    />
  );
}
