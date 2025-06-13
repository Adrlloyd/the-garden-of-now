import { API_URL } from '../config';

type Ingredient = {
  name: string;
  measure: string;
  number: number;
};

type MethodStep = {
  heading: string;
  body: string;
};

export type Recipe = {
  _id: string;
  name: string;
  image: string;
  mealType: string;
  preparationTime: number;
  difficulty: string;
  servings: number;
  description: string;
  ingredients: Ingredient[];
  method: MethodStep[];
};

export const fetchRecipes = async (seasonalIngredients: string[]): Promise<Recipe[]> => {
  const url = `${API_URL}/recipes`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seasonalIngredients })
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return await response.json();
};

export const fetchFavourites = async (seasonalIngredients: string[]): Promise<Recipe[]> => {
  const url = `${API_URL}/favourites`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seasonalIngredients })
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return await response.json();
};

export const addFavourite = async (recipe: Recipe): Promise<Recipe> => {
  const url = `${API_URL}/favourite`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe)
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return await response.json();
};

export const deleteFavourite = async (recipeId: string): Promise<void> => {
  const url = `${API_URL}/favourite/${recipeId}`;
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};