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
import { departmentInterface } from "../../interfaces/department-interface";

export class DepartmentController {
  /***************** Add & update vendors **************/
  public createDepartment = async (req: Request, res: Response) => {
    try {
      const payload: departmentInterface = req.body;
      //@ts-ignore
      payload.org_id = req.org_id;
      const data = await dbWriter.departments.create(payload);
      const department = JSON.parse(JSON.stringify(data));
      if (department) {
        new SuccessResponse("Department Created", { department }).send(res);
      } else {
        throw new Error("Error Creating Department");
      }
    } catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  };

  public listDepartment = async (req: Request, res: Response) => {
    try {
      const data = await dbReader.departments.findAll({
        //@ts-ignore
        where: { org_id: req.org_id },
      });
      const departments = JSON.parse(JSON.stringify(data));
      if (departments.length) {
        new SuccessResponse("Department found.", departments).send(res);
      } else {
        throw new NotFoundError("No department found.");
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  public departmentById = async (req: Request, res: Response) => {
    try {
      const data = await dbReader.departments.findOne({
        //@ts-ignore
        where: { org_id: req.org_id, id: req.params.id },
      });
      const departments = JSON.parse(JSON.stringify(data));
      if (departments) {
        new SuccessResponse("Department found.", departments).send(res);
      } else {
        throw new NotFoundError("No department found.");
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };
}
