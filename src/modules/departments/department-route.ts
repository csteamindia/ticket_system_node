import { Router } from "express";
import { DepartmentController } from "./department-controller";
const path = "/departments";
const bearerToken = require("../../middleware/bearer-token");

export class DepartmentRoute extends DepartmentController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.get(`${path}`, bearerToken, this.listDepartment);
    router.get(`${path}/:id`,bearerToken, this.departmentById);
    router.post(`${path}`,bearerToken, this.createDepartment);
  }
}
