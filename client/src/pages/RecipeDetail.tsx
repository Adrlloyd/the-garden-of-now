import '../styles/RecipeDetail.css';
import { API_URL } from '../config';
import IngredientCard from '../components/IngredientCard';
import MethodCard from '../components/MethodCard';
import { RecipeDetailProps } from '../types/recipe';




function RecipeDetail({ isFavourite, selectedRecipe, addToFavourites, deleteFromFavourites }: RecipeDetailProps) {

  const updateFavourites = () => {
    if (isFavourite) {
      deleteFromFavourites(selectedRecipe);
    } else {
      addToFavourites(selectedRecipe);
    }
  };

  return (
    <>
      <div className="recipe-detail-container">

        <div id="recipe-detail-card">
          <button id="favourites-toggle" onClick={updateFavourites}>
            {isFavourite ? '-' : '+'}
          </button>
          <img id="recipe-detail-image" src={`${API_URL}${selectedRecipe.image}`} alt={selectedRecipe.name} />
          <h2 id="recipe-detail-title">{selectedRecipe.name}</h2>
          <div className="recipe-data-container">
            <p id="recipe-detail-meal-type">{selectedRecipe.mealType}</p>
            <p id="recipe-detail-prep-time">Prep Time: {selectedRecipe.preparationTime} mins</p>
            <p id="recipe-detail-difficulty">Difficulty: {selectedRecipe.difficulty}</p>
            <p id="recipe-detail-servings">Servings: {selectedRecipe.servings}</p>
          </div>
          <p id="recipe-detail-description">{selectedRecipe.description}</p>
          <div id="recipe-detail-ingredients-container">
            <h4>You'll need:</h4>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <IngredientCard key={index} ingredient={ingredient} />))}
          </div>
          <div id="recipe-detail-method-container">
            <h4>Method:</h4>
            {selectedRecipe.method.map((step, index) => (
              <MethodCard key={index} step={step} />))}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeDetail;