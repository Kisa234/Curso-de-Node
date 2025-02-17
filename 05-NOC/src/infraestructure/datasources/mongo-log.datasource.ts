import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { logEntity, logLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource{
    
    
    async saveLog(log: logEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();
        console.log('Mongo Log created:', newLog.id)
    }
    async getLogs(severityLevel: logLevel): Promise<logEntity[]> {
        const logs = await LogModel.find({level: severityLevel});
        return logs.map( logEntity.fromObject);  
    }

}