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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSystemDataSource = void 0;
const log_entity_1 = require("../../domain/entities/log.entity");
const fs_1 = __importDefault(require("fs"));
class fileSystemDataSource {
    constructor() {
        this.logsPath = 'logs/';
        this.allLogsPath = 'logs/logs-low.txt';
        this.mediumLogsPath = 'logs/logs-medium.txt';
        this.highLogsPath = 'logs/logs-high.txt';
        this.createLogsFiles = () => {
            if (!fs_1.default.existsSync(this.logsPath)) {
                fs_1.default.mkdirSync(this.logsPath);
            }
            [
                this.allLogsPath,
                this.mediumLogsPath,
                this.highLogsPath,
            ].forEach(path => {
                if (fs_1.default.existsSync(path))
                    return;
                fs_1.default.writeFileSync(path, '');
            });
        };
        this.getLogsFromFile = (path) => {
            const content = fs_1.default.readFileSync(path, 'utf-8');
            const logs = content.split('\n').map(log => log_entity_1.logEntity.fromJson(log));
            return logs;
        };
        this.createLogsFiles();
    }
    saveLog(newLog) {
        return __awaiter(this, void 0, void 0, function* () {
            const logAsJson = `${JSON.stringify(newLog)}\n`;
            fs_1.default.appendFileSync(this.allLogsPath, logAsJson);
            if (newLog.level === log_entity_1.logLevel.low)
                return;
            if (newLog.level === log_entity_1.logLevel.medium) {
                fs_1.default.appendFileSync(this.mediumLogsPath, logAsJson);
            }
            else {
                fs_1.default.appendFileSync(this.highLogsPath, logAsJson);
            }
        });
    }
    getLogs(severityLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (severityLevel) {
                case log_entity_1.logLevel.low:
                    return this.getLogsFromFile(this.allLogsPath);
                case log_entity_1.logLevel.medium:
                    return this.getLogsFromFile(this.mediumLogsPath);
                case log_entity_1.logLevel.high:
                    return this.getLogsFromFile(this.highLogsPath);
                default:
                    throw new Error(`${severityLevel} is not implemented`);
            }
        });
    }
}
exports.fileSystemDataSource = fileSystemDataSource;
