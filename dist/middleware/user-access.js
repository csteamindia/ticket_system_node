"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res, next) {
    console.log("reqbody", req.body);
    const reqBody = req.body;
    switch (reqBody) {
        case "r":
            console.log("case 1");
            if (reqBody.action_type == 1) {
                next();
            }
            else {
                console.error("Your not able to read this document.");
            }
        case "w":
            console.log("case 2");
            if (reqBody.action_type == 2) {
                next();
            }
            else {
                console.error("Your not able to write this document.");
            }
        case "d":
            console.log("case 3");
            if (reqBody.action_type == 3) {
                next();
            }
            else {
                console.error("Your not able to delete this document.");
            }
        case "r-w":
            console.log("case 4");
            if (reqBody.action_type == 4) {
                next();
            }
            else {
                console.error("Your not able to read-write this document.");
            }
        case "r-d":
            console.log("case 5");
            if (reqBody.action_type == 5) {
                next();
            }
            else {
                console.error("Your not able to read-delete this document.");
            }
        case "w-d":
            console.log("case 6");
            if (reqBody.action_type == 6) {
                next();
            }
            else {
                console.error("Your not able to write-delete this document.");
            }
        case "r-w-d":
            console.log("case 7");
            if (reqBody.action_type == 7) {
                next();
            }
            else {
                console.error("Your not able to read-write-delete this document.");
            }
        default:
            console.error("Failed");
    }
};
