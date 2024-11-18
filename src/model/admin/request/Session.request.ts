export interface SearchCondition {
    keyword: string;
    is_position_order: boolean;
    is_delete: boolean;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
}

export interface GetSessionRequest {
    searchCondition: SearchCondition;   
    pageInfo: PageInfo;
}
export interface SessionRequestModel {
    searchCondition: {
      keyword: string;
      course_id: string;
      is_position_order: boolean;
      is_delete: boolean;
    };
    pageInfo: {
      pageNum: number;
      pageSize: number;
    };
  }
  
  export interface CreateSessionRequestModel {
    name: string;
    course_id: string;
    position_order: number;
    description: string;
  }
  

export interface CreateSessionRequest {
    name: string,
    course_id: string,
    description: string,
    positionOrder: number
}
export interface UpdateSessionRequest {
    name: string,
    course_id: string,
    description: string,
    positionOrder: number
}