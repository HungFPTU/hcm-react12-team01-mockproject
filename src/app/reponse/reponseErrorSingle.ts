export interface ReponseErrorSingle<T>{
    success: boolean;
    message: string;
    error: T;
}