import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { unlink } from "fs";
import path from "path";

const prisma = new PrismaClient({});

export const index = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    res.json({ message: "Success", data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving products", error });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Success", data: product });
  } catch (error) {}
};

export const store = async (req: Request, res: Response) => {
  try {
    const filename = req.file?.filename;

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        image: filename,
        Category: {
          connect: {
            id: Number(req.body.categoryId),
          },
        },
      },
    });

    res.json({ message: "Success", data: product });
  } catch (error) {
    return res.status(500).json({ message: "Error creating product", error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    let filename = product?.image;

    if (req.file) {
      filename = req.file.filename;
      const oldFilePath = path.join(
        process.cwd(),
        "/public/uploads",
        product?.image ?? ""
      );

      unlink(oldFilePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${oldFilePath}:`, err);
        }
      });
    }

    await prisma.product.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        image: filename,
      },
    });

    res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating product", error });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If the product exists, proceed to delete it
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
