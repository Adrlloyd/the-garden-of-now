'use strict';

import {mongoose} from './db';

const {Schema, model} = mongoose;

interface IngredientInt {
  name: string,
  measure: string,
  number: number
}

interface MethodInt {
  heading: string,
  body: string
}

interface FavouriteInt {
  name: string,
  image: string,
  mealType: string,
  preparationTime: number,
  difficulty: string,
  servings: number,
  description: string,
  ingredients: IngredientInt[],
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

const FavouritesSchema = new Schema({
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

const Favourites = model('favourite', FavouritesSchema)

export { Favourites, FavouriteInt, IngredientInt }