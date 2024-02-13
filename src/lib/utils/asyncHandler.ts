import type { Request, Response, NextFunction } from "express";

// Define your asynchronous handler function
export const asyncHandler = (
  handlerFunction: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handlerFunction(req, res, next);
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  };
};
