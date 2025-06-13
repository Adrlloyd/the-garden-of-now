import { useState, useEffect } from 'react';
import './Dashboard.css';
import { API_URL } from '../config.js';
import { VIEWS } from '../view/views.js';
import Home from '../home/Home.jsx';
import RecipeList from '../recipe-list/RecipeList.jsx';
import RecipeDetail from '../recipe-detail/RecipeDetail.jsx';

function Dashboard({view, setView, setPreviousView, seasonalIngredients, month}) {

  const [seasonalRecipes, setSeasonalRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    console.log("Fetching filtered favourites with:", seasonalIngredients);
    const url = `${API_URL}/recipes`;
    const payload = {
      seasonalIngredients: seasonalIngredients
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      };
      const body = await response.json();
      setSeasonalRecipes(body);
    } catch (error) {
      console.log(error);
    }
  };

  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  useEffect(() => {
    if (view === VIEWS.FAVOURITES_LIST) {
      const fetchFavourites = async () => {
        const url = `${API_URL}/favourites`;
        const payload = {
          seasonalIngredients: seasonalIngredients
        }
        try {
          console.log("Sending favourites fetch with ingredients:", seasonalIngredients);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
          };
          console.log("Response status:", response.status);
          const body = await response.json();
          setFavouriteRecipes(body);
          console.log("Fetched favourites:", body);
        } catch (error) {
          console.error(error);
        }
      };
      if (view === VIEWS.FAVOURITES_LIST && seasonalIngredients.length > 0) {
        fetchFavourites();
      }
    }
  }, [view, seasonalIngredients]);

  const addToFavourites = async (recipe) => {
    const exists = favouriteRecipes.some((existingRecipe) => {
      return existingRecipe._id === recipe._id
    });
    if (exists) {
      alert("This recipe is already in your favourites.");
      return;
    }
    const url = `${API_URL}/favourite`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      };
      const body = await response.json();
      setFavouriteRecipes([...favouriteRecipes, body]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromFavourites = async (recipe) => {
    const url = `${API_URL}/favourite/${recipe._id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setFavouriteRecipes(favouriteRecipes.filter((existingRecipe) => {
        return existingRecipe._id !== recipe._id
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const renderDashboardContent = () => {
    switch (view) {
      case VIEWS.HOME:
        return (
          <Home
            fireButtonResponse={() => {
              fetchRecipes();
              setView(VIEWS.RECIPE_LIST)
            }}
          />
        );

      case VIEWS.RECIPE_LIST:
        return (
          <RecipeList
            title={month}  
            recipes={seasonalRecipes}
            favouriteRecipes={favouriteRecipes}
            addToFavourites={addToFavourites}
            deleteFromFavourites={deleteFromFavourites}
            fireRecipeResponse={(recipe) => {
              setSelectedRecipe(recipe);
              setView(VIEWS.RECIPE_DETAIL);
            }}
          />
        );

      case VIEWS.RECIPE_DETAIL:
        return (
          <RecipeDetail
            isFavourite={(favouriteRecipes || []).some(existingRecipe => existingRecipe._id === selectedRecipe._id)}
            selectedRecipe={selectedRecipe}
            addToFavourites={addToFavourites}
            deleteFromFavourites={deleteFromFavourites}
          />
        );

      case VIEWS.FAVOURITES_LIST:
        return (
          <RecipeList
            title={'favourite'}
            recipes={favouriteRecipes}
            favouriteRecipes={favouriteRecipes}
            addToFavourites={addToFavourites}
            deleteFromFavourites={deleteFromFavourites}
            fireRecipeResponse={(recipe) => {
              setSelectedRecipe(recipe);
              setPreviousView(view);
              setView(VIEWS.RECIPE_DETAIL);
            }}
          />
        );

      default:
        return <div>Unknown view</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {renderDashboardContent()}
    </div>
  )
}

export default Dashboard