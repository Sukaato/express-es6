import { Router } from '../core/Router';

export class Users extends Router {

    constructor() {
        super('Users');
    }

    findAllUser() {
        this.router.get('/', (req, res, next) => {
            return res.json({ message: 'Returns all Users' });
        });
    }

    findUserById() {
        this.router.get('/:id', (req, res, next) => {
            if (req.params.id === 0) return next('route') // Its will pass in `findSpecialUserById` if ID is equals to 0
            return res.json({ message: `Returns User with ID: ${req.params.id}` });
        });
    }

    findSpecialUserById() {
        this.router.get('/:id', (req, res, next) => {
            return res.json({ message: `Returns Special User with ID: ${req.params.id}` });
        });
    }
}