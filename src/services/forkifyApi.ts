import type { Recipe, SearchResult, UploadRecipeFormData } from '../types/recipe';

const API_URL = 'https://forkify-api.jonas.io/api/v2/recipes/';
const TIMEOUT_SEC = 10;
const RES_PER_PAGE = 10;
const API_KEY = import.meta.env.VITE_FORKIFY_API_KEY ?? '';

type ApiRecipe = {
  id: string;
  title: string;
  publisher: string;
  source_url: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Recipe['ingredients'];
  key?: string;
};

type ApiRecipeListItem = {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
  key?: string;
};

type ApiSingleRecipeResponse = {
  status: string;
  data: { recipe: ApiRecipe };
};

type ApiSearchResponse = {
  status: string;
  data: { recipes: ApiRecipeListItem[] };
};

const timeout = (seconds: number) =>
  new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
    }, seconds * 1000);
  });

const ajax = async <T>(url: string, uploadData?: unknown): Promise<T> => {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message ?? 'Request failed'} (${response.status})`);
    }

    return data as T;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error. Check your internet connection and try again.');
    }
    throw error;
  }
};

const withKey = (url: string) => {
  if (!API_KEY) return url;
  return `${url}${url.includes('?') ? '&' : '?'}key=${API_KEY}`;
};

const toRecipe = (apiRecipe: ApiRecipe): Recipe => ({
  id: apiRecipe.id,
  title: apiRecipe.title,
  publisher: apiRecipe.publisher,
  sourceUrl: apiRecipe.source_url,
  image: apiRecipe.image_url,
  servings: apiRecipe.servings,
  cookingTime: apiRecipe.cooking_time,
  ingredients: apiRecipe.ingredients,
  ...(apiRecipe.key && { key: apiRecipe.key }),
});

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const data = await ajax<ApiSingleRecipeResponse>(withKey(`${API_URL}${id}`));
  return toRecipe(data.data.recipe);
};

export const searchRecipes = async (query: string): Promise<SearchResult[]> => {
  const data = await ajax<ApiSearchResponse>(
    withKey(`${API_URL}?search=${encodeURIComponent(query)}`)
  );

  return data.data.recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
    ...(recipe.key && { key: recipe.key }),
  }));
};

export const getResultsPage = (
  results: SearchResult[],
  page: number,
  resultsPerPage = RES_PER_PAGE
) => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  return results.slice(start, end);
};

const parseUploadIngredients = (newRecipe: UploadRecipeFormData) =>
  Object.entries(newRecipe)
    .filter(([key, value]) => key.startsWith('ingredient-') && value.trim() !== '')
    .map(([, value]) => {
      const ingredientParts = value.split(',').map(part => part.trim());

      if (ingredientParts.length !== 3) {
        throw new Error('Wrong ingredient format! Please use: Quantity,Unit,Description');
      }

      const [quantity, unit, description] = ingredientParts;
      const quantityAsNumber = quantity ? Number(quantity) : null;

      if (quantity && Number.isNaN(quantityAsNumber)) {
        throw new Error('Ingredient quantity must be a number.');
      }

      if (!description) {
        throw new Error('Ingredient description is required.');
      }

      return {
        quantity: quantityAsNumber,
        unit,
        description,
      };
    });

export const uploadRecipe = async (newRecipe: UploadRecipeFormData): Promise<Recipe> => {
  const ingredients = parseUploadIngredients(newRecipe);
  if (ingredients.length === 0) {
    throw new Error('Please provide at least one ingredient.');
  }

  const recipeToUpload = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: Number(newRecipe.cookingTime),
    servings: Number(newRecipe.servings),
    ingredients,
  };

  const data = await ajax<ApiSingleRecipeResponse>(withKey(API_URL), recipeToUpload);
  return toRecipe(data.data.recipe);
};
