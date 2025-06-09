import './RecipeCard.css';

const URL = import.meta.env.VITE_API_URL

function RecipeCard({recipe}) {

  return (
    <div className="recipe-card-container">
      <div className="recipe-card-top-div">
        <img id="recipe-image" src={`${URL}${recipe.image}`} alt={recipe.name}/>
        <h4 id="recipe-title">{recipe.name}</h4>
      </div>
      <div className="recipe-card-bottom-div">
        <p id="recipe-meal-type">{recipe.mealType}</p>
        <p id="recipe-prep-time">Prep Time: {recipe.preparationTime} mins</p>
      </div>
    </div>
  )
}

export default RecipeCard