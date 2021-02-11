import { Color } from './Color';

export const loggerConfig = {
    appenders: {
        file: {
            type: 'file',
            filename: './logs/application.session.log',
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
            filename: './logs/application.log',
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
                pattern: `${Color.foreground.CYAN}[%d{yyyy-MM-dd hh:mm:ss.SSS}] ${Color.RESET}[%p] ${Color.foreground.MAGENTA}%c ${Color.RESET}- ${Color.foreground.GREEN}%m${Color.RESET}`,
            },
        }
    },
    categories: {
        default: {
            appenders: ['file', 'dateFile', 'console'],
            level: 'trace'
        }
    }
};