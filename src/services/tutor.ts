import { ENDPOINTS } from '@/constants/endpoints';
import { ITutorListResponse, ITutorListParams } from '@/types/tutors/tutors';

export async function getTutors(params?: ITutorListParams): Promise<ITutorListResponse> {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => value !== undefined && value !== '')
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  const res = await fetch(`${ENDPOINTS.GET_TUTORS}${query}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tutors: ${res.status}`);
  }

  return res.json();
}
