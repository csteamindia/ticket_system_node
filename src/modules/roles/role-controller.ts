import { Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  ApiError,
} from "../../core/index";
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();
import { roles } from "../../Enum/rolesEnum";
import { NotFoundError } from "../../core/ApiError";

export class RoleController {
  /***************** Add & update vendors **************/
  public createRole = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      payload.roles =
        payload.roles == "admin"
          ? roles.admin
          : payload.roles == "super_admin"
          ? roles.super_admin
          : payload.roles == "user"
          ? roles.user
          : payload.roles == "agent"
          ? roles.agent
          : roles.employees;
      const role = await dbWriter.roles.create(req.body);
      const data = JSON.parse(JSON.stringify(role));
      if (data) {
        new SuccessResponse("Role created", { role: data }).send(res);
      } else {
        throw new Error("Role not created");
      }
    } catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  };

  public findRoleById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const role = await dbReader.roles.findOne({ where: { id: id } });
      if (role) {
        new SuccessResponse("Role found", { role }).send(res);
      } else {
        throw new Error("Role not found");
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  public listRoles = async (req: Request, res: Response) => {
    try {
      const roles = await dbReader.roles.findAll();
      if (roles.length > 0) {
        new SuccessResponse("Role found", roles).send(res);
      } else {
        ApiError.handle(new NotFoundError("Role not found"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };
}
