import { API } from "../../const/path.api";
import { CreatePayoutRequest, GetPayoutRequest, UpdatePayoutStatusRequest } from "../../model/admin/request/Payout.request";
import { GetPurchaseRequest } from "../../model/admin/request/Purchase.request";
import { GetPayoutItemsResponse, Payout } from "../../model/admin/response/Payout.response";
import { GetPurchaseResponse } from "../../model/admin/response/Purchase.response";
import { ApiResponse } from "../../model/ApiResponse";

import { BaseService } from "../config/base.service";


export const PurchaseService = {
    getPurchaseForInstructor(params: GetPurchaseRequest) {
        return BaseService.post<ApiResponse<GetPurchaseResponse>>({
            url: API.INSTRUCTOR.GET_PURCHASE,
            payload: params
        });
    },
    getPurchaseForStudent(params: GetPurchaseRequest) {
        return BaseService.post<ApiResponse<GetPurchaseResponse>>({
            url: API.STUDENT.GET_PURCHASE,
            payload: params
        });
    },
    getPurchaseForAdmin(params: GetPurchaseRequest) {
        return BaseService.post<ApiResponse<GetPurchaseResponse>>({
            url: API.ADMIN.GET_PURCHASE,
            payload: params
        });
    },
    createPayout(params: CreatePayoutRequest) {
        return BaseService.post<ApiResponse<Payout>>({
            url: "/api/payout",
            payload: params
        });
    },
    getPayout(params: GetPayoutRequest) {
        return BaseService.post<ApiResponse<GetPayoutItemsResponse>>({
            url: "/api/payout/search",
            payload: params
        });
    },
    updatePayout(id: string, params: UpdatePayoutStatusRequest) {
        return BaseService.put<ApiResponse<any>>({
            url: `/api/payout/update-status/${id}`,
            payload: params
        });
    },
}