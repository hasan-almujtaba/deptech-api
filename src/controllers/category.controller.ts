import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.json({ message: "Success", data: categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving categories", error });
  }
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({ message: "Success", data: category });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving category", error });
  }
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return res.json({ message: "Success", data: category });
  } catch (error) {
    return res.status(500).json({ message: "Error creating category", error });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, name, description } = req.body;

    if (!id || !name || !description) {
      return res
        .status(400)
        .json({ message: "ID, name, and description are required" });
    }

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
      },
    });

    return res.json({ message: "Success", data: category });
  } catch (error) {
    return res.status(500).json({ message: "Error updating category", error });
  }
};

export const destroy = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return res.json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting category", error });
  }
};
