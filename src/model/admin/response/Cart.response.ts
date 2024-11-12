import { PageInfo } from "./Sesson.resonse";



export interface CartResponse {
    _id: string;
    cart_no: string;
    status: string;
    course_id: string;
    student_id: string;
    instructor_id: string;
    is_deleted: boolean;
    created_at: Date;
    price: number;
    discount: number;
    course_name: string;
    course_video: string | "";
    course_image: string | "";
    student_name: string;
    instructor_name: string;
    price_paid: number;
}


export interface GetCartItemsResponse {
    pageData: CartResponse[];
    pageInfo: PageInfo;
}


export interface CreateCartResponse {
    _id: string;
    cart_no: string;
    status: string;
    price: number;
    discount: number;
    course_id: string;
    student_id: string;
    instructor_id: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}