import { getIngredientsBySeason } from '../controllers/ingredientController';
import { SeasonalIngredients, NonSeasonalIngredients } from '../models/ingredient-model';

describe('getIngredientsBySeason', () => {
  it('returns 200 and all ingredients when month is valid', async () => {
    const ctx: any = {
      params: { month: 'January' },
      status: 0,
      body: null
    };

    const fakeSeasonalData = {
      vegetables: ['carrot', 'kale'],
      fruit: ['apple'],
      nutsAndHerbs: [],
      meat: ['chicken'],
      fish: ['cod']
    };

    const fakeNonSeasonalData = {
      ingredients: ['salt', 'pepper', 'oil']
    };

    jest.spyOn(SeasonalIngredients, 'findOne').mockResolvedValue(fakeSeasonalData as any);
    jest.spyOn(NonSeasonalIngredients, 'findOne').mockResolvedValue(fakeNonSeasonalData as any);

    await getIngredientsBySeason(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body).toEqual([
      'carrot', 'kale', 'apple', 'chicken', 'cod',
      'salt', 'pepper', 'oil'
    ]);
  });

  it('returns 400 when seasonal or non-seasonal data is missing', async () => {
    const ctx: any = {
      params: { month: 'InvalidMonth' },
      status: 0,
      body: null
    };

    jest.spyOn(SeasonalIngredients, 'findOne').mockResolvedValue(null);
    jest.spyOn(NonSeasonalIngredients, 'findOne').mockResolvedValue(null);

    await getIngredientsBySeason(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body).toEqual({
      error: 'Please specify a correct month.'
    });
  });

  it('returns 500 when a database error occurs', async () => {
    const ctx: any = {
      params: { month: 'January' },
      status: 0,
      body: null
    };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.spyOn(SeasonalIngredients, 'findOne').mockRejectedValue(new Error('DB failure'));

    await getIngredientsBySeason(ctx);

    expect(ctx.status).toBe(500);
    expect(ctx.body).toEqual({ error: 'Internal server error' });

    consoleSpy.mockRestore();
  });

});