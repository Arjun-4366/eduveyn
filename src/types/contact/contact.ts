export interface IContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'replied';
  created_at: string;
  updated_at: string;
}

export interface IContactMessagePayload {
  name: string;
  email: string;
  message: string;
}

export interface IContactMessageResponse {
  success: boolean;
  data: IContactMessage;
}
