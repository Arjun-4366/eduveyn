export interface ISubjectRef {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface ISubject extends ISubjectRef {
  tutor_count: number;
}

export interface ISubjectListResponse {
  success: boolean;
  data: ISubject[];
}

export interface ISubjectListParams {
  search?: string;
}
