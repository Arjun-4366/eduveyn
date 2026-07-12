import { ENDPOINTS } from '@/constants/endpoints';
import { IReviewListResponse, IReviewListParams, IReviewPayload, IReviewResponse } from '@/types/reviews/reviews';

export async function getReviews(params?: IReviewListParams): Promise<IReviewListResponse> {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  const res = await fetch(`${ENDPOINTS.GET_REVIEWS}${query}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.status}`);
  }

  return res.json();
}

export async function createReview(payload: IReviewPayload): Promise<IReviewResponse> {
  const res = await fetch(ENDPOINTS.CREATE_REVIEW, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to submit review: ${res.status}`);
  }

  return res.json();
}
