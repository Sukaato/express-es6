import { Router } from 'express';
import { logger } from '../utils/logger';

const log = logger.getLogger("[LOGGER] [CLIENT]");
export const loggerMiddleware = Router();

loggerMiddleware.use((req, res, next) => {
    const { ip } = req.local;
    const {
        method,
        url
    } = req;

    log.info(`[${ip}] [${method}] : ${url}`);

    return next();
});