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
exports.Crypto = void 0;
const CryptoJS = __importStar(require("crypto-js"));
class Crypto {
    constructor() {
        this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
        this.iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    }
    encrypt(data, is_password) {
        if (is_password) {
            let hash = CryptoJS.HmacSHA256(data, this.key);
            return CryptoJS.enc.Base64.stringify(hash);
        }
        else {
            return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), this.key, {
                keySize: 64 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        }
    }
    hmacsha1(data) {
        let hash = CryptoJS.HmacSHA256(JSON.stringify(data), this.key);
        return CryptoJS.enc.Base64.stringify(hash);
    }
    decrypt(encrypted) {
        var byteCode = CryptoJS.AES.decrypt(encrypted, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedString = byteCode.toString(CryptoJS.enc.Utf8);
        let obj = { 'decrypt_code': byteCode, 'value': decryptedString };
        return (typeof JSON.parse(decryptedString) === 'object' && decryptedString !== null) ? decryptedString : false;
    }
    validate_password() {
        return true;
    }
    refresh_token(length = 60) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}
exports.Crypto = Crypto;
