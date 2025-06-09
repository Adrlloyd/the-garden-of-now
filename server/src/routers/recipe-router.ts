'use strict';

import Router from 'koa-router'

import { getRecipesBySeason } from '../controllers/recipe-controller';

const recipeRouter = new Router()

recipeRouter.post('/recipes', getRecipesBySeason)

export { recipeRouter };