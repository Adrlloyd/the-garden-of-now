import './IngredientCard.css';

function IngredientCard({ingredient}) {

  return (
    <div className="ingredient-card-container">
        <p>{ingredient.number} {ingredient.measure} of {ingredient.name}</p>
    </div>
  )
}

export default IngredientCard