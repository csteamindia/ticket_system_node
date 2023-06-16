"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSettingsRoute = void 0;
const ticket_setting_controller_1 = require("./ticket-setting-controller");
const bearerToken = require("../../middleware/bearer-token");
const path = "/ticket/settings";
class TicketSettingsRoute extends ticket_setting_controller_1.TicketSettingsController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}`, this.saveTicketSettings);
        router.get(`${path}`, this.getAllTicketSettings);
    }
}
exports.TicketSettingsRoute = TicketSettingsRoute;
