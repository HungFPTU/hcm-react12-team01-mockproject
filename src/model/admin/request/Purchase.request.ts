export interface GetPurchaseRequest {
    searchCondition: {
        purchase_no: string;
        cart_no: string;
        course_id: string;
        status: string;
        is_delete: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };
}
