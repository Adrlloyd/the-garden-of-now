'use strict'

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import cors from '@koa/cors';

import { ingredientRouter } from './routers/ingredient-router';
import { recipeRouter } from './routers/recipe-router'
import { config } from './config'

const app = new Koa();
const PORT = config.port

app.use(cors());
app.use(serve(config.path))
app.use(bodyParser());
app.use(ingredientRouter.routes());
app.use(recipeRouter.routes());

app.listen(PORT);

console.log(`Server listening on port ${PORT}`);