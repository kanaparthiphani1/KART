import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../expections/not-found";
import { ErrorCodes } from "../expections/root";
import { Product } from "@prisma/client";
import { prismaClient } from "..";
import { UnauthorizedException } from "../expections/unauthorized";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (err) {
    throw new NotFoundException(
      "Product not found!",
      ErrorCodes.PRODUCT_NOT_FOUND
    );
  }

  const isPresent = await prismaClient.cartItem.findFirst({
    where: {
      //@ts-ignore
      userId: req.user.id,
      productId: validatedData.productId,
    },
  });

  if (isPresent) {
    const updatedCart = await prismaClient.cartItem.update({
      where: {
        id: isPresent.id,
      },
      data: {
        quantity: isPresent.quantity + validatedData.quantity,
      },
    });
    res.json(updatedCart);
    return;
  }

  const cart = await prismaClient.cartItem.create({
    data: {
      //@ts-ignore
      userId: req.user.id,
      productId: product.id,
      quantity: validatedData.quantity,
    },
  });
  res.json(cart);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  try {
    await prismaClient.cartItem.findFirstOrThrow({
      where: {
        id: +req.params.id,
        //@ts-ignore
        userId: req.user.id,
      },
    });
  } catch (err) {
    throw new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED);
  }
  await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ success: true });
};

export const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body);
  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
