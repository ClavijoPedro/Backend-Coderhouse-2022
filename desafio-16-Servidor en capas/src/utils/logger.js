import winston, { format } from "winston";
import path from 'path'

const logger = winston.createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf( log => `[${log.level}] - [${log.timestamp}] - ${log.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level:'info',
        }),
        new winston.transports.File({
            filename:path.join(process.cwd(),'./logs/warn.log'),
            level:'warn'
        }),
        new winston.transports.File({
            filename:path.join(process.cwd(),'./logs/error.log'),
            level:'error' 
        })
    ]

})

export {logger}