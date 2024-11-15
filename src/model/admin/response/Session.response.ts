export interface Session {
    _id: string;
    name: string;
    user_id: string;
    course_id: string;
    description: string;
    position_order: number;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    lesson_count: number;
}

export interface PageInfo {
    pageNum: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface GetSessionsResponse {
    pageData: GetSessionResponsePageData[];
    pageInfo: PageInfo;
}

export type GetSessionResponsePageData = {
    _id: string;
    name: string;
    user_id: string;
    course_id: string;
    description: string;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    position_order: number;
    lesson_count: number;
};

export interface GetSessionResponsePublic {
    pageData: Session;
    pageInfo: PageInfo;
}

export interface CreateSessionResponse {
    _id: string,
    name: string,
    user_id: string,
    course_id: string,
    description: string | null,
    is_deleted: boolean,
    created_at: Date;
    updated_at: Date;
    position_order: number;
    lesson_count: number;
}

export interface UpdateSessionResponse {
    _id: string,
    name: string,
    user_id: string,
    course_id: string,
    description: string | null,
    is_deleted: boolean,
    created_at: Date;
    updated_at: Date;
    position_order: number;
    lesson_count: number;
}
