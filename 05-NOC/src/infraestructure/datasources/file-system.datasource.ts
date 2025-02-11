import { LogDatasource } from "../../domain/datasources/log.datasource";
import { logEntity, logLevel } from "../../domain/entities/log.entity";
import  fs from 'fs';


export class fileSystemDataSource implements LogDatasource{

    private readonly logsPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.txt';
    private readonly mediumLogsPath = 'logs/logs-medium.txt';
    private readonly highLogsPath = 'logs/logs-high.txt';

    

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if ( !fs.existsSync( this.logsPath ) ) {
          fs.mkdirSync( this.logsPath );
        }
    
        [
          this.allLogsPath,
          this.mediumLogsPath,
          this.highLogsPath,
        ].forEach( path => {
          if ( fs.existsSync( path ) ) return;
    
          fs.writeFileSync( path, '' );
        });
      }

      async saveLog( newLog: logEntity ): Promise<void> {
    
        const logAsJson = `${ JSON.stringify(newLog) }\n`;
    
        fs.appendFileSync( this.allLogsPath, logAsJson );
    
        if ( newLog.level === logLevel.low ) return;
    
        if ( newLog.level === logLevel.medium ) {
          fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
          fs.appendFileSync( this.highLogsPath, logAsJson );
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