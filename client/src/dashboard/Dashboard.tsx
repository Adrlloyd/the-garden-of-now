import { useState, useEffect } from 'react';
import './Dashboard.css';
import { VIEWS } from '../view/views';
import Home from '../home/Home';
import RecipeList from '../recipe-list/RecipeList';
import RecipeDetail from '../recipe-detail/RecipeDetail';
import {
  fetchRecipes,
  fetchFavourites,
  addFavourite,
  deleteFavourite,
  Recipe //this would be called from a Type file once its in place.
} from '../services/recipeService';

import type { DashboardProps } from '../types/dashboard';

function Dashboard({ view, setView, setPreviousView, seasonalIngredients, month }: DashboardProps) {
  const [seasonalRecipes, setSeasonalRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    try {
      const body = await fetchRecipes(seasonalIngredients);
      setSeasonalRecipes(body);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const body = await fetchFavourites(seasonalIngredients);
        console.log('Fetched favourites:', body);
        setFavouriteRecipes(body);
      } catch (error) {
        console.error(error);
      }
    };

    if (view === VIEWS.FAVOURITES_LIST && seasonalIngredients.length > 0) {
      getFavourites();
    }
  }, [view, seasonalIngredients]);

  const addToFavourites = async (recipe: Recipe) => {
    const exists = favouriteRecipes.some(existing => existing._id === recipe._id);
    if (exists) {
      alert("This recipe is already in your favourites.");
      return;
    }

    try {
      const body = await addFavourite(recipe);
      setFavouriteRecipes([...favouriteRecipes, body]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromFavourites = async (recipe: Recipe) => {
    try {
      await deleteFavourite(recipe._id);
      setFavouriteRecipes(favouriteRecipes.filter(r => r._id !== recipe._id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderDashboardContent = () => {
    console.log('Current view:', view);
    console.log('selectedRecipe:', selectedRecipe);

    switch (view) {
      case VIEWS.HOME:
        return (
          <Home
            fireButtonResponse={() => {
              getRecipes();
              setView(VIEWS.RECIPE_LIST);
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
            fireRecipeResponse={(recipe: Recipe) => {
              setSelectedRecipe(recipe);
              setView(VIEWS.RECIPE_DETAIL);
            }}
          />
        );

      case VIEWS.RECIPE_DETAIL:
        if (!selectedRecipe) return <div>No recipe selected</div>;
        return (
          <RecipeDetail
            isFavourite={favouriteRecipes.some(r => r._id === selectedRecipe._id)}
            selectedRecipe={selectedRecipe}
            addToFavourites={addToFavourites}
            deleteFromFavourites={deleteFromFavourites}
          />
        );

      case VIEWS.FAVOURITES_LIST:
        return (
          <RecipeList
            title="favourite"
            recipes={favouriteRecipes}
            favouriteRecipes={favouriteRecipes}
            addToFavourites={addToFavourites}
            deleteFromFavourites={deleteFromFavourites}
            fireRecipeResponse={(recipe: Recipe) => {
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
  );
}

export default Dashboard;