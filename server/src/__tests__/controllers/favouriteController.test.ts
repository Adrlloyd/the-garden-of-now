import {
  getFavouritesBySeason,
  postFavourite,
  deleteFavourite
} from '../../controllers/favouriteController';

import { Favourites } from '../../models/favouriteModel';

jest.mock('../../models/favouriteModel');

describe('favouriteController', () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      request: {
        body: {
          seasonalIngredients: ['carrots', 'tomatoes'],
          name: 'Spaghetti Bolognese',
          ingredients: [{ name: 'carrot' }]
        }
      },
      params: { id: '123' },
      status: 0,
      body: null
    };
  });

  describe('getFavouritesBySeason', () => {
    it('returns 200 and filtered favourites when matches are found', async () => {
      const fakeData = [
        { ingredients: [{ name: 'carrot' }, { name: 'tomato' }] },
        { ingredients: [{ name: 'carrot' }, { name: 'onion' }] }
      ];

      (Favourites.find as jest.Mock).mockResolvedValue(fakeData);

      await getFavouritesBySeason(ctx);

      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual([
        { ingredients: [{ name: 'carrot' }, { name: 'tomato' }] }
      ]);
    });

    it('returns 404 when no matching favourites are found', async () => {
      const fakeData = [
        { ingredients: [{ name: 'onion' }] },
        { ingredients: [{ name: 'beef' }] }
      ];

      (Favourites.find as jest.Mock).mockResolvedValue(fakeData);

      await getFavouritesBySeason(ctx);

      expect(ctx.status).toBe(404);
      expect(ctx.body).toEqual({
        error: 'The database does not contain any favourite recipes'
      });
    });

    it('returns 500 when database error occurs', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (Favourites.find as jest.Mock).mockRejectedValue(new Error('DB failure'));

      await getFavouritesBySeason(ctx);

      expect(ctx.status).toBe(500);
      expect(ctx.body).toEqual({ error: 'Internal server error' });

      consoleSpy.mockRestore();
    });
  });

  describe('postFavourite', () => {
    it('returns 409 if recipe already exists', async () => {
      (Favourites.findOne as jest.Mock).mockResolvedValue({ name: 'Spaghetti Bolognese' });

      await postFavourite(ctx);

      expect(ctx.status).toBe(409);
      expect(ctx.body).toEqual({ error: 'The database already contains this recipe' });
    });

    it('returns 201 and new favourite when not already in database', async () => {
      const newFavourite = { name: 'Spaghetti Bolognese', ingredients: [{ name: 'carrot' }] };

      (Favourites.findOne as jest.Mock).mockResolvedValue(null);
      (Favourites.create as jest.Mock).mockResolvedValue(newFavourite);

      await postFavourite(ctx);

      expect(ctx.status).toBe(201);
      expect(ctx.body).toEqual(newFavourite);
    });

    it('returns 500 on creation error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (Favourites.findOne as jest.Mock).mockRejectedValue(new Error('DB failure'));

      await postFavourite(ctx);

      expect(ctx.status).toBe(500);
      expect(ctx.body).toEqual({ error: 'Internal server error' });

      consoleSpy.mockRestore();
    });
  });

  describe('deleteFavourite', () => {
    it('returns 404 if recipe to delete is not found', async () => {
      (Favourites.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await deleteFavourite(ctx);

      expect(ctx.status).toBe(404);
      expect(ctx.body).toEqual({ error: 'Recipe not found.' });
    });

    it('returns 200 and success message when deletion is successful', async () => {
      const deleted = { id: '123', name: 'Spaghetti Bolognese' };

      (Favourites.findByIdAndDelete as jest.Mock).mockResolvedValue(deleted);

      await deleteFavourite(ctx);

      expect(ctx.status).toBe(200);
      expect(ctx.body).toEqual({
        message: 'Favourite recipe deleted successfully.',
        deleted
      });
    });

    it('returns 500 on delete error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      (Favourites.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('DB failure'));

      await deleteFavourite(ctx);

      expect(ctx.status).toBe(500);
      expect(ctx.body).toEqual({ error: 'Internal server error' });

      consoleSpy.mockRestore();
    });
  });
});
