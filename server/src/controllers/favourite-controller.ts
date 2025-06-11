'use strict';

import { Context } from "koa";
import pluralize from "pluralize";

import { Favourites, FavouriteInt, IngredientInt } from '../models/favourite-model';

type SeasonalIngredients = {
  seasonalIngredients: string[];
}

const standardizeIngredient = (name: string) => {
  return pluralize.singular(name.toLowerCase());
}

const getFavouritesBySeason = async (ctx: Context) => {
  const { seasonalIngredients } = ctx.request.body as SeasonalIngredients;
  const standardizedIngredients = seasonalIngredients.map(standardizeIngredient);
  try {
    const allFavourites = await Favourites.find();
    console.log("Filtering favourites for:", seasonalIngredients);
    const filteredRecipes = allFavourites.filter((recipe) => {
      return recipe.ingredients.every((ingredient) => {
        const ingredientName = standardizeIngredient(ingredient.name as string);
        return standardizedIngredients.includes(ingredientName);
      })
    })
    if (filteredRecipes.length === 0) {
      ctx.status = 404;
      ctx.body = { error: 'The database does not contain any favourite recipes' };
      return;
    }
    ctx.body = filteredRecipes;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}

const postFavourite = async (ctx: Context) => {
  try {
    const favourite = ctx.request.body as FavouriteInt;
    const existing = await Favourites.findOne({ name: favourite.name });
    if (existing) {
      ctx.status = 409;
      ctx.body = { error: 'The database already contains this recipe' };
      return;
    }
    const newFavourite = await Favourites.create(favourite);
    ctx.status = 201;
    ctx.body = newFavourite;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}

const deleteFavourite = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const deleted = await Favourites.findByIdAndDelete(id);
    if (!deleted) {
      ctx.status = 404;
      ctx.body = { error: 'Recipe not found.' };
      return;
    }
    ctx.status = 200;
    ctx.body = { message: 'Favourite recipe deleted successfully.', deleted };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}

export { getFavouritesBySeason, postFavourite, deleteFavourite };