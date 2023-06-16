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
exports.decodeData = exports.keyGeneration = exports.isActiveThirdPartyAPI = exports.getDefaultSlideContent = exports.getNumberWithDecimalInMultipleOfFive = exports.sendNotificationToWeb = exports.sendNotificationToIos = exports.sendNotificationToAndroid = exports.getMonthFirstDay = exports.getDateRange = exports.timestamp = exports.dateTime = exports.remoteIP = exports.validateTimestamp = exports.RandomString = exports.dateCompare = exports.timeStamp = void 0;
const requestIp = require('request-ip');
const { dbReader, dbWriter } = require('../db');
const crypto_1 = __importStar(require("crypto"));
const moment_1 = __importDefault(require("moment"));
/**
 * Get Current Date in Timestamp Format
 *  @days - default value `0` or grater value to Add days to current date
 *  @return - timestamp with added days
 */
function timeStamp(days = 0) {
    let currentTime = Date.now();
    let addTime = (days) ? (days * 24 * 60 * 60 * 1000) : 0;
    return Math.round(((currentTime + addTime) + 10000) / 1000);
}
exports.timeStamp = timeStamp;
function dateCompare(date) {
    return timeStamp() < date;
}
exports.dateCompare = dateCompare;
/**
 * Get Random Code
 *  @length - pass Length of Random string
 *  @require - npm package require-ip
 *  @req - using user request get user remote IP
 *  @return - string
 */
function RandomString(length = 60) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    // let Sc = '!~^$#_+*'
    let _string = characters + numbers;
    _string = (length > 4 ? _string + characters.toLowerCase() : characters);
    let result = "";
    for (var i = 0; i < length; i++) {
        result += _string.charAt(Math.floor(Math.random() * _string.length));
    }
    return result;
}
exports.RandomString = RandomString;
/**
 * Get Days Difference between Two Dates
 *  @_timestamp - get old timestamp to subtract with new timestamp to get Difference Days
 *  @return - integer value for difference Days
 */
function validateTimestamp(_timestamp) {
    return Math.abs(Math.floor((timeStamp() - _timestamp) / (3600 * 24)));
}
exports.validateTimestamp = validateTimestamp;
/**
 * Get Remote User Ip-address on request
 *  @require - npm package require-ip
 *  @req - using user request get user remote IP
 *  @return - string of IP-address
 */
function remoteIP(req) {
    return requestIp.getClientIp(req);
}
exports.remoteIP = remoteIP;
/**
 * Convert Unix Timestamp to Javascript Default Date Format
 * @timestamp - accept timestamp, Convert ac Date
 * @is_UNIX - convert timestamp to date or timestamp format
 * @return - Javascript Default Date Format
 */
