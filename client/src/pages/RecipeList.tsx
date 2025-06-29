import '../styles/RecipeList.css';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../types/recipe';

type RecipeListProps = {
  title: string;
  recipes: Recipe[];
  favouriteRecipes: Recipe[];
  addToFavourites: (recipe: Recipe) => void;
  deleteFromFavourites: (recipe: Recipe) => void;
  fireRecipeResponse: (recipe: Recipe) => void;
};

function RecipeList({
  title,
  recipes,
  favouriteRecipes,
  addToFavourites,
  deleteFromFavourites,
  fireRecipeResponse
}: RecipeListProps) {

  return (
    <div className="recipe-list-container">
      <div id="recipe-list-title">
        {
          title === 'favourite'
            ? <h2>YOUR {title.toUpperCase()} RECIPES</h2>
            : <h2>RECIPES FOR {title.toUpperCase()}</h2>
        }
      </div>
      <div id="recipe-list-list">
        {
          recipes.length === 0
            ? (<p className="empty-message">
              {title === 'favourite'
                ? "You haven't added any favourite recipes yet."
                : `No seasonal recipes found for ${title}.`
              }
            </p>)
            : (recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                isFavourite={(favouriteRecipes || []).some(existingRecipe => existingRecipe._id === recipe._id)}
                addToFavourites={addToFavourites}
                deleteFromFavourites={deleteFromFavourites}
                fireRecipeResponse={fireRecipeResponse}
              />
            )))
        }
      </div>
    </div>
  );
}

export default RecipeList;