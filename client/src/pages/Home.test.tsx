import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

test('calls fireButtonResponse when is clicked', () => {
  const fireButtonResponseMock = jest.fn();

  render(<Home fireButtonResponse={fireButtonResponseMock}/>)

  const btn = screen.getByRole('button', {name: /TICKLE MY TASTEBUDS/i});
  fireEvent.click(btn);

  expect(fireButtonResponseMock).toHaveBeenCalledTimes(1);

})