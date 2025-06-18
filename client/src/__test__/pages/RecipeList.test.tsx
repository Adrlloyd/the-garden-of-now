import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeList from '../../pages/RecipeList';
import type { Recipe } from '../../types/recipe';
jest.mock('../../config', () => ({
  API_URL: '',
}));

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

// check if shows message when the recipe list is empty
 test('shows empty message when recipe list is empty', ()=> {
  render (
    <RecipeList 
     title='june'
     recipes={[]}
     favouriteRecipes={[]}
     addToFavourites={jest.fn()}
     deleteFromFavourites={jest.fn()}
     fireRecipeResponse={jest.fn()}
    />
  )
  expect(screen.getByText(/No seasonal recipes found for june/i)).toBeInTheDocument();
 });

 // render recipe card.

  test('render one RecipeCard per recip in the list', ()=> {
  render (
    <RecipeList 
     title='june'
     recipes={[
      mockRecipe,
      {...mockRecipe, _id:'r2',name:'Pumpkin Pie'},
     ]}
     favouriteRecipes={[]}
     addToFavourites={jest.fn()}
     deleteFromFavourites={jest.fn()}
     fireRecipeResponse={jest.fn()}
    />
  );
  expect(screen.getByText(/Zucchini Tart/i)).toBeInTheDocument();
  expect(screen.getByText(/Pumpkin Pie/i)).toBeInTheDocument();
 });

