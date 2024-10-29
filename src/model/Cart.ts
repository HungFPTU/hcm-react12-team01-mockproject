export enum CartStatusEnum {
    New = "New",
    WaitingPaid = "WaitingPaid",
    Cancel = "Cancel",
    Completed = "Completed",
  }

export interface Cart {
    id: string;
    cart_no: string;
    status: CartStatusEnum;
    price_paid: number;
    price: number;
    discount: number;
    course_id: string;
    student_id: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}