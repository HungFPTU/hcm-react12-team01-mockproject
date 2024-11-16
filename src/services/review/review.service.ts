import { BaseService } from "../config/base.service";
import { API } from "../../const/path.api"
import { ApiResponse } from "../../model/ApiResponse";
import { CreateReviewRequestModel, SearchForReviewRequestModel, UpdateReviewRequestModel } from "../../model/admin/request/Review.request";
import { CreateReviewResponseModel, SearchForReviewResponseModel, UpdateReviewResponseModel, GetReviewByIdResponseModel } from "../../model/admin/response/Review.reponse";

export const ReviewService = {
  searchForReview(params: SearchForReviewRequestModel) {
    return BaseService.post<ApiResponse<SearchForReviewResponseModel>>({
      url: API.REVIEW.GET_REVIEW,
      payload: params
    });
  },
  getReviewById(id: string) {
    return BaseService.get<ApiResponse<GetReviewByIdResponseModel>>({
      url: API.REVIEW.GET_REVIEW_BY_ID.replace(":id", id)
    });
  },
  createReview(params: CreateReviewRequestModel) {
    return BaseService.post<ApiResponse<CreateReviewResponseModel>>({
      url: API.REVIEW.CREATE_REVIEW,
      payload: params
    });
  },
  updateReview(id: string, params: UpdateReviewRequestModel) {
    return BaseService.put<ApiResponse<UpdateReviewResponseModel>>({
      url: API.REVIEW.UPDATE_REVIEW.replace(":id", id),
      payload: params
    });
  },
  deleteReview(id: string) {
    return BaseService.remove<ApiResponse<string>>({
      url: API.REVIEW.DELETE_REVIEW.replace(":id", id)
    });
  }
};
