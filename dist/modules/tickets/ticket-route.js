"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRoute = void 0;
const ticket_controller_1 = require("./ticket-controller");
const bearerToken = require("../../middleware/bearer-token");
const path = "/tickets";
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "video/mp4" ||
        file.mimetype === "video/mkv" ||
        file.mimetype === "video/3gp" ||
        file.mimetype === "video/mov" ||
        file.mimetype === "video/flv") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
class TicketRoute extends ticket_controller_1.TicketController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}`, bearerToken, upload.array('ticketMedia'), this.saveTicket);
        router.get(`${path}`, bearerToken, this.getAllTickets);
        router.get(`${path}/userTicker`, bearerToken, this.getUserTicket);
    }
}
exports.TicketRoute = TicketRoute;
