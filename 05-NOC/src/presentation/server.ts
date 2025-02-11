import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { checkService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.implementation";
import { fileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from './email/email-service';
import { log } from "console";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";


const logRepository = new LogRepositoryImpl(
   new fileSystemDataSource(),
);

export class Server{
    
    
    public static start(){

        console.log('Server started...');

        // // Mandar Email

        new SendEmailLogs(
            new EmailService(),
            logRepository,
        ).execute('renzonicolas3009@Gmail.com');



        // const emailService = new EmailService();

        // emailService.sendEmailWithFileSystemLogs(
        //     'renzonicolas3009@gmail.com',
        // );

        // Mandar Logs

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com';
        //             new checkService(
        //                 // () => console.log(`${url} is ok`),
        //                 // (error) => console.log(error),
        //                 undefined,
        //                 undefined,
        //                 logRepository,
        //             ).execute(url);
    
        //         // new checkService().execute('http://localhost:3000/');
        //         // new checkService().execute('https://www.google.com');
        //     }
        // );

    };

}