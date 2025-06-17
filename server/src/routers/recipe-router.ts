'use strict';

import Router from 'koa-router'

import { getRecipesBySeason } from '../controllers/recipeController';

const recipeRouter = new Router()

recipeRouter.post('/recipes', getRecipesBySeason)

export { recipeRouter };