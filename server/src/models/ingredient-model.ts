'use strict';

import {mongoose} from './db';

const {Schema, model} = mongoose;

const baseOptions = {
  discriminatorKey: 'type',
  collection: 'ingredients',
};

interface IngredientsInt extends Document {
  month: string;
}

interface SeasonalIngredientsInt extends IngredientsInt {
  vegetables: string[];
  fruit: string[];
  nutsAndHerbs: string[];
  meat: string[];
  fish: string[];
}

interface NonSeasonalIngredientsInt extends IngredientsInt {
  ingredients: string[];
}

const BasicIngredientsSchema = new Schema <IngredientsInt> (
  {
    month: String,
  },
  baseOptions
);

const SeasonalIngredientsSchema = new Schema <SeasonalIngredientsInt> ({
  vegetables: [String],
  fruit: [String],
  nutsAndHerbs: [String],
  meat: [String],
  fish: [String],
});

const NonSeasonalIngredientsSchema = new Schema <NonSeasonalIngredientsInt> ({
  ingredients: [String]
})

const Ingredients = model('ingredient', BasicIngredientsSchema);
const SeasonalIngredients = Ingredients.discriminator('seasonal', SeasonalIngredientsSchema);
const NonSeasonalIngredients = Ingredients.discriminator('non-seasonal', NonSeasonalIngredientsSchema);

export {SeasonalIngredients, NonSeasonalIngredients, SeasonalIngredientsInt, NonSeasonalIngredientsInt};