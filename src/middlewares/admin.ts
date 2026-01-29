import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import { UnAuthorizedException } from "../exceptions/unauthorized";


export const adminMiddleWare = async (req:Request, res:Response, next:NextFunction) => {

    const user = req.user;
    if (user.role == "ADMIN"){
        next()

    }
    else {
        next(new UnAuthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED))
    }

}