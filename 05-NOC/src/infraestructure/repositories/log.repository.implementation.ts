import { logEntity, logLevel } from '../../domain/entities/log.entity';
import { logRepository } from '../../domain/repository/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasource';


export class LogRepositoryImpl implements logRepository{
    
    
    constructor(
        private readonly logDatasource: LogDatasource
    ){}

    async saveLog(log: logEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }
    async getLogs(severityLevel: logLevel): Promise<logEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }



}