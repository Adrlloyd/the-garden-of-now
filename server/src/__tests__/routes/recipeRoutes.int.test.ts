import request from 'supertest';
import http from 'http';
import app from '../../app';

import { Recipes } from '../../models/recipeModel';

const server = http.createServer(app.callback());

describe('POST /recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 200 with matching recipes', async () => {
    const fakeRecipes = [
      {
        name: 'Veggie Soup',
        ingredients: [
          { name: 'carrot' },
          { name: 'onion' }
        ]
      },
      {
        name: 'Tomato Pasta',
        ingredients: [
          { name: 'tomato' },
          { name: 'carrot' }
        ]
      }
    ];

    jest
      .spyOn(Recipes, 'find')
      .mockResolvedValue(fakeRecipes as any);

    const response = await request(server)
      .post('/recipes')
      .send({
        seasonalIngredients: ['carrots', 'onions']
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        name: 'Veggie Soup',
        ingredients: [
          { name: 'carrot' },
          { name: 'onion' }
        ]
      }
    ]);
  });

  it('should return 404 if no recipes match the ingredients', async () => {
    const fakeRecipes = [
      {
        name: 'Chicken Curry',
        ingredients: [{ name: 'chicken' }]
      }
    ];

    jest
      .spyOn(Recipes, 'find')
      .mockResolvedValue(fakeRecipes as any);

    const response = await request(server)
      .post('/recipes')
      .send({
        seasonalIngredients: ['carrots', 'onions']
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'The database does not contain recipes for this month'
    });
  });

  it('should return 500 on internal server error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest
      .spyOn(Recipes, 'find')
      .mockRejectedValue(new Error('DB error'));

    const response = await request(server)
      .post('/recipes')
      .send({
        seasonalIngredients: ['carrots']
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Internal server error'
    });

    consoleSpy.mockRestore();
  });
});
