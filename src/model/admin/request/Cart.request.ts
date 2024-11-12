export interface GetCartRequest {
    searchCondition: {
        status: string;
        is_delete: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };
}


export interface ItemUpdateCartRequest {
    _id: string;
    cart_no: string;
}

export interface UpdateCartRequest {
    status: string;
    items: {
        _id: string;
        cart_no: string;
    }[];
}