import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import type { NavbarProps } from '../types/navbar';

// test the NavBar render both btns and calls the correct function

test('renders back and favourites buttons and handles clicks', ()=> {
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

  expect(screen.getByText(/Back/i)).toBeInTheDocument();
  expect(screen.getByText(/Favourites/i)).toBeInTheDocument();

  // simulate clicking btn

  fireEvent.click((screen.getByText(/Back/i)));
  fireEvent.click((screen.getByText(/Favourites/i)));
  // check if is call just one time
  expect(onBackClickMoch).toHaveBeenCalledTimes(1);
   expect(onFavouritesClickMock).toHaveBeenCalledTimes(1);

})