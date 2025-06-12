import './NavBar.css';

function NavBar({showBack, onBackClick, showFavourites, onFavouritesClick}) {
 
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





