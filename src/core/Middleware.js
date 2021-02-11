import { Router } from 'express';
import { logger } from './utils/Logger';

export class Middleware {

    /** @param {string} name */
    constructor(name) {
        this.name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
        this.router = Router();
        this.logger = logger.getLogger(this.name);
    }
}