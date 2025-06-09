import './RecipeList.css';

function RecipeList({seasonalRecipes, onRecipeClick}) {

  return (
    <div className="recipe-list-container">
      <h3>Recipes for September</h3>
      {seasonalRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} onClick={onRecipeClick}/>))}
    </div>
  )
}

export default RecipeList