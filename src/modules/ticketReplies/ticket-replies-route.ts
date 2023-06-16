import { Router } from "express";
import { TicketRepliesController } from "./ticker-replies-controller";
const bearerToken = require("../../middleware/bearer-token");
const path = "/replies/tickets";

export class TicketRepliesRoute extends TicketRepliesController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}`, bearerToken, this.saveRepliedTicket);
    router.get(`${path}`, bearerToken, this.getAllRepliedTickets);
    router.get(`${path}/userRepliedTicket`,
      bearerToken,
      this.getUserRepliesTicket
    );
  }
}
