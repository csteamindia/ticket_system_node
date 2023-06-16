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
exports.TicketSettingsController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const ApiError_1 = require("../../core/ApiError");
class TicketSettingsController {
    getAllTicketSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbReader.ticket_settings.findAll();
                const ticket = JSON.parse(JSON.stringify(data));
                if (ticket.length > 0) {
                    new index_1.SuccessResponse("Ticket settings found", ticket).send(res);
                }
                else {
                    index_1.ApiError.handle(new ApiError_1.NotFoundError("Ticket settings not found"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
    saveTicketSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketArray = [];
                if (req.body.length > 0) {
                    req.body.forEach((element) => {
                        ticketArray.push({
                            name: element.name,
                            value: element.value,
                        });
                    });
                    const data = yield dbWriter.ticket_settings.bulkCreate(ticketArray);
                    const ticket = JSON.parse(JSON.stringify(data));
                    if (ticket.length > 0) {
                        new index_1.SuccessResponse("Ticket settings found", ticket).send(res);
                    }
                    else {
                        index_1.ApiError.handle(new ApiError_1.NotFoundError("Ticket settings not found"), res);
                    }
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.TicketSettingsController = TicketSettingsController;
