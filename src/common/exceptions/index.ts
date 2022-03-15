export class BaseHttpError {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class BadRequest extends BaseHttpError {
  constructor (message: string) {
    super(400, message);
  }
}

export class InternalError extends BaseHttpError {
  constructor (message: string) {
    super(500, message);
  }
}
