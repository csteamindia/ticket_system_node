import { Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  ApiError,
} from "../../core/index";
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();
import { NotFoundError } from "../../core/ApiError";
import { ticketReplies } from "../../interfaces/ticketReplies-interface";
const { Op } = dbReader.Sequelize;

export class TicketRepliesController {
  public async getAllRepliedTickets(req: Request, res: Response) {
    try {
      const data = await dbReader.ticket_replies.findAll({
        where: {
          //@ts-ignore
          org_id: req.org_id,
        },
      });
      const ticket = JSON.parse(JSON.stringify(data));
      if (ticket.length > 0) {
        new SuccessResponse("Replied ticket found", ticket).send(res);
      } else {
        ApiError.handle(new NotFoundError("Replied ticket not found"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  /***************Replied Ticket Add and Update new ticket **************/
  public async saveRepliedTicket(req: Request, res: Response) {
    try {
      const payload: ticketReplies = req.body;
      //@ts-ignore
      payload.org_id = req.org_id;
      //@ts-ignore
      payload.user_id = req.user_id;
      if (payload.id) {
        const data = await dbWriter.ticket_replies.update(payload, {
          //@ts-ignore
          where: { id: payload.id, org_id: payload.org_id },
        });

        new SuccessResponse("Replied ticket updated", {}).send(res);
      } else {
        const data = await dbWriter.ticket_replies.create(payload);
        const replies_ticket = JSON.parse(JSON.stringify(data));
        if (replies_ticket) {
          new SuccessResponse("Replies ticket created", replies_ticket).send(
            res
          );
        } else {
          throw new Error("Replies ticket not created");
        }
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  public async getUserRepliesTicket(req: Request, res: Response) {
    try {
      const agent_id = req.query.agent_id || null;
      const ticket_id = req.query.ticket_id || null;
      //@ts-ignore
      const data = await dbReader.ticket_replies.findAll({
        where: {
          [Op.and]: [
            //@ts-ignore
            { user_id: req.user_id },
            //@ts-ignore
            { org_id: req.org_id },
            {
              [Op.or]: [{ agent_id: agent_id }, { ticket_id: ticket_id }],
            },
          ],
        },
      });
      const replies_ticket = JSON.parse(JSON.stringify(data));
      if (replies_ticket.length > 0) {
        new SuccessResponse("Replied ticket found", replies_ticket).send(res);
      } else {
        ApiError.handle(new NotFoundError("Ticket not found"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }
}
