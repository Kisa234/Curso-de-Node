import { EmailService } from '../../../presentation/email/email-service';
import { logEntity, logLevel } from '../../entities/log.entity';
import { logRepository } from '../../repository/log.repository';
import { log } from 'console';

interface SendLogsEmailUseCase {
    execute: ( to : string ) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogsEmailUseCase{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: logRepository        
    ){
    }

    async execute(to: string): Promise<boolean> {
        
        const log = new logEntity({
            level: logLevel.low,
            message: `Logs sent to ${to}`,
            createdAt: new Date(),
            origin: 'send-email-logs.ts'
        });
        
        try{
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!sent){ throw new Error('Error sending email'); }
            this.logRepository.saveLog(log);
            return true;

        }catch(error){
            log.level = logLevel.high;
            log.message = `Error sending logs to ${to}`;
            this.logRepository.saveLog(log);
            return false;
        }

        return true;
    }
}