function dateTime(timestamp, is_UNIX = true) {
    //@ts-ignore    
    return is_UNIX ? new Date(timestamp * 1000) : Math.round(timestamp / 1000);
}
exports.dateTime = dateTime;
function timestamp(days = 0) {
    let currentTime = Date.now();
    let addTime = (days) ? (days * 24 * 60 * 60 * 1000) : 0;
    return Math.round(((currentTime + addTime) + 10000) / 1000);
}
exports.timestamp = timestamp;
function getDateRange(startDate, endDate, dateFormat) {
    let dates = [], end = (0, moment_1.default)(endDate), start = (0, moment_1.default)(startDate), diff = (0, moment_1.default)(endDate).diff((0, moment_1.default)(startDate), 'days');
    let j = 0;
    for (var i = 0; i <= diff; i++) {
        j = i == 0 ? 0 : 1;
        dates.push(end.subtract(j, 'd').format(dateFormat));
    }
    return dates;
}
exports.getDateRange = getDateRange;
;
function getMonthFirstDay(month) {
    return (0, moment_1.default)().subtract(month, 'months').startOf('month').format('YYYY-MM-DD');
}
exports.getMonthFirstDay = getMonthFirstDay;
;
// Send NOtification for Android user
function sendNotificationToAndroid(payload) {
    try {
        let params = {
            "content_available": true,
            "data": {
                "body": payload.body,
                "senderId": payload.sender_user_id,
                "title": payload.title,
                "badge": payload.badgeString,
                "type": payload.type
            },
            "priority": "high",
            "tokens": payload.tokens
        };
        // admin.messaging().sendMulticast(params);
        return 1;
    }
    catch (e) {
        console.log(e.message);
        return 1;
    }
}
exports.sendNotificationToAndroid = sendNotificationToAndroid;
// // send notifiction for IOS user 
function sendNotificationToIos(payload) {
    try {
        let params = {
            "content_available": true,
            "data": {
                "body": payload.body,
                "senderId": payload.sender_user_id,
                "title": payload.title,
            },
            "notification": {
                "body": payload.body,
                "title": payload.title,
            },
            "apns": {
                "headers": {
                    "apns-priority": "5"
                },
                "payload": {
                    "aps": {
                        "badge": payload.badge,
                        "sound": "default"
                    }
                }
            },
            "priority": "high",
            "tokens": payload.tokens
        };
        // admin.messaging().sendMulticast(params);
        return 1;
    }
    catch (e) {
        console.log(e.message);
        return 1;
    }
}
exports.sendNotificationToIos = sendNotificationToIos;
function sendNotificationToWeb(payload) {
    try {
        let params = {
            "content_available": true,
            "data": {
                "body": payload.body,
                "senderId": payload.sender_user_id,
                "title": payload.title,
            },
            "notification": {
                "body": payload.body,
                "title": payload.title,
            },
            "apns": {
                "headers": {
                    "apns-priority": "5"
                },
                "payload": {
                    "aps": {
                        "badge": payload.badge,
                        "sound": "default"
                    }
                }
            },
            "priority": "high",
            "tokens": payload.tokens
        };
        // admin.messaging().sendMulticast(params);
        return 1;
    }
    catch (e) {
        console.log(e.message);
        return 1;
    }
}
exports.sendNotificationToWeb = sendNotificationToWeb;
function getNumberWithDecimalInMultipleOfFive(number) {
    let _number = number;
    number = number.toString();
    number = number.split('.');
    if (number.length > 1) {
        number = _number.toFixed(1).toString().split('.');
        let decimal_part = parseInt(number[1]);
        if (decimal_part >= 1 && decimal_part <= 4) {
            return Math.floor(_number);
        }
        else if (decimal_part >= 6 && decimal_part <= 9) {
            return Math.ceil(_number);
        }
        else {
            return _number;
        }
    }
    else {
        return parseInt(number[0]);
    }
}
exports.getNumberWithDecimalInMultipleOfFive = getNumberWithDecimalInMultipleOfFive;
;
function getDefaultSlideContent() {
    let content = `<section data-slide-id=\"$slide_id$\" style=\"height: 720px; width: 1280px; background-color: rgba(255,255,255,1);\"><div data-block-id=\"46002fcd-21ba-40e7-9489-fbf099f8faf1\" data-block-type=\"text\" style=\"position: absolute; top: 250px; left: 300px; width: 700px; height: 125px; transform: rotate(0deg)\"> <div data-text=\"Add Title\" style=\"text-align: center; font-family: arial; font-size: 85px; line-height: 125px; color: #000000; opacity: 100%; \"><p></p></div> </div><div data-block-id=\"650fe37b-fd95-4bfc-8ef0-8067479b2636\" data-block-type=\"text\" style=\"position: absolute; top: 370px; left: 300px; width: 700px; height: 55px; transform: rotate(0deg)\"> <div data-text=\"Add Subtitle\" style=\"text-align: center; font-family: arial; font-size: 38px; line-height: 55px; color: #000000;opacity: 100%; \"><p></p></div> </div></section>`;
    return content;
}
exports.getDefaultSlideContent = getDefaultSlideContent;
/**
 * check if thirdParty api is active
 * @param thirdPartyId
 * @returns boolean
 */
function isActiveThirdPartyAPI(thirdPartyId) {
    return __awaiter(this, void 0, void 0, function* () {
        let isActive = dbReader.thirdParty.findOne({
            attributes: ['is_active'],
            where: {
                thirdparty_id: thirdPartyId
            },
        });
        isActive = JSON.parse(JSON.stringify(isActive));
        return isActive ? isActive.is_active : 0;
    });
}
exports.isActiveThirdPartyAPI = isActiveThirdPartyAPI;
function keyGeneration() {
    const { privateKey, publicKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'SM',
        },
    });
    return {
        privateKey: privateKey,
        publicKey: publicKey
    };
}
exports.keyGeneration = keyGeneration;
function decodeData(key, token) {
    try {
        const privateKey = key;
        const buffer = Buffer.from(token, 'base64');
        const decrypted = crypto_1.default.privateDecrypt({
            key: privateKey.toString(),
            passphrase: 'SM',
        }, buffer);
        return JSON.parse(decrypted.toString('utf8'));
    }
    catch (err) {
        throw new Error(err.message);
    }
}
exports.decodeData = decodeData;
