import './RecipeDetail.css';

const URL = import.meta.env.VITE_API_URL

function RecipeDetail({selectedRecipe}) {

  const name = selectedRecipe.name;
  const imagePath = selectedRecipe.image;
  const mealType = selectedRecipe.mealType;
  const preparationTime = selectedRecipe.preparationTime;


  return (
    <div className="recipe-detail-container">
      <img id="recipe-image" src={`${URL}${imagePath}`} alt={name}/>
      <h4 id="recipe-title">{name}</h4>
      <p id="recipe-meal-type">{mealType}</p>
      <p id="recipe-prep-time">Prep Time: {preparationTime} mins</p>
    </div>
  )
}

export default RecipeDetail