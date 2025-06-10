import './RecipeList.css';
import RecipeCard from '../recipe-card/RecipeCard';

function RecipeList({seasonalRecipes, fireRecipeResponse, month}) {
  
  return (
    <div className="recipe-list-container">
      <h2>RECIPES FOR {month.toUpperCase()}</h2>
      <div id="recipe-list-list">
        {seasonalRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} fireRecipeResponse={fireRecipeResponse}/>
        ))}
      </div>
    </div>
  )
}

export default RecipeList