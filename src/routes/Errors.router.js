import { Middleware } from '../core/Middleware';

export class Errors extends Middleware {

    constructor() {
        super('Error');
    }

    handleNotFound() {
        this.router.use((req, res, next) => {
            return res.status(404).json({
                message: 'The requested resource does not exist !',
                code: 404
            });
        });
    }

    handleInternalServerError() {
        this.router.use((err, req, res, next) => {
            return res.status(500).json({
                message: 'Internal server Error', 
                error: err.stack,
                code: 500
            });
        });
    }
}