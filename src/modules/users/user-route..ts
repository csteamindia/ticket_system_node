import { Router } from "express";
import { UserController } from "./user-controller";
const path = "/";


export class UserRoute extends UserController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`/signup`, this.signUp);
    router.post(`/login`, this.login);
    router.get("/menus",this.menus)
    // router.post(`/logout`, this.createRole);
  }
}
