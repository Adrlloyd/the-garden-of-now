import request from 'supertest';
import http from 'http';
import app from '../../app';

import { Favourites } from '../../models/favouriteModel';

jest.mock('../../models/favouriteModel');

const server = http.createServer(app.callback());

describe('POST /favourite', () => {
  it('should return 409 if the favourite already exists', async () => {
    (Favourites.findOne as jest.Mock).mockResolvedValue({ name: 'Spaghetti Bolognese' });

    const response = await request(server)
      .post('/favourite')
      .send({
        name: 'Spaghetti Bolognese',
        ingredients: [{ name: 'carrot' }]
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: 'The database already contains this recipe'
    });
  });

  it('should return 201 and create a new favourite when it does not exist', async () => {
    (Favourites.findOne as jest.Mock).mockResolvedValue(null);
    (Favourites.create as jest.Mock).mockResolvedValue({
      name: 'Mushroom Risotto',
      ingredients: [{ name: 'mushroom' }],
      method: [],
    });

    const response = await request(server)
      .post('/favourite')
      .send({
        name: 'Mushroom Risotto',
        ingredients: [{ name: 'mushroom' }],
        method: []
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      name: 'Mushroom Risotto',
      ingredients: [{ name: 'mushroom' }],
      method: []
    });
  });
});

describe('POST /favourites', () => {
  it('should return 200 with matching favourite recipes', async () => {
    const fakeData = [
      {
        ingredients: [{ name: 'carrot' }, { name: 'tomato' }]
      },
      {
        ingredients: [{ name: 'onion' }]
      }
    ];

    (Favourites.find as jest.Mock).mockResolvedValue(fakeData);

    const response = await request(server)
      .post('/favourites')
      .send({
        seasonalIngredients: ['carrots', 'tomatoes']
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        ingredients: [{ name: 'carrot' }, { name: 'tomato' }]
      }
    ]);
  });

  it('should return 404 when no matches are found', async () => {
    (Favourites.find as jest.Mock).mockResolvedValue([
      {
        ingredients: [{ name: 'beef' }]
      }
    ]);

    const response = await request(server)
      .post('/favourites')
      .send({
        seasonalIngredients: ['kale']
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'The database does not contain any favourite recipes'
    });
  });
});

describe('DELETE /favourite/:id', () => {
  it('should return 200 and delete the favourite if it exists', async () => {
    const mockDeleted = {
      name: 'Pasta Primavera',
      ingredients: [{ name: 'pasta' }],
      method: []
    };

    (Favourites.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeleted);

    const response = await request(server)
      .delete('/favourite/12345')
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Favourite recipe deleted successfully.',
      deleted: mockDeleted
    });
  });

  it('should return 404 if the favourite does not exist', async () => {
    (Favourites.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const response = await request(server)
      .delete('/favourite/does-not-exist')
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'Recipe not found.'
    });
  });
});