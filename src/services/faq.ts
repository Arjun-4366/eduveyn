import { ENDPOINTS } from '@/constants/endpoints';
import { IFaqListResponse } from '@/types/faqs/faqs';

export async function getFaqs(): Promise<IFaqListResponse> {
  const res = await fetch(ENDPOINTS.GET_FAQS, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch FAQs: ${res.status}`);
  }

  return res.json();
}
