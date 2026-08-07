import { ENDPOINTS } from '@/constants/endpoints';
import { ITutorApplicationPayload, ITutorApplicationResponse } from '@/types/tutorApplications/tutorApplications';

export async function createTutorApplication(payload: ITutorApplicationPayload): Promise<ITutorApplicationResponse> {
  const formData = new FormData();
  formData.append('full_name', payload.full_name);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  formData.append('location', payload.location);
  payload.subject_ids.forEach((id) => formData.append('subject_ids', id));
  payload.class_ids.forEach((id) => formData.append('class_ids', id));
  payload.syllabus_ids.forEach((id) => formData.append('syllabus_ids', id));
  formData.append('experience', payload.experience);
  formData.append('bio', payload.bio);
  formData.append('resume', payload.resume);

  const res = await fetch(ENDPOINTS.CREATE_TUTOR_APPLICATION, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Failed to submit application: ${res.status}`);
  }

  return res.json();
}
