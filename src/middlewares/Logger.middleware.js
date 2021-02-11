import { Middleware } from '../core/Middleware';

export class LoggerMiddleware extends Middleware {

    constructor() {
        super('Logger');
    }

    log() {
        this.router.use((req, res, next) => {
            const { ip } = req.local;
            const {
                method,
                originalUrl
            } = req;

            this.logger.info(`[${ip}] [${method}] : ${originalUrl}`);

            return next();
        });
    }
}