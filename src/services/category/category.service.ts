import { BaseService } from "../config/base.service";
import { API } from "../../const/path.api";
import { ApiResponse } from "../../model/ApiResponse";
//request
import { GetCategoryRequest,CreateCategoryRequest,GetPublicCategoryRequest,UpdateCategoryRequest } from "../../model/admin/request/Category.request";
//response
import { Category,GetCategoryResponse,CreateCategoryResponse,GetCategoryResponsePublic,UpdateCategoryResponse } from "../../model/admin/response/Category.response";

export const CategoryService = {
    getCategory(params: GetCategoryRequest) {
        return BaseService.post<ApiResponse<GetCategoryResponse>>({
            url: API.ADMIN.GET_CATEGORIES,
            payload: params
        });
    },
    createCategory(params: CreateCategoryRequest) {
        return BaseService.post<ApiResponse<CreateCategoryResponse>>({
          url: API.ADMIN.CREATE_CATEGORY,
          payload: params
        });
      },
      deleteCategory(id: string) {
        return BaseService.remove<ApiResponse<GetCategoryResponse>>({
          url: API.ADMIN.DELETE_CATEGORY.replace(":id", id)
        });
      },
      updateCategory(id: string, params: UpdateCategoryRequest) {
        return BaseService.put<ApiResponse<UpdateCategoryResponse>>({
          url: API.ADMIN.UPDATE_CATEGORY.replace(":id", id),
          payload: params
        });
      },
      getCategoryDetails(_id: string) {
        return BaseService.get<ApiResponse<Category>>({
          url: API.ADMIN.GET_CATEGORY.replace(":id", _id)
        });
      },


      getPublicCategory(params: GetPublicCategoryRequest) {
        return BaseService.post<ApiResponse<GetCategoryResponsePublic>>({
          url: API.COMMON.PUBLIC_CATEGORY,
          payload: params
        })
    }
      
}