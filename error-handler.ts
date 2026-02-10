import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpException } from "./src/exceptions/root";
import { InternalException } from "./src/exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestsException } from "./src/exceptions/bad-requests";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestsException(
            "Something went wrong",
            ErrorCodes.UNPROCESSABLE_ENTITY
          );
        }
        else {

        exception = new InternalException(
          "Something went wrong",
          error,
          ErrorCodes.INTERNAL_EXCEPTION,
        );
      }
      }
      next(exception);
    }
  };
};
