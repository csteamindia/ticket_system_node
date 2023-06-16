import * as bodyParser from "body-parser";
import * as path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";

import Logger from "./core/Logger";
import {
  NotFoundError,
  ApiError,
  InternalError,
  AuthFailureError,
} from "./core/ApiError";
import { WebRoute } from "./webRoute";
import { RoleRoute } from "./modules/roles/role-route";
import { UserRoute } from "./modules/users/user-route.";
import { TicketRoute } from "./modules/tickets/ticket-route";
import { TicketRepliesRoute } from "./modules/ticketReplies/ticket-replies-route";
import { TicketSettingsRoute } from "./modules/ticketSettings/ticket-setting-route";
import { DepartmentRoute } from "./modules/departments/department-route";

// const { dbWriter, dbReader } = require('./models/connection');
var IS_API_LOG = false;
/**
 * The server.
 *
 * @class Server
 */
export class Server {
  public app: express.Application;
  public router: express.Router;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.router = express.Router();

    //create express js application
    this.app = express();
    // console.log(`Worker ${process.pid} started`);

    this.log_variable();

    //configure application
    this.config();

    //add routes For Web APP
    this.web();

    //add api For Rest API
    this.api();

    // Error handling
    this.ErrorHandling();
    this.swagger();

    //use router middleware
    // this.app.use(this.router);
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    // new VendorRoute(this.router)
    new RoleRoute(this.router);
    new UserRoute(this.router);
    new TicketRoute(this.router);
    new TicketRepliesRoute(this.router);
    new TicketSettingsRoute(this.router);
    new DepartmentRoute(this.router);
    //use router middleware
    this.app.use("/api/v1", this.router);
  }

  public swagger() {
    //new SwaggerRoute(this.router);

    //use router middleware
    this.app.use("/", this.router);
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add static paths
    // this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use("/public", express.static("public"));
    // this.app.use("/upload", express.static(__dirname + '../public/upload'));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    //mount json form parser
    this.app.use(bodyParser.json({ limit: "50mb" }));

    //mount query string parser
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    this.app.use(async function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, crossdomain, withcredentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, TokenType"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      next();
    });

    //mount cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));
  }

  public log_variable() {
    const filePath = path.join(__dirname, "../config.json");
    try {
      if (fs.existsSync(filePath)) {
        let fd: any = fs.readFileSync(path.resolve(__dirname, filePath));
        if (Object.entries(fd).length === 0) {
          fs.writeFileSync(
            path.resolve(__dirname, filePath),
            '{"is_api_log_true":false}'
          );
          IS_API_LOG = false;
        } else {
          fd = JSON.parse(fd);
          IS_API_LOG = fd.is_api_log_true;
        }
      } else {
        fs.writeFileSync(
          path.resolve(__dirname, filePath),
          '{"is_api_log_true":false}'
        );
        IS_API_LOG = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  public ErrorHandling() {
    //error handling
    this.app.use((req, res, next) => next(new NotFoundError()));

    // catch 404 and forward to error handler
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res);
        } else {
          if (process.env.NODE_ENV === "development") {
            Logger.error(err);
            return res.status(500).send(err.message);
          }
          ApiError.handle(new InternalError(), res);
        }
      }
    );
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method web
   * @return void
   */
  private web() {
    //IndexRoute
    WebRoute.create(this.router);
    this.app.use("/", this.router);
  }
}
