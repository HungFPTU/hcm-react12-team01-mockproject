export interface Purchase {
    id: string;
    purchase_no: string;
    status: PurchaseStatusEnum;
    price_paid: number;
    price: number;
    discount: number;
    cart_id: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}

export enum PurchaseStatusEnum {
    New = "new",
    RequestPaid = "request_paid",
    Completed = "completed",
}