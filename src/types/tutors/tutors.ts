export interface ITutorSubject {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ITutor {
  id: string;
  name: string;
  profile_image: string;
  experience: string;
  subjects: ITutorSubject[];
  performance_score: number;
  created_at: string;
}

export interface ITutorPagination {
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface ITutorListResponse {
  success: boolean;
  data: {
    tutors: ITutor[];
    pagination: ITutorPagination;
  };
}

export interface ITutorListParams {
  search?: string;
  subject_id?: string;
  page?: number;
  limit?: number;
}
