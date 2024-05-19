import { Request, Response } from "express";
import { prismaClient } from "..";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { NotFoundException } from "../expections/not-found";
import { ErrorCodes } from "../expections/root";
import { Address } from "@prisma/client";
import { BadRequestException } from "../expections/bad-request";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      //@ts-ignore
      userId: +req.user.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    throw new NotFoundException(
      "Address not found.",
      ErrorCodes.ADDRESS_NOT_FOUND
    );
  }
};

export const listAddress = async (req: Request, res: Response) => {
  //@ts-ignore
  console.log("User in contr : ", req.user);

  const addresses = await prismaClient.address.findMany({
    where: {
      //@ts-ignore
      userId: req.user.id,
    },
  });

  console.log("printed");

  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  console.log(validatedData);
  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address not found.",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
    //@ts-ignore
    if (shippingAddress.userId != req.user.id) {
      throw new BadRequestException(
        "Address does not belong to user",
        ErrorCodes.ADDRESS_DOES_NOT_BELONG
      );
    }
  }

  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address not found.",
        ErrorCodes.ADDRESS_NOT_FOUND
      );
    }
    //@ts-ignore
    if (billingAddress.userId != req.user.id) {
      throw new BadRequestException(
        "Address does not belong to user",
        ErrorCodes.ADDRESS_DOES_NOT_BELONG
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      //@ts-ignore
      id: req.user.id,
    },
    data: validatedData,
  });
  res.json(updatedUser);
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await prismaClient.user.findMany({
    skip: req.query.skip ? +req.query.skip : 0,
    take: 5,
  });
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
      include: {
        addresses: true,
      },
    });
    res.json(user);
  } catch (err) {
    throw new NotFoundException("User not found.", ErrorCodes.USER_NOT_FOUND);
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        role: req.body.role,
      },
    });
    res.json(user);
  } catch (err) {
    throw new NotFoundException("User not found.", ErrorCodes.USER_NOT_FOUND);
  }
};
