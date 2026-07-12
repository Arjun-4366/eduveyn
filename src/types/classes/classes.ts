export interface IClass {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IClassListResponse {
  success: boolean;
  data: IClass[];
}
