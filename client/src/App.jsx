import { useState, useEffect } from 'react';
import './App.css';
import { VIEWS } from './view/views.js';
import NavBar from './navbar/NavBar.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

function App() {

  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  
  const [month] = useState(months[new Date().getMonth()]);
  const [seasonalIngredients, setSeasonalIngredients] = useState([]);
  
  useEffect(() => {
    const fetchIngredients = async () => {
      const url = `http://127.0.0.1:3000/ingredients/${month}`;
      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        };
        const body = await response.json();
        console.log(body);
        setSeasonalIngredients(body);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIngredients();
  }, [month]);

  const [view, setView] = useState('home');
  const [previousView, setPreviousView] = useState(null);

  function getNavbarConfig(view) {
    switch (view) {
      case VIEWS.HOME:
        return { showBack: false, backTarget: null, showFavourites: true};
      case VIEWS.RECIPE_LIST:
        return { showBack: true, backTarget: VIEWS.HOME, showFavourites: true};
      case VIEWS.RECIPE_DETAIL:
        return { showBack: true, backTarget: VIEWS.RECIPE_LIST, showFavourites: true};
      case VIEWS.FAVOURITES_LIST:
        return { showBack: true, backTarget: previousView || VIEWS.HOME, showFavourites: false };
      default:
        return { showBack: false, backTarget: null, showFavourites: true };
    }
  }

  const { showBack , backTarget, showFavourites } = getNavbarConfig(view);

  return (
    <div className="app-container">
      <NavBar
        showBack={showBack}
        onBackClick={() => {setView(backTarget)}}
        showFavourites={showFavourites}
        onFavouritesClick={() => {
          setPreviousView(view);
          setView(VIEWS.FAVOURITES_LIST)
        }}
      />
      <Dashboard
        month={month}
        view={view}
        setView={setView}
        setPreviousView={setPreviousView}
        seasonalIngredients={seasonalIngredients}
      />
    </div>
  )
}

export default App
