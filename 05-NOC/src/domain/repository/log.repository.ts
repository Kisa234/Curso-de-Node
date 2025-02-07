import { logEntity, logLevel } from "../entities/log.entity";

export abstract class logRepository {

    abstract saveLog(log:logEntity):Promise<void>;
    abstract getLogs(severityLevel:logLevel):Promise<logEntity[]>;
    
}