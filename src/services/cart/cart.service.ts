import { API } from "../../const/path.api";
import { GetCartRequest, UpdateCartRequest } from "../../model/admin/request/Cart.request";
import { CreateCartResponse, GetCartItemsResponse } from "../../model/admin/response/Cart.response";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

export const CartService = {
    getCarts(params: GetCartRequest) {
        return BaseService.post<ApiResponse<GetCartItemsResponse>>({
            url: API.CART.GET_CART,
            payload: params
        });
    },
    CreateCart(params: { course_id: string }) {
        return BaseService.post<ApiResponse<CreateCartResponse>>({
            url: API.CART.CREATE_CART,
            payload: params,
        });
    },
    UpdateStatusCart(params: UpdateCartRequest) {
        return BaseService.put<ApiResponse<any>>({
            url: API.CART.UPDATE_STATUS_CART,
            payload: params,
        });
    },
    DeleteCart(id: string) {
        return BaseService.remove<ApiResponse<any>>({
            url: API.CART.DELETE_CART.replace(":id", id),
        });
    },

}