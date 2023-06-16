"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLevel = void 0;
var AccessLevel;
(function (AccessLevel) {
    AccessLevel[AccessLevel["read"] = 0] = "read";
    AccessLevel[AccessLevel["write"] = 1] = "write";
    AccessLevel[AccessLevel["delete"] = 2] = "delete";
    AccessLevel[AccessLevel["read-write"] = 3] = "read-write";
    AccessLevel[AccessLevel["read-delete"] = 4] = "read-delete";
    AccessLevel[AccessLevel["write-delete"] = 5] = "write-delete";
    AccessLevel[AccessLevel["read-write-delete"] = 6] = "read-write-delete";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
