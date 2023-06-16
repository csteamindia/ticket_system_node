"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoute = void 0;
const role_controller_1 = require("./role-controller");
const path = "/roles";
const bearerToken = require("../../middleware/bearer-token");
const access = require('../../middleware/user-access');
class RoleRoute extends role_controller_1.RoleController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.get(`${path}`, bearerToken, this.listRoles);
        router.get(`${path}/:id`, this.findRoleById);
        router.post(`${path}`, this.createRole);
    }
}
exports.RoleRoute = RoleRoute;
