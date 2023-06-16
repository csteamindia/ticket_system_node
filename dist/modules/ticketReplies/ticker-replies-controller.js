"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepliesController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const ApiError_1 = require("../../core/ApiError");
const { Op } = dbReader.Sequelize;
class TicketRepliesController {
    getAllRepliedTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbReader.ticket_replies.findAll({
                    where: {
                        //@ts-ignore
                        org_id: req.org_id,
                    },
                });
                const ticket = JSON.parse(JSON.stringify(data));
                if (ticket.length > 0) {
                    new index_1.SuccessResponse("Replied ticket found", ticket).send(res);
                }
                else {
                    index_1.ApiError.handle(new ApiError_1.NotFoundError("Replied ticket not found"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
    /***************Replied Ticket Add and Update new ticket **************/
    saveRepliedTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                //@ts-ignore
                payload.org_id = req.org_id;
                //@ts-ignore
                payload.user_id = req.user_id;
                if (payload.id) {
                    const data = yield dbWriter.ticket_replies.update(payload, {
                        //@ts-ignore
                        where: { id: payload.id, org_id: payload.org_id },
                    });
                    new index_1.SuccessResponse("Replied ticket updated", {}).send(res);
                }
                else {
                    const data = yield dbWriter.ticket_replies.create(payload);
                    const replies_ticket = JSON.parse(JSON.stringify(data));
                    if (replies_ticket) {
                        new index_1.SuccessResponse("Replies ticket created", replies_ticket).send(res);
                    }
                    else {
                        throw new Error("Replies ticket not created");
                    }
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
    getUserRepliesTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent_id = req.query.agent_id || null;
                const ticket_id = req.query.ticket_id || null;
                //@ts-ignore
                const data = yield dbReader.ticket_replies.findAll({
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
                    new index_1.SuccessResponse("Replied ticket found", replies_ticket).send(res);
                }
                else {
                    index_1.ApiError.handle(new ApiError_1.NotFoundError("Ticket not found"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.TicketRepliesController = TicketRepliesController;
