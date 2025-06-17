'use strict';

import Router from 'koa-router';

import { getIngredientsBySeason } from '../controllers/ingredientController';

const ingredientRouter = new Router();

ingredientRouter.get('/ingredients/:month', getIngredientsBySeason);

export { ingredientRouter };