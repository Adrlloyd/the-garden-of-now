'use strict';

import { Context } from "koa";

import { SeasonalIngredients, NonSeasonalIngredients, SeasonalIngredientsInt, NonSeasonalIngredientsInt } from '../models/ingredient-model';

type FoodGroupKeys = 'vegetables' | 'fruit' | 'nutsAndHerbs' | 'meat' | 'fish';

const getIngredientsBySeason = async (ctx: Context) => {
  const { month } = ctx.params;
  try {    
    const seasonalIngredientsMaster = await SeasonalIngredients.findOne({"month": month.toLowerCase()}) as SeasonalIngredientsInt;
    const nonSeasonalIngredientsMaster = await NonSeasonalIngredients.findOne({"month": "universal"}) as NonSeasonalIngredientsInt;
    if (!seasonalIngredientsMaster || !nonSeasonalIngredientsMaster) {
      ctx.status = 400;
      ctx.body = { error: 'Please specify a correct month.' };
      return;
    }
    const foodGroupKeys : FoodGroupKeys[] = ['vegetables', 'fruit', 'nutsAndHerbs', 'meat', 'fish'];
    console.log('seasonalIngredientsMaster:', seasonalIngredientsMaster);
    const seasonalIngredientsCollated = foodGroupKeys.flatMap((key) => {return seasonalIngredientsMaster[key] || [] });
    const totalIngredientsCollated = [...seasonalIngredientsCollated, ...nonSeasonalIngredientsMaster['ingredients']];
    ctx.body = totalIngredientsCollated;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
}

export { getIngredientsBySeason };