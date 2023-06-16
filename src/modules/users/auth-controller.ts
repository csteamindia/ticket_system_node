import { Request, Response } from 'express'
import { BadRequestError, ApiError, Crypto, ErrorController, SuccessResponse, AuthFailureError } from "../../core/index";
const { dbReader } = require('../../db');
const jwt = require('jsonwebtoken')
const crypto = new Crypto()
const EC = new ErrorController

export class AuthController {
    /***************** user login **************/
    public _login = async (req: Request, res: Response) => {
        try {
            let { password, email } = req.body;
            password = crypto.encrypt(password, true).toString();
            
            const data = await dbReader.users.findOne({
                attributes: [['id', 'user_id'], 'email', 'org_id', 'role'],
                where: { email: email, password: password },
                raw: true
            })
            if(data){
                const token = jwt.sign(data, process.env.JWT_SECRET_KEY)

                new SuccessResponse(EC.DataFetched, ({
                    ...data,
                    token
                })).send(res)
            }else{
                ApiError.handle(new AuthFailureError("invalid login"), res)
            }

        } catch (error: any) {
            ApiError.handle(new BadRequestError(error.message), res)
        }
    }

}



