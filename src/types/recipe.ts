export type Ingredient = {
  quantity: number | null;
  unit: string;
  description: string;
};

export type Recipe = {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
  key?: string;
  bookmarked?: boolean;
};

export type SearchResult = {
  id: string;
  title: string;
  publisher: string;
  image: string;
  key?: string;
};

export type UploadRecipeFormData = {
  title: string;
  sourceUrl: string;
  image: string;
  publisher: string;
  cookingTime: string;
  servings: string;
  [key: string]: string;
};
