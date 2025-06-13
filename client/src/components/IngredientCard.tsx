/// <reference types="react" />
import '../styles/IngredientCard.css';
import type { Ingredient } from '../types/ingredients';



type IngredientCardProps = {
  ingredient: Ingredient;
};

function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div className="ingredient-card-container">
      <p>{ingredient.number} {ingredient.measure} of {ingredient.name}</p>
    </div>
  );
}

export default IngredientCard;
