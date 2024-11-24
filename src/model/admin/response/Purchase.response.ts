export interface Purchase {
    _id: string,
    purchase_no: string,
    status: string | undefined,
    price_paid: number,
    price: number,
    discount: number,
    cart_id: string,
    course_id: string,
    student_id: string,
    instructor_id: string,
    created_at: Date,
    is_deleted: boolean,
    cart_no: string,
    course_name: string,
    student_name: string,
    instructor_name: string
}

export interface GetPurchaseResponseData {
    _id: string,
    purchase_no: string,
    status: string | undefined,
    price_paid: number,
    price: number,
    discount: number,
    cart_id: string,
    course_id: string,
    student_id: string,
    instructor_id: string,
    created_at: Date,
    is_deleted: boolean,
    cart_no: string,
    course_name: string,
    student_name: string,
    instructor_name: string
}

export interface PageInfo {
    pageNum: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface GetPurchaseResponse {
    pageData: Purchase[];
    pageInfo: PageInfo;
}

//=====================PURCHASE LOG======================
export interface PurchaseLogResponse {
    pageData: PurchaseLogResponseData[];
    pageInfo: PageInfo;
  }
  
  export type PurchaseLogResponseData = {
    _id: string;
    purchase_no: string;
    status: string | undefined;
    price_paid: number;
    price: number;
    discount: number;
    cart_id: string;
    course_id: string;
    student_id: string;
    instructor_id: string;
    created_at: Date;
    is_deleted: boolean;
    student_name: string;
    instructor_name: string;
  };