export type Recipe = {
  _id: string;
  name: string;
  image: string;
  mealType: string;
  preparationTime: number;
  difficulty: string;
  servings: number;
  description: string;
  ingredients: {
    name: string;
    measure: string;
    number: number;
  }[];
  method: {
    heading: string;
    body: string;
  }[];
};

export type RecipeDetailProps = {
  isFavourite: boolean;
  selectedRecipe: Recipe;
  addToFavourites: (recipe: Recipe) => void;
  deleteFromFavourites: (recipe: Recipe) => void;
};
