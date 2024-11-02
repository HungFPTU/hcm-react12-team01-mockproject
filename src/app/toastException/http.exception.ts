import { HTTP_STATUS } from "../enums/http.status";

export class HttpException extends Error {
  constructor(
    message: string,
    public status: HTTP_STATUS,
    public error?: string
  ) {
    super(message);
  }
}
