import Joi, { Schema } from 'joi';
import { NextFunction, Response, Request } from "express";

import { BadRequest } from "../exceptions";

import logger from "../../logger";

const validationMiddleware = (schema: Schema, request: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      logger.info(`[${request}] ${error.message}`);
      throw new BadRequest(error.message);
    }

    next();
  }
}

export default validationMiddleware;
