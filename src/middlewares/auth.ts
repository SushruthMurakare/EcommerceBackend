import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { prisma } from "../index.ts";


export const authMiddleWare = async (req:Request, res:Response, next:NextFunction) => {

    const token = req.headers.authorization;
    if(!token){
        next(new UnAuthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED))
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any

        const user = await prisma.user.findFirst({where : {id: payload.userId}})
        
        if (!user) {
        next(new UnAuthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED))

        }

        req.user = user
        next()
    }
    catch(error){
        next(new UnAuthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED))
    }

}