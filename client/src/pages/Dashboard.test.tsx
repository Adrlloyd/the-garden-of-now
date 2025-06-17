import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import { VIEWS } from  '../view/views';
jest.mock('../config', () => ({
  API_URL: '',
}));


test('renders home componente when view is home', () => {
  render(
    <Dashboard
    view={VIEWS.HOME} 
    setView={jest.fn()} 
    setPreviousView={jest.fn()} 
    seasonalIngredients={[]} 
    month='june'
    />
  )

  expect(screen.getByText(/WELCOME TO THE GARDEN/i)).toBeInTheDocument();
})


test('renders RecipeList component when view is RECIPE_LIST', () => {
  render(
    <Dashboard
    view={VIEWS.RECIPE_LIST} 
    setView={jest.fn()} 
    setPreviousView={jest.fn()} 
    seasonalIngredients={[]} 
    month='june'
    />
  )

  expect(screen.getByText(/RECIPES FOR june/i)).toBeInTheDocument();
})

test('renders fallback when selectedRecipe is null and view is RECIPE_DETAIL', () => {
  render(
    <Dashboard
    view={VIEWS.RECIPE_DETAIL} 
    setView={jest.fn()} 
    setPreviousView={jest.fn()} 
    seasonalIngredients={[]} 
    month='june'
    />
  )

  expect(screen.getByText(/No recipe selected/i)).toBeInTheDocument();
})

test('renders favourites list when view is FAVOURITES_LIST', () => {
  render(
    <Dashboard
    view={VIEWS.FAVOURITES_LIST} 
    setView={jest.fn()} 
    setPreviousView={jest.fn()} 
    seasonalIngredients={[]} 
    month='june'
    />
  )

  expect(screen.getByText(/YOUR FAVOURITE RECIPES/i)).toBeInTheDocument();
})