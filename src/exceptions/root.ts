

class HttpException extends Error{
    message: string;
    statusCode : number;
    errorCode: any;
    errors: any;

    constructor(message: string, statusCode: number, errorCode: any, errors: any){
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = errors
    }
    
    
}


export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003
}