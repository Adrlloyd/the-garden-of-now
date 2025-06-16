import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientCard from './IngredientCard';
import { Ingredient } from '../types/ingredients';

// mock ingredient obj

const mockIngredient: Ingredient = {
  name: 'Sugar',
  measure: 'grams',
  number: 100,
}

// test if the ingredient text displayed correctly
 test('displays the ingredients info', () => {
  render(<IngredientCard ingredient= {mockIngredient}/>)

  expect(screen.getByText(/100 grams of sugar/i)).toBeInTheDocument();
 });