import log4js from 'log4js';

export const logger = log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: './logs/application.log',
            maxLogSize: 10 * 1024 * 1024, // = 10Mb
            backups: 5, // keep five backup files
            compress: true, // compress the backups
            encoding: 'utf-8',
            mode: 0o0640,
            flags: 'w+',
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c - %m',
            },
        },
        dateFile: {
            type: 'dateFile',
            filename: './logs/application.session.log',
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c - %m',
            },
            compress: true
        },
        console: {
            type: 'console',
            level: 'debug',
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c - %m',
            },
        }
    },
    categories: {
        default: {
            appenders: ['file', 'dateFile', 'console'],
            level: 'trace'
        }
    }
});

const level = process.env.NODE_ENV === "production" ? 'info' : 'debug';

log4js.getLogger().level = level;