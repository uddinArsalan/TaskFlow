import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/constants";

interface DecodedTokenType extends jwt.JwtPayload {
  _id: string;
  name? : string;
  email? : string;
}

export const verifyAccessToken = (token: string) => {
  return new Promise<DecodedTokenType>((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, {}, (err, token) => {
      if (err) {
        reject(err);
      } else if (token && typeof token !== "string") {
        resolve(token as DecodedTokenType);
      } else {
        reject(new Error("Token is undefined"));
      }
    });
  });
};

export const verifyRefreshToken = (token: string) => {
  return new Promise<DecodedTokenType>((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, {}, (err, token) => {
      if (err) {
        reject(err);
      } else if (token && typeof token !== "string") {
        resolve(token as DecodedTokenType);
      } else {
        reject(new Error("Token is undefined"));
      }
    });
  });
};