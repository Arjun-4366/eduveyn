import { ENDPOINTS } from '@/constants/endpoints';
import { IClassListResponse } from '@/types/classes/classes';

export async function getClasses(): Promise<IClassListResponse> {
  const res = await fetch(ENDPOINTS.GET_CLASSES, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch classes: ${res.status}`);
  }

  return res.json();
}
