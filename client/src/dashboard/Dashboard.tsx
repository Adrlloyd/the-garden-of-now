import { useState, useEffect } from 'react';
import './Dashboard.css';
import { API_URL } from '../config';
import { VIEWS } from '../view/views';
import Home from '../home/Home';
import RecipeList from '../recipe-list/RecipeList';
import RecipeDetail from '../recipe-detail/RecipeDetail';

type Ingredient = {
  name: string;
  measure: string;
  number: number;
};

type MethodStep = {
  heading: string;
  body: string;
};

type Recipe = {
  _id: string;
  name: string;
  image: string;
  mealType: string;
  preparationTime: number;
  difficulty: string;
  servings: number;
  description: string;
  ingredients: Ingredient[];
  method: MethodStep[];
};

type DashboardProps = {
  view: string;
  setView: (view: string) => void;
  setPreviousView: (view: string) => void;
  seasonalIngredients: string[];
  month: string;
};

function Dashboard({ view, setView, setPreviousView, seasonalIngredients, month }: DashboardProps) {

  const [seasonalRecipes, setSeasonalRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
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
      const body: Recipe[] = await response.json();
      setSeasonalRecipes(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (view === VIEWS.FAVOURITES_LIST) {
      const fetchFavourites = async () => {
        const url = `${API_URL}/favourites`;
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
          console.log("Response status:", response.status);
          const body: Recipe[] = await response.json();
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

  const addToFavourites = async (recipe: Recipe) => {
    const exists = favouriteRecipes.some((existingRecipe) => {
      return existingRecipe._id === recipe._id;
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
        throw new Error(`Response status: ${response.status}`);
      }
      const body: Recipe = await response.json();
      setFavouriteRecipes([...favouriteRecipes, body]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromFavourites = async (recipe: Recipe) => {
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
  )
}

export default Dashboard;