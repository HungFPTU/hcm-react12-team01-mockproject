export interface GetSessionRequest {
    searchCondition: {
        keyword: string;
        is_position_order: boolean;
        is_delete: boolean;
    };
    pageInfo: {
        pageNum: number;
        pageSize: number;
    };
}

export interface CreateSessionRequest {
    name: string,
    courseId: string,
    description: string,
    positionOrder: number
}

export interface UpdateSessionRequest {
    name: string,
    courseId: string,
    description: string,
    positionOrder: number
}