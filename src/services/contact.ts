import { ENDPOINTS } from '@/constants/endpoints';
import { IContactMessagePayload, IContactMessageResponse } from '@/types/contact/contact';

export async function createContactMessage(payload: IContactMessagePayload): Promise<IContactMessageResponse> {
  const res = await fetch(ENDPOINTS.CREATE_CONTACT_MESSAGE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to send message: ${res.status}`);
  }

  return res.json();
}
