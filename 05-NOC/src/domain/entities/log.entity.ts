import { log } from "console";

export enum logLevel {
    low ="low",
    medium = "medium",
    high = "high"
}


export class logEntity {

    public level : logLevel;
    public message : string;
    public createdAt : Date;


    constructor(message:string, level:logLevel){
        this.level = level;
        this.message = message;
        this.createdAt = new Date();

    }

    static fromJson = (json: any): logEntity =>{
        JSON.parse(json);
        const {message, level, createdAt} = json;
        const log = new logEntity(message, level);
        log.createdAt = new Date(createdAt);
        return log;
    }
    
}