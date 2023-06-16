import e, { Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  ApiError,
} from "../../core/index";
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();
import { NotFoundError } from "../../core/ApiError";

export class TicketSettingsController {
  public async getAllTicketSettings(req: Request, res: Response) {
    try {
      const data = await dbReader.ticket_settings.findAll();
      const ticket = JSON.parse(JSON.stringify(data));
      if (ticket.length > 0) {
        new SuccessResponse("Ticket settings found", ticket).send(res);
      } else {
        ApiError.handle(new NotFoundError("Ticket settings not found"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  public async saveTicketSettings(req: Request, res: Response) {
    try {
      const ticketArray: any = [];
      if (req.body.length > 0) {
        req.body.forEach((element: any) => {
          ticketArray.push({
            name: element.name,
            value: element.value,
          });
        });
        const data = await dbWriter.ticket_settings.bulkCreate(ticketArray);
        const ticket = JSON.parse(JSON.stringify(data));
        if (ticket.length > 0) {
          new SuccessResponse("Ticket settings found", ticket).send(res);
        } else {
          ApiError.handle(new NotFoundError("Ticket settings not found"), res);
        }
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }
}
