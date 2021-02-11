import { Middleware } from '../core/Middleware';

export class IpParserMiddleware extends Middleware {

    constructor() {
        super('IP Parser');
    }

    parse() {
        this.router.use((req, res, next) => {
            const ip = (req.ip === '::1')
                ? '127.0.0.1' 
                : req.ip.replace('::ffff:', '');

            req.local.ip = ip;

            return next();
        });
    }

}