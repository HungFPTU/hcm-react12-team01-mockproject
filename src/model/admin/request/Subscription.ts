export interface SearchCondition {
    keyword: string;
    is_delete: boolean;
  }
  
  export interface PageInfo {
    pageNum: number;
    pageSize: number;
  }
export interface GetPublicSubscriptionRequest {
    searchCondition: SearchCondition;
    pageInfo: PageInfo;
  }
