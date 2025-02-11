"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const cron_service_1 = require("./cron/cron-service");
const check_service_1 = require("../domain/use-cases/checks/check-service");
const log_repository_implementation_1 = require("../infraestructure/repositories/log.repository.implementation");
const file_system_datasource_1 = require("../infraestructure/datasources/file-system.datasource");
const logRepository = new log_repository_implementation_1.LogRepositoryImpl(new file_system_datasource_1.fileSystemDataSource());
class Server {
    static start() {
        console.log('Server started...');
        cron_service_1.CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://www.google.com';
            new check_service_1.checkService(
            // () => console.log(`${url} is ok`),
            // (error) => console.log(error),
            undefined, undefined, logRepository).execute(url);
            // new checkService().execute('http://localhost:3000/');
            // new checkService().execute('https://www.google.com');
        });
    }
    ;
}
exports.Server = Server;
