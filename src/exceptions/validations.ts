
import { HttpException, ErrorCodes } from "./root.ts";

export class UnprocessableEntity extends HttpException {
    constructor(error:any , message: string, errorCode: ErrorCodes) {
        super(message, 422, errorCode, error)
    }
}