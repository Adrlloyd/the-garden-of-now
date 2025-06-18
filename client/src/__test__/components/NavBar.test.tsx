import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../../components/NavBar';
import userEvent from '@testing-library/user-event';
import type { NavbarProps } from '../../types/navbar';

// test the NavBar render both btns and calls the correct function

test('renders back and favourites buttons and handles clicks', async ()=> {
  const onBackClickMoch = jest.fn();
  const onFavouritesClickMock = jest.fn();
  render(
    <NavBar
     showBack = {true}
     onBackClick = {onBackClickMoch}
     showFavourites ={true}
     onFavouritesClick = {onFavouritesClickMock}
  />
  )

  // check if the btns are in the doc

  expect(screen.getByRole('button', {name:/Back/i})).toBeInTheDocument();
  expect(screen.getByRole('button', {name:/Favourites/i })).toBeInTheDocument();

  // simulate clicking btn

 await userEvent.click(screen.getByRole('button', {name:/Back/i}));
 await userEvent.click(screen.getByRole('button', {name:/Favourites/i }));
  // check if is call just one time
  expect(onBackClickMoch).toHaveBeenCalledTimes(1);
   expect(onFavouritesClickMock).toHaveBeenCalledTimes(1);

})