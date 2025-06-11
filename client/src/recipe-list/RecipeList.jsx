import './RecipeList.css';
import RecipeCard from '../recipe-card/RecipeCard';

function RecipeList({title, recipes, favouriteRecipes, addToFavourites, deleteFromFavourites, fireRecipeResponse}) {
  
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
                  ? "You haven’t added any favourite recipes yet."
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
  )
}

export default RecipeList