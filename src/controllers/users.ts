import { NextFunction, Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { prisma } from "../index";
import { Address, User } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { BadRequestsException } from "../exceptions/bad-requests";
import { UnAuthorizedException } from "../exceptions/unauthorized";

export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
   if (!req.user) {
    return next(
      new UnAuthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
    );
  }
  AddressSchema.parse(req.body);
  console.log({ req: req.user });
  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });

  res.json(address);
};

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const addressId = Number(req.params.id);

  if (isNaN(addressId)) {
    return next(
      new BadRequestsException(
        "Address ID must be a number",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
  if (addressId) {
    const address = await prisma.address.delete({
      where: { id: addressId },
    });
    res.json(address);
  } else {
    next(
      new BadRequestsException(
        "Please provide the ID",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prisma.address.findMany();
  res.json(addresses);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(
      new UnAuthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
    );
  }
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prisma.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
      if (shippingAddress.userId != req.user.id) {
        throw new BadRequestsException(
          "Address does not belong to user",
          ErrorCodes.ADDRESS_DOES_NOT_BELONG,
        );
      }
    } catch (error) {
      next(
        new NotFoundException(
          "Address not found",
          ErrorCodes.INTERNAL_EXCEPTION,
        ),
      );
    }
  }
  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prisma.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
      if (billingAddress.userId != req.user.id) {
        throw new BadRequestsException(
          "Address does not belong to user",
          ErrorCodes.ADDRESS_DOES_NOT_BELONG,
        );
      }
    } catch (error) {
      next(
        new NotFoundException(
          "Address not found",
          ErrorCodes.INTERNAL_EXCEPTION,
        ),
      );
    }
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: validatedData,
  });
  res.json(updatedUser);
};
