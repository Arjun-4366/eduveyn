export interface ISyllabus {
  id: string;
  board: string;
  created_at: string;
  updated_at: string;
}

export interface ISyllabusListResponse {
  success: boolean;
  data: ISyllabus[];
}
