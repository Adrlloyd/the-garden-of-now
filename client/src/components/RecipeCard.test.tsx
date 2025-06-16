// render: renders the component in a test environment (simulates the browser)
// screen: provides access to the rendered DOM for querying elements
// fireEvent: simulates user events like clicks, typing, etc.
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../config', () => ({
  API_URL: '',
})); // This replaces the real API_URL from config with an empty string,so the test doesn't crash because Jest can't read import.meta.env (it's a Vite feature).
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

// Check that clicking the + button calls the addToFavourites function with the recipe.

test('calls addToFavourites when + btn is clicked', ()=> {
  //creat mocj fn 
  const addToFavouritesMock = jest.fn();

  render(
  <RecipeCard
  recipe={mockRecipe}
  isFavourite={false}
  addToFavourites= {addToFavouritesMock}
  deleteFromFavourites={jest.fn()}
  fireRecipeResponse={jest.fn()} 
  />
)
 const btn = screen.getByRole('button', {name: '+'});

 // simulate user click btn

 fireEvent.click(btn);

 
 expect(addToFavouritesMock).toHaveBeenCalledTimes(1);
 expect(addToFavouritesMock).toHaveBeenCalledWith(mockRecipe);

})

// Check that clicking the - button calls the deleteFromFavourites function. 

test('calls deleteFromFavorites when - btn is clicked', ()=> {
  //creat mocj fn 
  const deleteFromFavouritesMock = jest.fn();

  render(
  <RecipeCard
  recipe={mockRecipe}
  isFavourite={true}
  addToFavourites= {jest.fn()}
  deleteFromFavourites={deleteFromFavouritesMock}
  fireRecipeResponse={jest.fn()} 
  />
)
 const btn = screen.getByRole('button', {name: '-'});

 // simulate user click btn

 fireEvent.click(btn);

 
 expect(deleteFromFavouritesMock).toHaveBeenCalledTimes(1);
 expect(deleteFromFavouritesMock).toHaveBeenCalledWith(mockRecipe);

})

// Test that clicking on the recipe card container calls fireRecipeResponse

test('calls fireRecipeResponse when the card is clicked', () => {
  const fireRecipeResponseMock = jest.fn()

  render(
  <RecipeCard
  recipe={mockRecipe}
  isFavourite={true}
  addToFavourites= {jest.fn()}
  deleteFromFavourites={jest.fn()}
  fireRecipeResponse={fireRecipeResponseMock} 
  />
)
const cardContainer = screen.getByTestId('recipe-card'); //A data-testid="recipe-card" was added to the component RecipeCard.tsx
 fireEvent.click(cardContainer);
 expect(fireRecipeResponseMock).toHaveBeenCalledWith(mockRecipe);
})