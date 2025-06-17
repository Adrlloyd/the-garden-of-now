import request from 'supertest';
import http from 'http';
import app from '../../app';

import {
  SeasonalIngredients,
  NonSeasonalIngredients
} from '../../models/ingredientModel';

const server = http.createServer(app.callback());

describe('GET /ingredients/:month', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 200 with seasonal and universal ingredients', async () => {
    const fakeSeasonal = {
      vegetables: ['carrot'],
      fruit: ['apple'],
      nutsAndHerbs: [],
      meat: ['chicken'],
      fish: ['cod']
    };

    const fakeUniversal = {
      ingredients: ['salt', 'pepper']
    };

    jest
      .spyOn(SeasonalIngredients, 'findOne')
      .mockResolvedValue(fakeSeasonal as any);

    jest
      .spyOn(NonSeasonalIngredients, 'findOne')
      .mockResolvedValue(fakeUniversal as any);

    const response = await request(server).get('/ingredients/january');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      'carrot', 'apple', 'chicken', 'cod', 'salt', 'pepper'
    ]);
  });

  it('should return 400 if seasonal or universal data is missing', async () => {
    jest
      .spyOn(SeasonalIngredients, 'findOne')
      .mockResolvedValue(null);

    jest
      .spyOn(NonSeasonalIngredients, 'findOne')
      .mockResolvedValue(null);

    const response = await request(server).get('/ingredients/january');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please specify a correct month.'
    });
  });

  it('should return 500 on internal server error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest
      .spyOn(SeasonalIngredients, 'findOne')
      .mockRejectedValue(new Error('DB fail'));

    const response = await request(server).get('/ingredients/january');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Internal server error'
    });

    consoleSpy.mockRestore();
  });
});