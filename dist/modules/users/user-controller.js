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
exports.UserController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const bcrypt_1 = require("bcrypt");
const accessLevel_1 = require("../../Enum/accessLevel");
const jwt = require("jsonwebtoken");
class UserController {
    constructor() {
        /***************** Add & update vendors **************/
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const user = yield dbReader.users.findOne({
                    where: { email: payload.email },
                });
                if (user) {
                    throw new Error("User exist");
                }
                else {
                    const hashedPassword = yield (0, bcrypt_1.hash)(payload.password, 10);
                    payload.password = hashedPassword;
                    const data = yield dbWriter.users.create(Object.assign({}, payload));
                    const user = JSON.parse(JSON.stringify(data));
                    if (user) {
                        let userAccess = yield dbWriter.privileges.create({
                            user_id: user.id,
                            privileges: JSON.stringify(payload.privileges),
                            created_at: new Date(),
                        });
                        userAccess = JSON.parse(JSON.stringify(userAccess));
                        if (userAccess) {
                            let accessData = JSON.parse(userAccess.privileges);
                            accessData.map((data, index) => {
                                let accessArray = [];
                                data.access_level.forEach((element) => {
                                    accessArray.push(accessLevel_1.AccessLevel[element]);
                                });
                                accessData[index].access_level = accessArray;
                            });
                            user.privileges = accessData;
                        }
                        new index_1.SuccessResponse("User Created", { user }).send(res);
                    }
                    else {
                        throw new Error("User not created");
                    }
                }
            }
            catch (e) {
                index_1.ApiError.handle(new index_1.BadRequestError(e.message), res);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const data = yield dbReader.users.findOne({
                    where: { email: payload.email },
                });
                const user = JSON.parse(JSON.stringify(data));
                if (user) {
                    let accessLevel = yield dbReader.privileges.findOne({
                        where: { user_id: user.id },
                    });
                    const isMatch = yield (0, bcrypt_1.compare)(payload.password, user.password);
                    if (isMatch) {
                        accessLevel = JSON.parse(JSON.stringify(accessLevel));
                        let privileges = JSON.parse(accessLevel.privileges);
                        console.log(privileges);
                        privileges.map((data) => {
                            console.log("data -->", JSON.stringify(data));
                            console.log("body", JSON.stringify(req.body.permission));
                            if (JSON.stringify(data) === JSON.stringify(req.body.permission)) {
                                console.log("yes");
                                return true;
                            }
                            else {
                                throw new Error("You are not authorized to perform this action.");
                            }
                        });
                        const userLogs = yield dbWriter.user_logs.create({
                            user_id: user.id,
                            is_login: 1,
                            date: new Date(),
                        });
                        console.log(userLogs);
                        const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
                        return new index_1.SuccessResponse("User Login", {
                            user,
                            token: token,
                        }).send(res);
                    }
                    else {
                        throw new Error("Invalid Password");
                    }
                }
                else {
                    throw new Error("User not found");
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const logout = yield dbWriter.user_logs.create({
                    //@ts-ignore
                    user_id: req.user.id,
                    is_login: 0,
                    date: new Date(),
                });
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        this.menus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("access -->", accessLevel_1.AccessLevel[1]);
                let menus = [
                    { id: 1, title: "Ticket" },
                    { id: 2, title: "Department" },
                    { id: 3, title: "Organization" },
                    { id: 4, title: "Reports" },
                ];
                // menus = JSON.parse(JSON.stringify(menus));
                new index_1.SuccessResponse("Data fetched successfully", menus).send(res);
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.UserController = UserController;
