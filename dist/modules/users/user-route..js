"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const user_controller_1 = require("./user-controller");
const path = "/";
class UserRoute extends user_controller_1.UserController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`/signup`, this.signUp);
        router.post(`/login`, this.login);
        router.get("/menus", this.menus);
        // router.post(`/logout`, this.createRole);
    }
}
exports.UserRoute = UserRoute;
