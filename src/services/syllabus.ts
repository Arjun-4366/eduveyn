import { ENDPOINTS } from '@/constants/endpoints';
import { ISyllabusListResponse } from '@/types/syllabi/syllabi';

export async function getSyllabi(): Promise<ISyllabusListResponse> {
  const res = await fetch(ENDPOINTS.GET_SYLLABI, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch syllabi: ${res.status}`);
  }

  return res.json();
}
