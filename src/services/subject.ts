import { ENDPOINTS } from '@/constants/endpoints';
import { ISubjectListResponse, ISubjectListParams } from '@/types/subjects/subjects';

export async function getSubjects(params?: ISubjectListParams): Promise<ISubjectListResponse> {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  const res = await fetch(`${ENDPOINTS.GET_SUBJECTS}${query}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch subjects: ${res.status}`);
  }

  return res.json();
}
