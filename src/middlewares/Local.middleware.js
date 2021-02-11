import { Middleware } from '../core/Middleware';

export class LocalMiddleware extends Middleware {

    constructor() {
        super('Local');
    }

    local() {
        this.router.use((req, res, next) => {
            req.local = {};
            return next();
        });
    }

}