  import '../styles/NavBar.css';
  import type { NavbarProps } from '../types/navbar';
  
  function NavBar({showBack, onBackClick, showFavourites, onFavouritesClick}: NavbarProps) {
  
    return (
      <div className="navbar-container">
        <button id="back-button" className={`button ${showBack ? 'show' : ''}`} onClick={onBackClick}>
          Back
        </button>
        <button id="favourites-button" className={`button ${showFavourites ? 'show' : ''}`} onClick={onFavouritesClick}>
          Favourites
        </button>
      </div>
    )
  }
    
  export default NavBar





