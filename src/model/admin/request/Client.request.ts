//=======================================GET COURSES=======================================
export interface ClientGetCoursesRequest {
  searchCondition: ClientSearchCondition;
  pageInfo: PageInfo;
}

export interface ClientSearchCondition {
  keyword: string;
  category_id: string;
  is_delete: boolean;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
}

//=======================================GET CATEGORIES=======================================


