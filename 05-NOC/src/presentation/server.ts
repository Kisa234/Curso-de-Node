import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { checkService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.implementation";
import { fileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from './email/email-service';
import { log } from "console";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { checkServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import fs from 'fs';


const fslogRepository = new LogRepositoryImpl(
    new fileSystemDataSource(),
);

const MglogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const PglogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

export class Server{
    
    
    public static start(){

        console.log('Server started...');

        // // Mandar Email

        // new SendEmailLogs(
        //     new EmailService(),
        //     logRepository,
        // ).execute('renzonicolas3009@Gmail.com');



        // const emailService = new EmailService();

        // emailService.sendEmailWithFileSystemLogs(
        //     'renzonicolas3009@gmail.com',
        // );

        // Mandar Logs

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                    new checkServiceMultiple(
                        // () => console.log(`${url} is ok`),
                        // (error) => console.log(error),
                        undefined,
                        undefined,
                        [fslogRepository, MglogRepository, PglogRepository],
                    ).execute(url);
    
                // new checkService().execute('http://localhost:3000/');
                // new checkService().execute('https://www.google.com');
            }
        );

    };

}