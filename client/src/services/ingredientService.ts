export async function fetchSeasonalIngredients(month: string): Promise<string[]> {
  const url = `http://127.0.0.1:3000/ingredients/${month}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data: string[] = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to fetch ingredients:', error.message);
    }
    throw error;
  }
};