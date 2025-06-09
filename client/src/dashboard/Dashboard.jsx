import { useState } from 'react';
import './Dashboard.css';
import { VIEWS } from '../view/views.js';
import Home from '../home/Home.jsx';
import RecipeList from '../recipe-list/RecipeList.jsx';
import RecipeDetail from '../recipe-detail/RecipeDetail.jsx';

function Dashboard({view, setView, seasonalIngredients}) {

  const [seasonalRecipes, setSeasonalRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    const url = `http://127.0.0.1:3000/recipes`;
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
      console.log(response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      };
      const body = await response.json();
      console.log(body);
      setSeasonalRecipes(body);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDashboardContent = () => {
    switch (view) {
      case VIEWS.HOME:
        return (
          <Home
            onButtonClick={() => {
              fetchRecipes();
              setView(VIEWS.RECIPE_LIST)
            }}

          />
        );

      case VIEWS.RECIPE_LIST:
        return (
          <RecipeList
            seasonalRecipes={seasonalRecipes}
            onRecipeClick={(recipe) => {
              setSelectedRecipe(recipe);
              setView(VIEWS.RECIPE_DETAIL);
            }}
          />
        );

      case VIEWS.RECIPE_DETAIL:
        return (
          <RecipeDetail
            selectedRecipe={selectedRecipe}
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





