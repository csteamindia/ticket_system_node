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
exports.TicketController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const ApiError_1 = require("../../core/ApiError");
const { Op } = dbReader.Sequelize;
class TicketController {
    getAllTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbReader.tickets.findAll({
                    where: {
                        //@ts-ignore
                        org_id: req.org_id,
                    },
                });
                const ticket = JSON.parse(JSON.stringify(data));
                if (ticket.length > 0) {
                    new index_1.SuccessResponse("Ticket found", ticket).send(res);
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
    /***************Raised and Update new ticket **************/
    saveTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                //@ts-ignore
                payload.org_id = req.org_id;
                //@ts-ignore
                payload.user_id = req.user_id;
                let userRole = yield dbReader.users.findOne({
                    attributes: ["role_id"],
                    where: { id: payload.user_id },
                });
                userRole = JSON.parse(JSON.stringify(userRole));
                payload.agent_id = parseInt(req.body.agent_id);
                payload.type = parseInt(req.body.type);
                payload.status = parseInt(req.body.status);
                payload.priority = parseInt(req.body.priority);
                payload.rating = parseInt(req.body.rating);
                const files = req.files;
                const fileArr = [];
                files.forEach((element) => {
                    fileArr.push(`${req.hostname}:${process.env.PORT}/${element.path}`);
                });
                payload.files = JSON.stringify(fileArr);
                if (payload.id) {
                    if (userRole.role_id == 1 ||
                        userRole.role_id == 2 ||
                        userRole.role_id == 3 ||
                        userRole.role_id == 4) {
                        const data = yield dbWriter.tickets.update(payload, {
                            //@ts-ignore
                            where: {
                                id: payload.id,
                                org_id: payload.org_id,
                                user_id: payload.user_id,
                            },
                        });
                        if (data) {
                            new index_1.SuccessResponse("Ticket updated", {}).send(res);
                        }
                        else {
                            throw new Error("Ticket Update failed");
                        }
                    }
                    else {
                        index_1.ApiError.handle(new ApiError_1.AuthFailureError("Your are not authorized to perform this action."), res);
                    }
                }
                else {
                    if (userRole.role_id == 1 ||
                        userRole.role_id == 2 ||
                        userRole.role_id == 3 ||
                        userRole.role_id == 4) {
                        const data = yield dbWriter.tickets.create(Object.assign({}, payload));
                        const ticket = JSON.parse(JSON.stringify(data));
                        if (ticket) {
                            new index_1.SuccessResponse("Ticket created", ticket).send(res);
                        }
                        else {
                            throw new Error("Ticket not created");
                        }
                    }
                    else {
                        index_1.ApiError.handle(new ApiError_1.AuthFailureError("Your are not authorized to perform this action."), res);
                    }
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
    /**********User's ticket *****************/
    getUserTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent_id = req.query.agent_id || null;
                const data = yield dbReader.tickets.findAll({
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
                    new index_1.SuccessResponse("Ticket found", tickets).send(res);
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
exports.TicketController = TicketController;
