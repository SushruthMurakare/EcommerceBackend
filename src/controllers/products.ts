import { NextFunction, Request, Response } from "express";
import { prisma } from "../index.ts";
import { ProductsSchema } from "../schema/products.js";
import { BadRequestsException } from "../exceptions/bad-requests.js";
import { ErrorCodes } from "../exceptions/root.js";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  ProductsSchema.parse(req.body);

  const productCreate = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.json(productCreate);
};

export const listProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return next(
      new BadRequestsException(
        "Product ID must be a number",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }

  if (productId) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (product) {
    const { name, description, price, tags } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          price: Number(price),
          tags,
        },
      });

      res.json(updatedProduct);
    } else {
      next(
        new BadRequestsException(
          `Product with id ${productId} is not present`,
          ErrorCodes.INTERNAL_EXCEPTION,
        ),
      );
    }
  } else {
    next(
      new BadRequestsException(
        "Please provide the ID",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return next(
      new BadRequestsException(
        "Product ID must be a number",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
  if (productId) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    res.json(product);
  } else {
    next(
      new BadRequestsException(
        "Please provide the ID",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productId = Number(req.params.id);

  if (isNaN(productId)) {
    return next(
      new BadRequestsException(
        "Product ID must be a number",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
  if (productId) {
    const product = await prisma.product.delete({
      where: { id: productId },
    });
    res.json(product);
  } else {
    next(
      new BadRequestsException(
        "Please provide the ID",
        ErrorCodes.INTERNAL_EXCEPTION,
      ),
    );
  }
};
