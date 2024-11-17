export interface GetPayoutRequest {
    searchCondition: {
        payout_no: string;
        instructor_id: string;
        status: string;
        is_delete: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };
}

export interface CreatePayoutRequest {
    instructor_id: string;
    transactions: { purchase_id: string }[];
}

export interface UpdatePayoutStatusRequest {
    status: string;
    comment: string;
}
