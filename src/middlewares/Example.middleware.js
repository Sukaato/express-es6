import { Middleware } from '../core/Middleware';

export class ExampleMiddleware extends Middleware {

    constructor() {
        super('Example');
    }

    example() {
        this.router.use((req, res, next) => {
            this.logger.info('Example Middleware connected to router');
            return next();
        });
    }

    _privateMethod() {
        // Some code logic here.
    }

}