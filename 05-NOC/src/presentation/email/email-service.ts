import { envs } from '../../config/plugins/envs.plugins';
import nodemailer from 'nodemailer';
import { logRepository } from '../../domain/repository/log.repository';
import { log } from 'console';
import { logEntity, logLevel } from '../../domain/entities/log.entity';

interface SendMailOptions{
    to: string;
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];

}

interface Attachments{
    filename: string;
    path : string;
}



export class EmailService {

    private transporter = nodemailer.createTransport({
        service:envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(
    ){}

    async sendEmail(options:SendMailOptions):Promise<Boolean>{

        const {to, subject, htmlBody, attachments = []} = options;
        
        try{

            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments: attachments
            });
            
            const log = new logEntity({
                level: logLevel.low,
                message: `Email sent to ${to}`,
                createdAt: new Date(),
                origin: 'email-service.ts'
            });
            
        
            return true;

        }catch(error){return false;}

    }

    async sendEmailWithFileSystemLogs(to: string){
        const subject = 'Logs de sistema - NOC';
        const htmlBody = 
            `
                <h1>Logs de sistema - NOC</h1>
                <p> Lorem velit non venian ullamco ex eu laburom</p>
                <p> Ver logs adjuntos</p>
            `;
        const attachments:Attachments[] = [
            {filename: 'logs-low.txt', path: './logs/logs-low.txt'}, 
            {filename: 'logs-medium.txt', path: './logs/logs-medium.txt'}, 
            {filename: 'logs-high.txt', path: './logs/logs-high.txt'}, 
        ]

        return this.sendEmail({
            to,subject,htmlBody,attachments
        });
    }

    
}