export interface GetCategoryRequest {
    searchCondition: {
      keyword: string;
      is_parent: boolean;
      is_delete: boolean;
    };
    pageInfo: {
      pageNum: number;
      pageSize: number;
    };
  }
  
  export interface CreateCategoryRequest {
    name: string;
    parent_category_id: string | null;
    description: string;
  }
  
  export interface UpdateCategoryRequest {
    name: string;
    parent_category_id: string | null;
    description: string;
  }
  
  export interface GetPublicCategoryRequest {
    searchCondition: {
      keyword: string;
      is_parent: boolean;
      is_delete: boolean;
    };
    pageInfo: {
      pageNum: number;
      pageSize: number;
    };
  }
  