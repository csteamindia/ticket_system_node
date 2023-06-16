"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepliesRoute = void 0;
const ticker_replies_controller_1 = require("./ticker-replies-controller");
const bearerToken = require("../../middleware/bearer-token");
const path = "/replies/tickets";
class TicketRepliesRoute extends ticker_replies_controller_1.TicketRepliesController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}`, bearerToken, this.saveRepliedTicket);
        router.get(`${path}`, bearerToken, this.getAllRepliedTickets);
        router.get(`${path}/userRepliedTicket`, bearerToken, this.getUserRepliesTicket);
    }
}
exports.TicketRepliesRoute = TicketRepliesRoute;
