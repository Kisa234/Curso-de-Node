"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEntity = exports.logLevel = void 0;
var logLevel;
(function (logLevel) {
    logLevel["low"] = "low";
    logLevel["medium"] = "medium";
    logLevel["high"] = "high";
})(logLevel || (exports.logLevel = logLevel = {}));
class logEntity {
    constructor(message, level) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }
}
exports.logEntity = logEntity;
logEntity.fromJson = (json) => {
    JSON.parse(json);
    const { message, level, createdAt } = json;
    const log = new logEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
};
