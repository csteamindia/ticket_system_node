"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../core/index");
const crypto = new index_1.Crypto();
/**
 * this method use to validate every token from User Request. and validate is request Genuie or Not, if Not throw unauthorize error
 * @param token
 * @param UA_string
 * @returns - Object
 */
module.exports = function hash(req, res, next) {
    let UA_string = req.headers['user-agent'] ? req.headers['user-agent'] : "";
    const UA = new index_1.UAParser(UA_string);
    let userAgent = {
        browser_name: UA.getBrowser().name,
        browser_version: UA.getBrowser().version,
        engine_name: UA.getEngine().name,
        engine_version: UA.getEngine().version,
        os: UA.getOS().name,
        os_ver: UA.getOS().version,
        cpu: UA.getCPU().architecture,
        ua: UA.getUA()
    };
    //@ts-ignore
    req.hash_key = crypto.hmacsha1(userAgent);
    next();
};
