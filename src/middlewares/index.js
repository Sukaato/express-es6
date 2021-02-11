import { localMiddleware } from "./local.middleware";
import { loggerMiddleware } from "./logger.middleware";

export const middleware = {
    local: localMiddleware,
    logger: loggerMiddleware
}