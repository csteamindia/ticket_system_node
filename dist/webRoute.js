"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRoute = void 0;
class WebRoute {
    constructor() { }
    static create(router) {
        router.get("/", (req, res, next) => {
            new WebRoute().index(req, res, next);
        });
    }
    index(req, res, next) {
        //set message
        let options = {
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
exports.WebRoute = WebRoute;
