
import { HttpException, ErrorCodes } from "./root.ts";

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, 404, errorCode, null)
    }
}