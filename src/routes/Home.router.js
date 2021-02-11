import { Router } from '../core/Router';

export class Home extends Router {

    constructor() {
        super('Home', '/');
    }

    displayHome() {
        this.router.get('/', (req, res, next) => {
            return res.json({ 
                title: 'Express with es6' ,
                author: {
                    name: 'Vaumoron Julien',
                    url: 'https://github.com/Sukaato',
                    web: 'https://sukaato.github.io'
                }
            });
        });
    }
}