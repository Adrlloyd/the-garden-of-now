import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MethodCard from '../../components/MethodCard';
import { MethodStep } from '../../types/method';

// mockStep representing a recipe instruction
 const mockStep = {
  heading: 'Step 1',
  body: 'Mix the ingredients in a bowl',
 };

 // check that heading and body are displayed
 test('displays the method step handing and body', ()=> {
  render(<MethodCard step={mockStep}/>)

  //check that heading and body appear un the dom

  expect(screen.getByRole('heading', {name: /step 1/i})).toBeInTheDocument();
  expect(screen.getByText(/Mix the ingredients/i)).toBeInTheDocument();
 })