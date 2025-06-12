import './IngredientCard.css';

type Ingredient = {
  name: string;
  measure: string;
  number: number;
};

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