import { getRecipesBySeason } from '../../controllers/recipeController';
import { Recipes } from '../../models/recipeModel';

jest.mock('../../models/recipeModel');

describe('getRecipesBySeason', () => {
  it('returns 200 and filtered recipes when matches are found', async () => {
    const fakeRequestBody = {
      seasonalIngredients: ['carrots', 'tomatoes']
    };

    const ctx: any = {
      request: {
        body: fakeRequestBody
      },
      status: 0,
      body: null
    };

    (Recipes.find as jest.Mock).mockResolvedValue([
      {
        ingredients: [
          { name: 'carrot' },
          { name: 'tomato' }
        ]
      },
      {
        ingredients: [
          { name: 'carrot' },
          { name: 'onion' }
        ]
      }
    ]);

    await getRecipesBySeason(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body).toEqual([
      {
        ingredients: [
          { name: 'carrot' },
          { name: 'tomato' }
        ]
      }
    ]);
  });

  it('returns 404 when no matching recipes are found', async () => {
    const fakeRequestBody = {
      seasonalIngredients: ['lettuce', 'broccoli']
    };

    const ctx: any = {
      request: {
        body: fakeRequestBody
      },
      status: 0,
      body: null
    };

    (Recipes.find as jest.Mock).mockResolvedValue([
      {
        ingredients: [
          { name: 'carrot' },
          { name: 'tomato' }
        ]
      },
      {
        ingredients: [
          { name: 'onion' }
        ]
      }
    ]);

    await getRecipesBySeason(ctx);

    expect(ctx.status).toBe(404);
    expect(ctx.body).toEqual({
      error: 'The database does not contain recipes for this month'
    });
  });

  it('returns 500 when Recipes.find throws an error', async () => {
    const fakeRequestBody = {
      seasonalIngredients: ['carrots', 'tomatoes']
    };

    const ctx: any = {
      request: {
        body: fakeRequestBody
      },
      status: 0,
      body: null
    };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    (Recipes.find as jest.Mock).mockRejectedValue(new Error('Database failure'));

    await getRecipesBySeason(ctx);

    expect(ctx.status).toBe(500);
    expect(ctx.body).toEqual({ error: 'Internal server error' });

    consoleSpy.mockRestore();
  });
});
