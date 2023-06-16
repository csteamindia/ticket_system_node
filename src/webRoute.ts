import { NextFunction, Request, Response, Router } from "express";

export class WebRoute {
    constructor() {}

    public static create(router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new WebRoute().index(req, res, next);
        });
    }

    public index(req: Request, res: Response, next: NextFunction) {
        //set message
        let options: Object = {
            "message": "Welcome to the Production ERP Rest API"
        };

        //render template
        res.locals.BASE_URL = "/";

        //add title
        res.locals.title = "Production ERP";

        //render view
        res.render("index", options);
    }
}
