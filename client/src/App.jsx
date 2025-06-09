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
  // Implement this logic when previousView necessary for Favorites screen: const [previousView, setPreviousView] = useState(null);

  function getNavbarConfig(view) {
    switch (view) {
      case VIEWS.HOME:
        return { showBack: false, backTarget: null};
      case VIEWS.RECIPE_LIST:
        return { showBack: true, backTarget: VIEWS.HOME};
      case VIEWS.RECIPE_DETAIL:
        return { showBack: true, backTarget: VIEWS.RECIPE_LIST};
      // Add Favorites logic in here when appropriate
      default:
        return { showBack: false, backTarget: null, showFavorites: true };
    }
  }

  const { showBack , backTarget } = getNavbarConfig(view);

  return (
    <div className="app-container">
      <NavBar
        showBack={showBack}
        onBackClick={() => {setView(backTarget)}}
        // showFavourites={showFavourites}
        // onFavoritesClick={() => {}}
      />
      <Dashboard
        view={view}
        setView={setView}
        seasonalIngredients={seasonalIngredients}
      />
    </div>
  )
}

export default App
