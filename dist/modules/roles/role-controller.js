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
exports.RoleController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const rolesEnum_1 = require("../../Enum/rolesEnum");
const ApiError_1 = require("../../core/ApiError");
class RoleController {
    constructor() {
        /***************** Add & update vendors **************/
        this.createRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                payload.roles =
                    payload.roles == "admin"
                        ? rolesEnum_1.roles.admin
                        : payload.roles == "super_admin"
                            ? rolesEnum_1.roles.super_admin
                            : payload.roles == "user"
                                ? rolesEnum_1.roles.user
                                : payload.roles == "agent"
                                    ? rolesEnum_1.roles.agent
                                    : rolesEnum_1.roles.employees;
                const role = yield dbWriter.roles.create(req.body);
                const data = JSON.parse(JSON.stringify(role));
                if (data) {
                    new index_1.SuccessResponse("Role created", { role: data }).send(res);
                }
                else {
                    throw new Error("Role not created");
                }
            }
            catch (e) {
                index_1.ApiError.handle(new index_1.BadRequestError(e.message), res);
            }
        });
        this.findRoleById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const role = yield dbReader.roles.findOne({ where: { id: id } });
                if (role) {
                    new index_1.SuccessResponse("Role found", { role }).send(res);
                }
                else {
                    throw new Error("Role not found");
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        this.listRoles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield dbReader.roles.findAll();
                if (roles.length > 0) {
                    new index_1.SuccessResponse("Role found", roles).send(res);
                }
                else {
                    index_1.ApiError.handle(new ApiError_1.NotFoundError("Role not found"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.RoleController = RoleController;
