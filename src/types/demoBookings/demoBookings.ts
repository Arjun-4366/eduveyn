import { IClass } from '@/types/classes/classes';
import { ISubjectRef } from '@/types/subjects/subjects';

export interface IDemoBooking {
  id: string;
  student_name: string;
  class: IClass;
  subject: ISubjectRef;
  parent_phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IDemoBookingPayload {
  student_name: string;
  class_id: string;
  subject_id: string;
  parent_phone: string;
}

export interface IDemoBookingResponse {
  success: boolean;
  data: IDemoBooking;
}
