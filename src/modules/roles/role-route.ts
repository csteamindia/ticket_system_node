import { Router } from "express";
import { RoleController } from "./role-controller";
const path = "/roles";
const bearerToken = require("../../middleware/bearer-token");
const access = require('../../middleware/user-access')
export class RoleRoute extends RoleController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.get(`${path}`, bearerToken, this.listRoles);
    router.get(`${path}/:id`, this.findRoleById);
    router.post(`${path}`, this.createRole);
  }
}
