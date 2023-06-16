import { NextFunction, Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  ApiError,
} from "../../core/index";
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();
import { hash, compare } from "bcrypt";
import { AccessLevel } from "../../Enum/accessLevel";
const jwt = require("jsonwebtoken");
export class UserController {
  /***************** Add & update vendors **************/
  public signUp = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const user = await dbReader.users.findOne({
        where: { email: payload.email },
      });

      if (user) {
        throw new Error("User exist");
      } else {
        const hashedPassword = await hash(payload.password, 10);
        payload.password = hashedPassword;

        const data = await dbWriter.users.create({ ...payload });
        const user = JSON.parse(JSON.stringify(data));
        if (user) {
          let userAccess = await dbWriter.privileges.create({
            user_id: user.id,
            privileges: JSON.stringify(payload.privileges),
            created_at: new Date(),
          });
          userAccess = JSON.parse(JSON.stringify(userAccess));
          if (userAccess) {
            let accessData = JSON.parse(userAccess.privileges);
            accessData.map((data: any, index: any) => {
              let accessArray: any = [];
              data.access_level.forEach((element: any) => {
                accessArray.push(AccessLevel[element]);
              });
              accessData[index].access_level = accessArray;
            });
            user.privileges = accessData;
          }
          new SuccessResponse("User Created", { user }).send(res);
        } else {
          throw new Error("User not created");
        }
      }
    } catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const data = await dbReader.users.findOne({
        where: { email: payload.email },
      });
      const user = JSON.parse(JSON.stringify(data));
      if (user) {
        let accessLevel = await dbReader.privileges.findOne({
          where: { user_id: user.id },
        });

        const isMatch = await compare(payload.password, user.password);
        if (isMatch) {
          accessLevel = JSON.parse(JSON.stringify(accessLevel));
          let privileges = JSON.parse(accessLevel.privileges);
          console.log(privileges);
          privileges.map((data: any) => {
            console.log("data -->", JSON.stringify(data));
            console.log("body", JSON.stringify(req.body.permission));

            if (JSON.stringify(data) === JSON.stringify(req.body.permission)) {
              console.log("yes");
              return true;
            } else {
              throw new Error("You are not authorized to perform this action.");
            }
          });
          const userLogs = await dbWriter.user_logs.create({
            user_id: user.id,
            is_login: 1,
            date: new Date(),
          });
          console.log(userLogs);
          const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

          return new SuccessResponse("User Login", {
            user,
            token: token,
          }).send(res);
        } else {
          throw new Error("Invalid Password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  public logout = async (req: Request, res: Response) => {
    try {
      const logout = await dbWriter.user_logs.create({
        //@ts-ignore
        user_id: req.user.id,
        is_login: 0,
        date: new Date(),
      });
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  public menus = async (req: Request, res: Response) => {
    try {
      console.log("access -->", AccessLevel[1]);
      let menus = [
        { id: 1, title: "Ticket" },
        { id: 2, title: "Department" },
        { id: 3, title: "Organization" },
        { id: 4, title: "Reports" },
      ];
      // menus = JSON.parse(JSON.stringify(menus));
      new SuccessResponse("Data fetched successfully", menus).send(res);
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };
}
