import '../styles/RecipeCard.css';
import { API_URL } from '../config';
import type { Recipe } from '../types/recipe';

type RecipeCardProps = {
  recipe: Recipe;
  isFavourite: boolean;
  addToFavourites: (recipe: Recipe) => void;
  deleteFromFavourites: (recipe: Recipe) => void;
  fireRecipeResponse: (recipe: Recipe) => void;
};

function RecipeCard({recipe, isFavourite, addToFavourites, deleteFromFavourites, fireRecipeResponse}: RecipeCardProps) {

  const updateFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isFavourite) {
      deleteFromFavourites(recipe);
    } else {
      addToFavourites(recipe);
    }
  };

  return (
    <div className="recipe-card-container" onClick={() => {fireRecipeResponse(recipe)}}>
      <button id="favourites-card-toggle" onClick={updateFavourites}>
        {isFavourite ? '-' : '+'}
      </button>
      <div className="recipe-card-top-div">
        <img id="recipe-image" src={`${API_URL}${recipe.image}`} alt={recipe.name}/>
        <h4 id="recipe-title">
          {recipe.name}
        </h4>
      </div>
      <div className="recipe-card-bottom-div">
        <p id="recipe-prep-time">
          Prep Time: {recipe.preparationTime} mins
        </p>
        <p id="recipe-meal-type">
          {recipe.mealType}
        </p>
      </div>
    </div>
  )
}

export default RecipeCard;