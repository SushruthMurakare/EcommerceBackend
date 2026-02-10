
import { HttpException, ErrorCodes } from "./root";

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, 400, errorCode, null)
    }
}