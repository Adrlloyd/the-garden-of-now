'use strict';

import {mongoose} from './db';

const {Schema, model} = mongoose;

type Ingredient = {
  name: String,
  measure: String,
  number: Number,
}

const IngredientsSchema = new Schema({
  name: String,
  measure: String,
  number: Number
})

const MethodSchema = new Schema({
  heading: String,
  body: String 
})

const RecipesSchema = new Schema({
  name: String,
  image: String,
  mealType: String,
  preparationTime: Number,
  difficulty: String,
  servings: Number,
  description: String,
  ingredients: [IngredientsSchema],
  method: [MethodSchema]
})

const Recipe = model('recipe', RecipesSchema)

export {Recipe}