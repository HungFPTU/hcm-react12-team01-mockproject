import { PageInfo } from "./Sesson.resonse"


export interface Payout {
    payout_no: string
    status: string
    transactions: {
        price: number
        discount: number
        price_paid: number
        purchase_id: string
        _id: string
        created_at: Date
    }[]
    instructor_id: string
    instructor_ratio: number
    balance_origin: number
    balance_instructor_paid: number
    balance_instructor_received: number
    is_deleted: boolean
    _id: string
    created_at: Date
    updated_at: Date
}

export interface GetPayoutItemsResponse {
    pageData: Payout[];
    pageInfo: PageInfo;
}



