
import { HttpException, ErrorCodes } from "./root";

export class UnAuthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, 401, errorCode, null)
    }
}