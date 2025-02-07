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
        
        if (!fs.existsSync(this.logsPath)){
            fs.mkdirSync(this.logsPath);
        }   

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

    async saveLog(newLog: logEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)} \n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);
        if (newLog.level === logLevel.low) return;

        if (newLog.level === logLevel.high){
            fs.appendFileSync(this.highLogsPath ,logAsJson);
        }else{
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }
    

    }

    private getLogsFromFile = (path:string): logEntity[] =>{
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
            log => logEntity.fromJson(log)
        );
        return logs;

    }

    async getLogs(severityLevel: logLevel): Promise<logEntity[]> {
        switch (severityLevel){
            case logLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case logLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case logLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} is not implemented`);
        }
        
    }

}