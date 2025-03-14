import { logEntity, logLevel } from '../../entities/log.entity';
import { logRepository } from '../../repository/log.repository';
import { log } from 'console';

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error:string) => void )| undefined;

export class checkService implements CheckServiceUseCase{

    constructor(
        private readonly successCallback : SuccesCallback,
        private readonly errorCallback : ErrorCallback,
        private readonly logRepository: logRepository,
    ){}

    public async execute(url : string) : Promise<boolean> {

        const log = new logEntity({
            level: logLevel.low,
            message: `service ${url} is ok`,
            createdAt: new Date(),
            origin: 'checkService'
        });


        try{
            const req = await fetch(url);
            

            if (!req.ok){
                throw new Error(`Error on check service ${url}`);
            } 

            
            this.logRepository.saveLog(log)
            this.successCallback && this.successCallback();
            return true;

        }catch(error){
            const errorString = `${error}`;
            
            log.message = `service ${url} is not ok`;
            log.level = logLevel.high;
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback( errorString );
            return false;
        }

    }
}