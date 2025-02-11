import { log } from "console";

export enum logLevel {
    low ="low",
    medium = "medium",
    high = "high"
}

export interface logEntityOptions {
    level : logLevel;
    message : string;
    createdAt : Date;
    origin: string;
}

export class logEntity {

    public level : logLevel;
    public message : string;
    public createdAt : Date;
    public origin: string; 


    constructor(options:logEntityOptions){
        const  { message,  level, origin, createdAt} = options
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;

    }

    static fromJson = (json: any): logEntity =>{
        JSON.parse(json);
        const {message, level, createdAt,origin} = json;
        const log = new logEntity({
            message,
            level,
            createdAt,
            origin,
        });
        log.createdAt = new Date(createdAt);
        return log;
    }
    
}