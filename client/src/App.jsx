import { useState, useEffect } from 'react';
import './App.css';
// import NavBar from './NavBar/NavBar.jsx'
// import Dashboard from './Dashboard/Dashboard.jsx'

function App() {

  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
  
  const [month, setMonth] = useState(months[new Date().getMonth()])
  const [seasonalIngredients, setSeasonalIngredients] = useState([])

  useEffect(() => {

    const fetchEvents = async () => {
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
    fetchEvents();
  }, [month]);

  return (
    <p>{seasonalIngredients}</p>
  )
}

export default App
