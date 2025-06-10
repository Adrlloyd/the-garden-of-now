'use strict';

import { Context } from "koa";
import pluralize from "pluralize";

import { Recipes, RecipesInt, IngredientsInt } from '../models/recipe-model';

type SeasonalIngredients = {
  seasonalIngredients: string[];
}

const standardizeIngredient = (name: string) => {
  return pluralize.singular(name.toLowerCase());
}

const getRecipesBySeason = async (ctx: Context) => {
  const {seasonalIngredients} = ctx.request.body as SeasonalIngredients;
  const standardizedIngredients = seasonalIngredients.map(standardizeIngredient);
  try {
    const allRecipes = await Recipes.find();
    const filteredRecipes = allRecipes.filter((recipe) => {
      return recipe.ingredients.every((ingredient) => {
        const ingredientName = standardizeIngredient(ingredient.name as string);
        return standardizedIngredients.includes(ingredientName);
      })
    })
    if (!filteredRecipes) {
      ctx.status = 404;
      ctx.body = { error: 'The database does not contain recipes for this month' };
      return;
    }
    ctx.body = filteredRecipes;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}

export { getRecipesBySeason };