export type DashboardProps = {
  view: string;
  setView: (view: string) => void;
  setPreviousView: (view: string) => void;
  seasonalIngredients: string[];
  month: string;
};
