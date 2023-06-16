import { Router } from "express";
import { TicketController } from "./ticket-controller";
const bearerToken = require("../../middleware/bearer-token");
const path = "/tickets";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./public/upload");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mkv" ||
    file.mimetype === "video/3gp" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/flv"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage, fileFilter: fileFilter });
export class TicketRoute extends TicketController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}`, bearerToken,upload.array('ticketMedia'), this.saveTicket);
    router.get(`${path}`, bearerToken, this.getAllTickets);
    router.get(`${path}/userTicker`, bearerToken, this.getUserTicket);
  }
}
