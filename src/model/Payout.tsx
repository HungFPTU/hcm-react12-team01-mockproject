export interface Payout {
    id: string;
    payout_no: string;
    status: PayoutStatusEnum;
    instructor_id: string;
    instructor_ratio: number;
    balance_origin: number;
    balance_instructor_paid: number;
    balance_instructor_received: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}

export enum PayoutStatusEnum {
    New = "new",
    RequestPayout = "request_payout",
    Completed = "completed",
    Rejected = "rejected",
}