import { IpParserMiddleware } from './IpParser.middleware';
import { LocalMiddleware } from './Local.middleware';
import { LoggerMiddleware } from './Logger.middleware';

export const middlewares = [
    LocalMiddleware,
    IpParserMiddleware,
    LoggerMiddleware,
]