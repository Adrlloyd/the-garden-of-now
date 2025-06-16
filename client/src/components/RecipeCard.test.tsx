// render: renders the component in a test environment (simulates the browser)
// screen: provides access to the rendered DOM for querying elements
// fireEvent: simulates user events like clicks, typing, etc.
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../config', () => ({
  API_URL: '',
})); // 
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

// mockRecipe object representing a real recipe.

const mockRecipe: Recipe = {
  _id: 'abc123',
  name: 'Zucchini Tart',
  image: '/test-image.jpg',
  mealType: 'lunch',
  preparationTime: 30,
  difficulty: 'easy',
  servings: 4,
  description: 'A tasty tart made with fresh zucchini and cheese.',
  ingredients: [{
    name: 'Zucchini',
    measure: 'unit',
    number: 2,
  }],
  method: [{
   heading: 'Preparation',
   body: 'Slice the zucchini and mix with the filling. Bake until golden.'
  }]

};

//  check that the recipe name is displayed in the component

test('displays the recipe name', () => {
render(
  <RecipeCard
  recipe={mockRecipe}
  isFavourite={false}
  addToFavourites={jest.fn()} // fake/mock function 
  deleteFromFavourites={jest.fn()}
  fireRecipeResponse={jest.fn()} 

  />
)
const element = screen.getByText(/Zucchini Tart/i) as HTMLElement;
expect(element).toBeInTheDocument();


});
