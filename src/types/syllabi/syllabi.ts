import { IClass } from '@/types/classes/classes';
import { ISubjectRef } from '@/types/subjects/subjects';

export interface ISyllabus {
  id: string;
  subject: ISubjectRef;
  class: IClass;
  board: string;
  created_at: string;
  updated_at: string;
}

export interface ISyllabusListResponse {
  success: boolean;
  data: ISyllabus[];
}
