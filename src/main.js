import { Application } from './core/Application';
import { middlewares } from './middlewares';
import { router } from './routes'

function bootstap() {
    const app = new Application();
    app.middlewares = middlewares;
    app.routers = router;
    app.setApiPrefix('api');
    app.listen();
}

bootstap();