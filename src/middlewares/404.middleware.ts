import { Request, Response } from "express";

export default (req: Request, res: Response): void => {
  res.status(404).json({ message: "404 Not Found" });
};
