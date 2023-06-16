"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../core/index");
// import { TokenValidate } from './tokenValidate';
const crypto = new index_1.Crypto();
const jwt = require("jsonwebtoken");
const EC = new index_1.ErrorController();
module.exports = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let reqHeader = req.headers.authorization;
            if (reqHeader) {
                const token = reqHeader.split(" ");
                const verified = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
                if (verified) {
                    req.org_id = verified.org_id;
                    req.role = verified.role;
                    req.user_id = verified.id;
                    return next();
                }
                else {
                    throw new Error("Invalid token");
                }
            }
            else {
                throw new Error("Token is required");
            }
        }
        catch (error) {
            // Access Denied
            index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
        }
    });
};
