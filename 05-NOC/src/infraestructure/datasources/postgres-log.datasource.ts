

import {  PrismaClient, SeverityLevel } from "@prisma/client";
import { logEntity, logLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogModel } from '../../data/mongo/models/log.model';


const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}
const prisma = new PrismaClient();

export class PostgresLogDatasource implements LogDatasource{
    
    async saveLog(log: logEntity): Promise<void> {
        const { level , message, origin } = log;
        const Level = severityEnum[level];

        const newLog = await prisma.logModel.create({
            data: {
                message,
                origin,
                level: Level
            }
        });
        
    }
    async getLogs(severityLevel: logLevel): Promise<logEntity[]> {
        const Level = severityEnum[severityLevel];
        const dbLogs = await prisma.logModel.findMany({
            where: {
                level: Level
            }
        });
        return dbLogs.map( logEntity.fromObject);
    }

}