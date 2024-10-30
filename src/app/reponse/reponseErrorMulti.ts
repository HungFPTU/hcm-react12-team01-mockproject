import { MultiError } from "./multiError";
export interface ReponseErrorMulti<T>{
    success: boolean;
    message: string;
    errors?: T|MultiError;
}