import { NextFunction, Request, Response } from "express";
import { APIError } from "app/domain/error";

export const errorHandler = (err: unknown, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err)
  if (err instanceof APIError) {
    res.status(500);
    res.json({ message: "internal server error" });
    return;
  }
  res.status(500);
  res.json({ message: "unexpected error" });
};
