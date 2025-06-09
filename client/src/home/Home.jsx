import './Home.css';

function Home({onButtonClick}) {

  return (
    <div className="home-container">
      <h1 id="title">
        WELCOME TO THE GARDEN OF NOW
      </h1>
      <p id="introduction">
        
      </p>
      <button id="recipe-button" onClick={onButtonClick}>
        TICKLE MY TASTEBUDS
      </button>
    </div>
  )
}

export default Home





