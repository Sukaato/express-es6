import { Middleware } from './Middleware';

export class Router extends Middleware {

    /** 
     * @param {string} name Name 
     * @param {string} [path] 
     */
    constructor(name, path) {
        super(name);
        this.path = `/${(path ?? name).toLowerCase()}`;
    }

}
