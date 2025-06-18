import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeDetail from '../../pages/RecipeDetail';
import type { Recipe } from '../../types/recipe';
import userEvent from '@testing-library/user-event';
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

test ('render recipe detail information', () => {
  render(
    <RecipeDetail
    isFavourite={false} 
    selectedRecipe={mockRecipe}
    addToFavourites={jest.fn()} 
    deleteFromFavourites={jest.fn()} 
    />
  );

  expect(screen.getByText(/Zucchini Tart/i)).toBeInTheDocument();
  expect(screen.getByText(/Prep Time: 30 mins/i)).toBeInTheDocument();
  expect(screen.getByText(/easy/i)).toBeInTheDocument();
  expect(screen.getByText(/4/i)).toBeInTheDocument();
  expect(screen.getByText(/A tasty tart made with fresh zucchini and cheese./i)).toBeInTheDocument();

});

test('shows '+' btn and calls addFavourites when clicked', async ()=> {
  const addToFavouritesMock = jest.fn();
  render( 
  <RecipeDetail
   isFavourite={false} 
   selectedRecipe={mockRecipe}
   addToFavourites={addToFavouritesMock} 
   deleteFromFavourites={jest.fn()} 
  />
);
const btn = screen.getByRole('button', {name: '+'});
await userEvent.click(btn);
// check if fun is called 1 time
expect(addToFavouritesMock).toHaveBeenCalledTimes(1);
//verifies that the function was called with the mockRecipe object as argument.
expect(addToFavouritesMock).toHaveBeenCalledWith(mockRecipe);

})

test('shows - btn and calls deleteFromFavourites when clicked', async ()=> {
  const deleteFromFavouritesMock = jest.fn();
  render( 
  <RecipeDetail
   isFavourite={true} 
   selectedRecipe={mockRecipe}
   addToFavourites={jest.fn()} 
   deleteFromFavourites={deleteFromFavouritesMock} 
  />
);
const btn = screen.getByRole('button', {name: '-'});
await userEvent.click(btn);
// check if fun is called 1 time
expect(deleteFromFavouritesMock).toHaveBeenCalledTimes(1);
//verifies that the function was called with the mockRecipe object as argument.
expect(deleteFromFavouritesMock).toHaveBeenCalledWith(mockRecipe);

})