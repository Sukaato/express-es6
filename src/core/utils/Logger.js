import log4js from 'log4js';
import { loggerConfig } from './Logger.config';


class Logger {

    constructor() {
        const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

        this.logger = log4js.configure(loggerConfig);
        this.logger.levels = level;
    }

    /** @param {string} name */
    getLogger(name) {
        return this.logger.getLogger(name);
    }
}

export const logger = new Logger();