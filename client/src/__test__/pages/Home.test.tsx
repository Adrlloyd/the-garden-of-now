import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/Home';
import userEvent from '@testing-library/user-event';

test('calls fireButtonResponse when is clicked', async () => {
  const fireButtonResponseMock = jest.fn();

  render(<Home fireButtonResponse={fireButtonResponseMock}/>)

  const btn = screen.getByRole('button', {name: /TICKLE MY TASTEBUDS/i});
  await userEvent.click(btn);

  expect(fireButtonResponseMock).toHaveBeenCalledTimes(1);

})