# THE GARDEN OF NOW V0.10

## Intro

Welcome to The Garden of Now - a recipe generator that makes it easier to eat seasonal produce, locally grown.

Much of our food nowadays gets shipped half way across the world to reach our plate. This behaviour comes at a price - undermining local producers and contributing up to 20% of the carbon footprint of our diet. It seems daft fetching food from abroad that can just as easily be grown at home. Apples from New Zealand? No thanks.

From the consumer's POV, one of the biggest barriers to eating locally and seasonally is inspiration. Or rather, a lack of it. Choosing what to cook for dinner tonight only gets more difficult when you're limited to less than half the ingredients from your local supermarket. That's where The Garden of Now comes in. By tracking which ingredients are available in a given location at a certain time of year, it searches only for recipes that can be made entirely using those ingredients, plus a few staples. Meaning local, seasonal mealtime inspiration is only a tap away.

## Tech Stack

The Garden of Now is built with a React front end and a Koa/Mongoose/MongoDB back end written in TypeScript. In the future, the aim will be to connect this stack to a publically-available recipe API like Spoonacular or Edamam, providing the user with the choice of thousands of recipes. For short-term development purposes, the app runs entirely off the local database.

## Getting Started

### Prerequisites

- Node.js (version >= 18)
- npm or yarn
- MongoDB running locally

### Set-Up

1. Fork the repository on GitHub and clone it to your local folders using "git clone https://github.com/<your-username>/<your-repo>.git".

2. Set up your development environment using NPM. Navigate to the folder 'client' ("cd client") inside the root directory and run "npm i' to install the relevant dependencies and development dependencies. Create a .env file to manage environment variables - a root pathway to your server ("VITE_API_URL=<serverpathway>") is essential. 

3. Repeat these steps inside folder 'server', running "npm i" and creating a .env file to manage environment variables - the port on which the server can be accessed ("PORT=<port>"), a pathway for your MongoDB database ("MONGO_URI=<databasepathway>") and a pathway to your assets ("ASSETS_PATH=<assetspathway>") are essential.

4. Set up your database containing seasonal ingredient data and recipes. Open the Mongo Shell (Mongosh) from your terminal and create a new database. Navigate to the 'database-mock-data' folder in the project's root through the CLI and run "mongoimport --db <database_name> --collection <collection_name> --file ./recipes.json --jsonArray" followed by "mongoimport --db <database_name> --collection <collection_name> --file ./ingredients.json --jsonArray". These commands will input data into your database.

5. Navigate into the server ("cd server") and client ("cd client") folders and in each run "npm run dev" to launch the application.