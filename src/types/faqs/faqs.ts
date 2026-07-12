export interface IFaq {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface IFaqListResponse {
  success: boolean;
  data: IFaq[];
}
