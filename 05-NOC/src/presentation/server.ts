import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { checkService } from "../domain/use-cases/checks/check-service";


export class Server{
    
    
    public static start(){

        console.log('Server started...');

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                const url = 'https://www.google.com';
                    new checkService(
                        () => console.log(`${url} is ok`),
                        (error) => console.log(error),
                    ).execute(url);
    
                // new checkService().execute('http://localhost:3000/');
                // new checkService().execute('https://www.google.com');
            }
        );

    };

}