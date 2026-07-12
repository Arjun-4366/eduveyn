import { ENDPOINTS } from '@/constants/endpoints';
import { ITutorApplicationPayload, ITutorApplicationResponse } from '@/types/tutorApplications/tutorApplications';

export async function createTutorApplication(payload: ITutorApplicationPayload): Promise<ITutorApplicationResponse> {
  const res = await fetch(ENDPOINTS.CREATE_TUTOR_APPLICATION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to submit application: ${res.status}`);
  }

  return res.json();
}
