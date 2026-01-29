import type { NextFunction, Request, Response } from "express";
import { prisma } from "../index.ts";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.ts";
import { BadRequestsException } from "../exceptions/bad-requests.ts";
import { ErrorCodes } from "../exceptions/root.js";
import { SignUpSchema } from "../schema/users.js";
import { UnprocessableEntity } from "../exceptions/validations.ts";
import { NotFoundException } from "../exceptions/not-found.ts";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    SignUpSchema.parse(req.body);
    const { username, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      next(
        new BadRequestsException(
          "User already exists, please login",
          ErrorCodes.USER_ALREADY_EXISTS,
        ),
      );
    }

    const userCreate = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashSync(password, 10),
      },
    });
    res.json(userCreate);
  } catch (error : any) {
    next(
      new UnprocessableEntity(
        error.issues,
        "Unprocessable entity",
        ErrorCodes.UNPROCESSABLE_ENTITY,
      ),
    );
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
     next(
        new NotFoundException(
          "User not found, please signup",
          ErrorCodes.USER_NOT_FOUND,
        ),
      );
  }

  if (!compareSync(password, user?.password)) {
     next(
        new BadRequestsException(
          "Information does not match",
          ErrorCodes.USER_ALREADY_EXISTS,
        ),
      );
  } else {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
    );
    res.send({ user, token });
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
   res.json(req.user)
}
