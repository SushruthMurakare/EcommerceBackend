
import type { Request, Response } from "express";
import { prisma } from "../index.ts";
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets.ts";


export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    throw Error("User already exists, please login");
  }

  const userCreate = await prisma.user.create({
    data: {
      name: username,
      email: email,
      password: hashSync(password,10),
    },
  });
  res.send(userCreate);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

   if (!user) {
    throw Error("User does not exists, please login");
  }

  if(!compareSync(password, user?.password)){
    throw Error("Information does not match")
  }
  else {
    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET)
    res.send({user, token})
  }

};
