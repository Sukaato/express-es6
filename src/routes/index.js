import { ExampleMiddleware } from '../middlewares/Example.middleware';
import { Errors } from './Errors.router';
import { Home } from './Home.router';
import { Users } from './Users.router';

export const router = [
  Home,
  [ ExampleMiddleware, Users ],
  Errors
];