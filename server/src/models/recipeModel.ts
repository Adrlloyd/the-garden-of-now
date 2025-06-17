'use strict';

import {mongoose} from './db';

const {Schema, model} = mongoose;

interface IngredientsInt {
  name: string,
  measure: string,
  number: number
}

interface MethodInt {
  heading: string,
  body: string
}

interface RecipesInt {
  name: string,
  image: string,
  mealType: string,
  preparationTime: number,
  difficulty: string,
  servings: number,
  description: string,
  ingredients: IngredientsInt[],
  method: MethodInt[]
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

const Recipes = model('recipe', RecipesSchema)

export { Recipes, RecipesInt, IngredientsInt }