export interface GetPurchaseRequest {
    searchCondition: SearchCondition;
    pageInfo: PageInfo;
}

export interface SearchCondition {
    purchase_no: string;
    cart_no: string;
    course_id: string;
    status: string;
    is_delete: boolean;
}

export interface PageInfo {
    pageNum: number;
    pageSize: number;
}

//==================CLIENT PUBLIC=======================

export interface GetPublicPurchaseRequest {
    searchCondition: SearchCondition;
    pageInfo: PageInfo;
  }
  
  //===========PURCHASE LOG================================
  export interface SearchConditionLog {
    purchase_no: string;
    cart_no: string;
    course_id: string;
    status: string | undefined;
    is_delete: boolean;
  }
  
  export interface GetPurchaseLogRequest {
    searchCondition: SearchConditionLog;
    pageInfo: PageInfo;
  }
  