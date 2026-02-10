
import { HttpException, ErrorCodes } from "./root";

export class InternalException extends HttpException {
    constructor(error:any , message: string, errorCode: ErrorCodes) {
        super(message, 500, errorCode, error)
    }
}