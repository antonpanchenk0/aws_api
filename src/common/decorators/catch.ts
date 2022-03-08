import { Request, Response, NextFunction } from "express";

function TryCatchWrapper (target: Object, key: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originMethod = descriptor.value;

  descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await originMethod.apply(this, [req, res, next]);
    } catch (error) {
      next(error);
    }
  }

  return descriptor;
}

export default TryCatchWrapper;
