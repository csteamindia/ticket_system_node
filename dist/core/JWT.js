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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.HASH_METHOD = 'RSA256';
        this.optional_data = {
            expiresIn: 86400
        };
    }
    createJwt(dataObject) {
        return jwt.sign(dataObject, this.HASH_METHOD, this.optional_data);
    }
    decodeJwt(token) {
        jwt.verify(token, this.HASH_METHOD, { clockTimestamp: new Date().getTime() }, function (err, decoded_payload) {
            if (err) {
                return err;
            }
            else {
                return JSON.parse(JSON.stringify(decoded_payload));
            }
        });
    }
    validateToken(req, res) { }
}
exports.JWT = JWT;
