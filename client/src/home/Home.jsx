import './Home.css';

function Home({fireButtonResponse}) {

  return (
    <div className="home-container">
      <div id="intro">
        <h1>
          WELCOME TO THE GARDEN<br/>OF NOW
        </h1>
        <p>
          Life is full of big questions... like 'what's for dinner tonight?'.
        </p>
        <p>
          Eating green and supporting local farmers and growers is hard work. We've all been short on inspiration at times. Which is where we come in.
        </p>
        <p>
          Click below for recipe ideas tailored to right here, right now.
        </p>
      </div>
      <div id="recipe-button">
        <button  onClick={fireButtonResponse}>
            TICKLE MY TASTEBUDS
        </button>
      </div>
    </div>
  )
}

export default Home





