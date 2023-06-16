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
exports.AuthController = void 0;
const index_1 = require("../../core/index");
const { dbReader } = require('../../db');
const jwt = require('jsonwebtoken');
const crypto = new index_1.Crypto();
const EC = new index_1.ErrorController;
class AuthController {
    constructor() {
        /***************** user login **************/
        this._login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { password, email } = req.body;
                password = crypto.encrypt(password, true).toString();
                const data = yield dbReader.users.findOne({
                    attributes: [['id', 'user_id'], 'email', 'org_id', 'role'],
                    where: { email: email, password: password },
                    raw: true
                });
                if (data) {
                    const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
                    new index_1.SuccessResponse(EC.DataFetched, (Object.assign(Object.assign({}, data), { token }))).send(res);
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("invalid login"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.AuthController = AuthController;
