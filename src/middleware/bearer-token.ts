import {
  BadRequestError,
  ApiError,
  Crypto,
  ErrorController,
  SuccessResponse,
} from "../core/index";
import { Request, Response, NextFunction } from "express";
// import { TokenValidate } from './tokenValidate';
const crypto = new Crypto();
const jwt = require("jsonwebtoken");
const EC = new ErrorController();
// const TV = new TokenValidate();

export interface AppRequest extends Request {
  authorization: string;
  org_id: string;
  role: string;
  user_id: string;
}

module.exports = async function (
  req: AppRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let reqHeader: any = req.headers.authorization;
    if (reqHeader) {
      const token = reqHeader.split(" ");
      const verified = jwt.verify(token[1], process.env.JWT_SECRET_KEY);

      if (verified) {
        req.org_id = verified.org_id;
        req.role = verified.role;
        req.user_id = verified.id;
        return next();
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("Token is required");
    }
  } catch (error: any) {
    // Access Denied
    ApiError.handle(new BadRequestError(error.message), res);
  }


};

