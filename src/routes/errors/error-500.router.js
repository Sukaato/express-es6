import { Router } from "express";
import { logger } from '../../utils/logger';

const log = logger.getLogger("[ROUTER] Error 500");

export const error500Router = Router();

error500Router.use((err, req, res, next) => {
    const { ip } = req.local;
    log.info(`[${ip}]`, req.originalUrl);
    log.error(err.stack);

    return res.status(500).json({
        message: "Internal server Error", 
        error: err.stack,
        code: 500
    });
})