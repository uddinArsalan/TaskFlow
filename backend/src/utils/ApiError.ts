export class ApiError extends Error {
    statusCode: number;
    errors: string[];
    isOperational: boolean;
  
    constructor(statusCode: number, message: string, errors: string[] = [], isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }