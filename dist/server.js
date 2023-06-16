"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = __importStar(require("body-parser"));
const path = __importStar(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const Logger_1 = __importDefault(require("./core/Logger"));
const ApiError_1 = require("./core/ApiError");
const webRoute_1 = require("./webRoute");
const role_route_1 = require("./modules/roles/role-route");
const user_route_1 = require("./modules/users/user-route.");
const ticket_route_1 = require("./modules/tickets/ticket-route");
const ticket_replies_route_1 = require("./modules/ticketReplies/ticket-replies-route");
const ticket_setting_route_1 = require("./modules/ticketSettings/ticket-setting-route");
const department_route_1 = require("./modules/departments/department-route");
// const { dbWriter, dbReader } = require('./models/connection');
var IS_API_LOG = false;
/**
 * The server.
 *
 * @class Server
 */
class Server {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap() {
        return new Server();
    }
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.router = express_1.default.Router();
        //create express js application
        this.app = (0, express_1.default)();
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
    api() {
        // new VendorRoute(this.router)
        new role_route_1.RoleRoute(this.router);
        new user_route_1.UserRoute(this.router);
        new ticket_route_1.TicketRoute(this.router);
        new ticket_replies_route_1.TicketRepliesRoute(this.router);
        new ticket_setting_route_1.TicketSettingsRoute(this.router);
        new department_route_1.DepartmentRoute(this.router);
        //use router middleware
        this.app.use("/api/v1", this.router);
    }
    swagger() {
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
    config() {
        //add static paths
        // this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use("/public", express_1.default.static("public"));
        // this.app.use("/upload", express.static(__dirname + '../public/upload'));
        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
        //mount json form parser
        this.app.use(bodyParser.json({ limit: "50mb" }));
        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));
        this.app.use(function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                res.header("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, crossdomain, withcredentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, TokenType");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
                next();
            });
        });
        //mount cookie parser middleware
        this.app.use((0, cookie_parser_1.default)("SECRET_GOES_HERE"));
    }
    log_variable() {
        const filePath = path.join(__dirname, "../config.json");
        try {
            if (fs_1.default.existsSync(filePath)) {
                let fd = fs_1.default.readFileSync(path.resolve(__dirname, filePath));
                if (Object.entries(fd).length === 0) {
                    fs_1.default.writeFileSync(path.resolve(__dirname, filePath), '{"is_api_log_true":false}');
                    IS_API_LOG = false;
                }
                else {
                    fd = JSON.parse(fd);
                    IS_API_LOG = fd.is_api_log_true;
                }
            }
            else {
                fs_1.default.writeFileSync(path.resolve(__dirname, filePath), '{"is_api_log_true":false}');
                IS_API_LOG = false;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    ErrorHandling() {
        //error handling
        this.app.use((req, res, next) => next(new ApiError_1.NotFoundError()));
        // catch 404 and forward to error handler
        this.app.use((err, req, res, next) => {
            if (err instanceof ApiError_1.ApiError) {
                ApiError_1.ApiError.handle(err, res);
            }
            else {
                if (process.env.NODE_ENV === "development") {
                    Logger_1.default.error(err);
                    return res.status(500).send(err.message);
                }
                ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
            }
        });
    }
    /**
     * Create and return Router.
     *
     * @class Server
     * @method web
     * @return void
     */
    web() {
        //IndexRoute
        webRoute_1.WebRoute.create(this.router);
        this.app.use("/", this.router);
    }
}
exports.Server = Server;
