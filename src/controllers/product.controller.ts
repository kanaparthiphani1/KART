import { prismaClient } from "..";
import { Request, Response } from "express";
import { NotFoundException } from "../expections/not-found";
import { ErrorCodes } from "../expections/root";

export const createProduct = async (req: Request, res: Response) => {
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  return res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }
    const updateProduct = await prismaClient.product.update({
      where: {
        id: +req.params.id,
      },
      data: product,
    });
    res.json(updateProduct);
  } catch (err) {
    throw new NotFoundException(
      "Product not found.",
      ErrorCodes.PRODUCT_NOT_FOUND
    );
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await prismaClient.product.delete({
    where: {
      id: +req.params.id,
    },
  });
  return res.json(product);
};

export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: req.query.skip ? +req.query.skip : 0,
    take: 5,
  });
  res.json({
    count,
    data: products,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    console.log(err);
    throw new NotFoundException(
      "Product not found.",
      ErrorCodes.PRODUCT_NOT_FOUND
    );
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const products = await prismaClient.product.findMany({
    skip: req.query.skip ? +req.query.skip : 0,
    take: 5,
    where: {
      name: {
        search: req.query.q?.toString(),
      },
      description: {
        search: req.query.q?.toString(),
      },
      tags: {
        search: req.query.q?.toString(),
      },
    },
  });
  res.json(products);
};
