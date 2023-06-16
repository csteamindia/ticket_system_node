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
exports.DepartmentController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const ApiError_1 = require("../../core/ApiError");
class DepartmentController {
    constructor() {
        /***************** Add & update vendors **************/
        this.createDepartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                //@ts-ignore
                payload.org_id = req.org_id;
                const data = yield dbWriter.departments.create(payload);
                const department = JSON.parse(JSON.stringify(data));
                if (department) {
                    new index_1.SuccessResponse("Department Created", { department }).send(res);
                }
                else {
                    throw new Error("Error Creating Department");
                }
            }
            catch (e) {
                index_1.ApiError.handle(new index_1.BadRequestError(e.message), res);
            }
        });
        this.listDepartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbReader.departments.findAll({
                    //@ts-ignore
                    where: { org_id: req.org_id },
                });
                const departments = JSON.parse(JSON.stringify(data));
                if (departments.length) {
                    new index_1.SuccessResponse("Department found.", departments).send(res);
                }
                else {
                    throw new ApiError_1.NotFoundError("No department found.");
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        this.departmentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbReader.departments.findOne({
                    //@ts-ignore
                    where: { org_id: req.org_id, id: req.params.id },
                });
                const departments = JSON.parse(JSON.stringify(data));
                if (departments) {
                    new index_1.SuccessResponse("Department found.", departments).send(res);
                }
                else {
                    throw new ApiError_1.NotFoundError("No department found.");
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.DepartmentController = DepartmentController;
