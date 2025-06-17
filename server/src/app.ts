'use strict';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import cors from '@koa/cors';

import { ingredientRouter } from './routers/ingredientRouter';
import { recipeRouter } from './routers/recipeRouter';
import { favouriteRouter } from './routers/favouriteRouter';
import { config } from './config';

const app = new Koa();

app.use(cors());
app.use(serve(config.path))
app.use(bodyParser());
app.use(ingredientRouter.routes());
app.use(recipeRouter.routes());
app.use(favouriteRouter.routes());

export default app;