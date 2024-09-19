import { Request } from "express";
interface User {
  _id: string;
  name: String;
  email: String;
}

declare global {
    namespace Express {
      interface Request {
        user: User
      }
    }
  }