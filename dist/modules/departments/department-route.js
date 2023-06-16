"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRoute = void 0;
const department_controller_1 = require("./department-controller");
const path = "/departments";
const bearerToken = require("../../middleware/bearer-token");
class DepartmentRoute extends department_controller_1.DepartmentController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.get(`${path}`, bearerToken, this.listDepartment);
        router.get(`${path}/:id`, bearerToken, this.departmentById);
        router.post(`${path}`, bearerToken, this.createDepartment);
    }
}
exports.DepartmentRoute = DepartmentRoute;
