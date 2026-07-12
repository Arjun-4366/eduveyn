import { ENDPOINTS } from '@/constants/endpoints';
import { IDemoBookingPayload, IDemoBookingResponse } from '@/types/demoBookings/demoBookings';

export async function createDemoBooking(payload: IDemoBookingPayload): Promise<IDemoBookingResponse> {
  const res = await fetch(ENDPOINTS.CREATE_DEMO_BOOKING, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to book demo: ${res.status}`);
  }

  return res.json();
}
