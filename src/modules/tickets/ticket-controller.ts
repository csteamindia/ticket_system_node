import { Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  ApiError,
} from "../../core/index";
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();
import { AuthFailureError, NotFoundError } from "../../core/ApiError";
import { ticket } from "../../interfaces/ticket-interface";
const { Op } = dbReader.Sequelize;

export class TicketController {
  public async getAllTickets(req: Request, res: Response) {
    try {
      const data = await dbReader.tickets.findAll({
        where: {
          //@ts-ignore
          org_id: req.org_id,
        },
      });
      const ticket = JSON.parse(JSON.stringify(data));
      if (ticket.length > 0) {
        new SuccessResponse("Ticket found", ticket).send(res);
      } else {
        ApiError.handle(new NotFoundError("Ticket not found"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  /***************Raised and Update new ticket **************/
  public async saveTicket(req: Request, res: Response) {
    try {
      const payload: ticket = req.body;
      //@ts-ignore
      payload.org_id = req.org_id;
      //@ts-ignore
      payload.user_id = req.user_id;

      let userRole = await dbReader.users.findOne({
        attributes: ["role_id"],
        where: { id: payload.user_id },
      });
      userRole = JSON.parse(JSON.stringify(userRole));

      payload.agent_id = parseInt(req.body.agent_id);
      payload.type = parseInt(req.body.type);
      payload.status = parseInt(req.body.status);
      payload.priority = parseInt(req.body.priority);
      payload.rating = parseInt(req.body.rating);

      const files: any = req.files;
      const fileArr: any = [];
      files.forEach((element: any) => {
        fileArr.push(`${req.hostname}:${process.env.PORT}/${element.path}`);
      });
      payload.files = JSON.stringify(fileArr);

      if (payload.id) {
        if (
          userRole.role_id == 1 ||
          userRole.role_id == 2 ||
          userRole.role_id == 3 ||
          userRole.role_id == 4
        ) {
          const data = await dbWriter.tickets.update(payload, {
            //@ts-ignore
            where: {
              id: payload.id,
              org_id: payload.org_id,
              user_id: payload.user_id,
            },
          });
          if (data) {
            new SuccessResponse("Ticket updated", {}).send(res);
          } else {
            throw new Error("Ticket Update failed");
          }
        } else {
          ApiError.handle(
            new AuthFailureError(
              "Your are not authorized to perform this action."
            ),
            res
          );
        }
      } else {
        if (
          userRole.role_id == 1 ||
          userRole.role_id == 2 ||
          userRole.role_id == 3 ||
          userRole.role_id == 4
        ) {
          const data = await dbWriter.tickets.create({
            ...payload,
          });
          const ticket = JSON.parse(JSON.stringify(data));
          if (ticket) {
            new SuccessResponse("Ticket created", ticket).send(res);
          } else {
            throw new Error("Ticket not created");
          }
        } else {
          ApiError.handle(
            new AuthFailureError(
              "Your are not authorized to perform this action."
            ),
            res
          );
        }
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  /**********User's ticket *****************/
  public async getUserTicket(req: Request, res: Response) {
    try {
      const agent_id = req.query.agent_id || null;
      const data = await dbReader.tickets.findAll({
        where: {
          [Op.and]: [
            //@ts-ignore
            { user_id: req.user_id },
            //@ts-ignore
            { org_id: req.org_id },
            { [Op.or]: [{ agent_id: agent_id }] },
          ],
        },
      });
      const tickets = JSON.parse(JSON.stringify(data));
      if (tickets.length > 0) {
        new SuccessResponse("Ticket found", tickets).send(res);
      } else {
        ApiError.handle(new NotFoundError("Ticket not found"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }
}
