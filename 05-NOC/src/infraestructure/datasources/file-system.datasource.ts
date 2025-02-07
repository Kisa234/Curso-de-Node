import path from "path";
import { logDatasource } from "../../domain/datasources/log.datasource";
import { logEntity, logLevel } from "../../domain/entities/log.entity";
import  fs from 'fs';


export class fileSystemDataSource implements logDatasource{

    private readonly logsPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    

    constructor(){
        this.createLogsFile();
    }

    private createLogsFile = ()=>{

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path =>{
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
        })

    }

     saveLog(log: logEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

     getLogs(severityLevel: logLevel): Promise<logEntity[]> {
        throw new Error("Method not implemented.");
        
    }

}