import cookieParser from 'cookie-parser';
import express, { json, static as exStatic, urlencoded } from 'express';
import helmet from 'helmet';
import { join } from 'path';
import { Middleware } from './Middleware';
import { Router } from './Router';
import { logger } from './utils/Logger';
import { Color } from './utils/Color';

export class Application {

    constructor() {
        this.logger = logger.getLogger(this.constructor.name);
        this.privateMethod = new RegExp(/(^_|_$)/g);
        this.path_method = /\.(?<method>\w*)\('(?<path>.*)'/m;
        this.PORT = process.env.PORT || 3000;
        this.ENV = process.env.NODE_ENV || 'development';
        /** @type {Middleware.prototype[]} */
        this.middlewares = [];
        /** @type {Router.prototype[]} */
        this.routers = [];

        this.server = express();
        this.server.use(json());
        this.server.use(urlencoded({
            extended: false
        }));
        this.server.use(cookieParser());
        this.server.use(helmet());

        this.server.set('trust proxy', true);
        this.server.disable('x-powered-by');
    }

    /** @private @method */
    connectMiddlewares_() {
        this.middlewares.forEach(middleware => {
            const { router } = this.connectRoute_(middleware);
            this.server.use(router);
        });
    }

    /** @private @method */
    connectRouters_() {
        this.routers.forEach(routes => {
            if (Array.isArray(routes)) {
                const routers = routes.map(route => this.connectRoute_(route));
                const { path } = routers.find(route => route.path);
                const router = routers.map(route => route.router);
                const url = `${this.prefix ? this.prefix : ''}${path}`;

                this.server.use(url, ...router);
            } else {
                const { path, router } = this.connectRoute_(routes);
                if (path) {
                    const url = `${this.prefix ? this.prefix : ''}${path}`;
                    this.server.use(url, router);
                } else {
                    this.server.use(router);
                }
            }
        });
    }

    /** 
     * @private @method
     * @param {Middleware | Router} Clazz 
     * @returns {Router}
     */
    connectRoute_(Clazz) {
        /** @type {Router} */
        const Route = new Clazz();
        this.log_(Route);

        Object.getOwnPropertyNames(Route.__proto__)
            .filter(method => !this.privateMethod.test(method) && method !== 'constructor')
            .forEach(publicMethod => {
                Route[publicMethod]();
                const matcher = this.path_method.exec(Route[publicMethod].toString())?.groups;
                if (matcher) {
                    const { method, path } = matcher;
                    this.logger.info(`${Clazz.name} ${Color.foreground.YELLOW}{'${path}', ${method.toUpperCase()}}`)
                }
            });
        return Route;
    }

    /**
     * @private @method
     * @param {Router} router 
     */
    log_(router) {
        const { prefix } = this;
        const { path, name } = router;
        router instanceof Router
            ? this.logger.info(`Connect router ${prefix ? `${prefix}` : ''}${path && path.length === 1 ? '' : path ?? name}`)
            : this.logger.info(`Connect middleware ${name}`);
    }

    /**
     * @public @method
     * @param {string} engine Name of the view engine you want to use
     * @param {string} [views] By default, the views directory is `public/views` in the root of your project.
     */
    setViewEngine(engine, views = 'views') {
        this.server.use(exStatic(join(__dirname, '../../public')));
        this.server.set('views', join(__dirname, `../../public/${views}`));
        this.server.set('view engine', engine);
    }

    /**
     * 
     * @param {string} prefix
     */
    setApiPrefix(prefix) {
        this.prefix = prefix.indexOf('/') === -1 
            ? `/${prefix}` 
            : prefix;
    }

    /**
     * @public @method
     * @param {number} [port] 
     */
    listen(port) {
        if (port) this.PORT = port;
        this.connectMiddlewares_();
        this.connectRouters_();
        this.server.listen(this.PORT, (err) => {
            if (err) {
                this.logger.error(err);
            } else {
                this.logger.info(`Started in ${this.ENV} environement`);
                this.logger.info(`Server listening on ${Color.foreground.YELLOW}http://localhost:${this.PORT}`);
            }
        })
    }
}