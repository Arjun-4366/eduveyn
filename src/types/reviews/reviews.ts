export interface IReview {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface IReviewPagination {
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface IReviewListResponse {
  success: boolean;
  data: {
    reviews: IReview[];
    pagination: IReviewPagination;
  };
}

export interface IReviewListParams {
  page?: number;
  limit?: number;
}

export interface IReviewPayload {
  name: string;
  rating: number;
  message: string;
}

export interface IReviewResponse {
  success: boolean;
  data: IReview;
}
