import { IClass } from '@/types/classes/classes';
import { ISubjectRef } from '@/types/subjects/subjects';
import { ISyllabus } from '@/types/syllabi/syllabi';

export interface ITutorApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  subjects: ISubjectRef[];
  classes: IClass[];
  syllabus: ISyllabus[];
  experience: string;
  bio: string;
  resume_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ITutorApplicationPayload {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  subject_ids: string[];
  class_ids: string[];
  syllabus_ids: string[];
  experience: string;
  bio: string;
  resume: File;
}

export interface ITutorApplicationResponse {
  success: boolean;
  data: ITutorApplication;
}
