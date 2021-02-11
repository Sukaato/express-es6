import { Router } from 'express';
import { logger } from '../utils/logger';

const log = logger.getLogger("[LOGGER] [CLIENT]");
export const localMiddleware = Router();

localMiddleware.use((req, res, next) => {
    req.local = {};

    return next();
});