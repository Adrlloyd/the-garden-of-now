import { useState, useEffect } from 'react';
import './styles/App.css';
import { VIEWS } from './view/views';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import { fetchSeasonalIngredients } from './services/ingredientService';

function App() {

  const months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  const [month] = useState<string>(months[new Date().getMonth()]);
  const [seasonalIngredients, setSeasonalIngredients] = useState<string[]>([]);

  useEffect(() => {
    fetchSeasonalIngredients(month)
      .then(setSeasonalIngredients)
      .catch((error) => {
        console.error('Failed to fetch seasonal ingredients in App.tsx:', error);
      });
  }, [month]);

  const [view, setView] = useState<string>(VIEWS.HOME);
  const [previousView, setPreviousView] = useState<string | null>(null);

  type NavbarConfig = {
    showBack: boolean;
    backTarget: string | null;
    showFavourites: boolean;
  };

  function getNavbarConfig(view: string, previousView: string | null): NavbarConfig {
    switch (view) {
      case VIEWS.HOME:
        return { showBack: false, backTarget: null, showFavourites: true };
      case VIEWS.RECIPE_LIST:
        return { showBack: true, backTarget: VIEWS.HOME, showFavourites: true };
      case VIEWS.RECIPE_DETAIL:
        return { showBack: true, backTarget: VIEWS.RECIPE_LIST, showFavourites: true };
      case VIEWS.FAVOURITES_LIST:
        return { showBack: true, backTarget: previousView || VIEWS.HOME, showFavourites: false };
      default:
        return { showBack: false, backTarget: null, showFavourites: true };
    }
  }

  const { showBack, backTarget, showFavourites } = getNavbarConfig(view, previousView);

  return (
    <div className="app-container">
      <NavBar
        showBack={showBack}
        onBackClick={() => { if (backTarget) setView(backTarget) }} // with the if  TypeScript knows that you will only use backTarget if it has value. 
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

export default App;
