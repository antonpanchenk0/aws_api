import { Request, Response, NextFunction } from "express";

import { BaseHttpError } from "../exceptions";

const errorMiddleware = (error: BaseHttpError, req: Request, res: Response, next: NextFunction) => {
  res.statusCode = error.statusCode || 500;
  res.send({
    status: error.statusCode,
    message: error.message,
  });
}

export default errorMiddleware;
