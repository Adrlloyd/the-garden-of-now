import './NavBar.css';

function NavBar({showBack, onBackClick}) {
 
  return (
    <div className="navbar-container">
      {showBack && (
        <button id="back-button" onClick={onBackClick}>
          Back
        </button>
      )}
      
    </div>
  )
}

export default NavBar





