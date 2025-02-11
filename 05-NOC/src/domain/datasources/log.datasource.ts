import { logEntity, logLevel } from "../entities/log.entity";

export abstract class LogDatasource {
    abstract saveLog(log:logEntity):Promise<void>;
    abstract getLogs(severityLevel:logLevel):Promise<logEntity[]>;
}

