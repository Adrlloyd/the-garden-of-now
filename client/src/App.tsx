import { useState, useEffect } from 'react';
import './App.css';
import { VIEWS } from './view/views';
import NavBar from './navbar/NavBar';
import Dashboard from './dashboard/Dashboard.jsx';

function App() {

  const months: string[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  
  const [month] = useState<string>(months[new Date().getMonth()]);
  const [seasonalIngredients, setSeasonalIngredients] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchIngredients = async () => {
      const url = `http://127.0.0.1:3000/ingredients/${month}`;
      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        };
        const body: string[] = await response.json();
        console.log(body);
        setSeasonalIngredients(body);
      } catch (error: unknown) {
        if(error instanceof Error) {
          console.log(error);
        }
        
      }
    };
    fetchIngredients();
  }, [month]);

  const [view, setView] = useState<string>('home');
  const [previousView, setPreviousView] = useState<string | null>(null);

  function getNavbarConfig(view: string) {
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
        onBackClick={() => { if (backTarget) setView(backTarget)}} // with the if  TypeScript knows that you will only use backTarget if it has value. 
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
