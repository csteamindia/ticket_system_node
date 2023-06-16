import { Router } from "express";
import { TicketSettingsController } from "./ticket-setting-controller";
const bearerToken = require("../../middleware/bearer-token");
const path = "/ticket/settings";

export class TicketSettingsRoute extends TicketSettingsController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}`, this.saveTicketSettings);
    router.get(`${path}`, this.getAllTicketSettings);
  }
}
