import { logEntity, logLevel } from "../entities/log.entity";

export abstract class logDatasource {
    abstract saveLog(log:logEntity):Promise<void>;
    abstract getLogs(severityLevel:logLevel):Promise<logEntity[]>;
}

