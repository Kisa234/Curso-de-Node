"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkService = void 0;
const log_entity_1 = require("../../entities/log.entity");
class checkService {
    constructor(successCallback, errorCallback, logRepository) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.logRepository = logRepository;
    }
    execute(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const req = yield fetch(url);
                const log = new log_entity_1.logEntity(`serice${url} is working correctly`, log_entity_1.logLevel.low);
                if (!req.ok) {
                    throw new Error(`Error on check service ${url}`);
                }
                this.logRepository.saveLog(log);
                this.successCallback && this.successCallback();
                return true;
            }
            catch (error) {
                const errorString = `${error}`;
                const log = new log_entity_1.logEntity(`serice${url} is not working correctly`, log_entity_1.logLevel.high);
                this.logRepository.saveLog(log);
                this.errorCallback && this.errorCallback(errorString);
                return false;
            }
        });
    }
}
exports.checkService = checkService;
