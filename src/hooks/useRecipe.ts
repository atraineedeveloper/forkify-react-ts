import { useCallback, useState } from 'react';
import { getRecipeById } from '../services/forkifyApi';
import type { Recipe } from '../types/recipe';

type UseRecipeOptions = {
  isBookmarked: (recipeId: string) => boolean;
};

function useRecipe({ isBookmarked }: UseRecipeOptions) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecipeById = useCallback(
    async (id: string) => {
      try {
        setError(null);
        setIsLoadingRecipe(true);

        const recipe = await getRecipeById(id);
        setSelectedRecipe({ ...recipe, bookmarked: isBookmarked(recipe.id) });
        window.history.replaceState(null, '', `#${id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Recipe loading failed');
      } finally {
        setIsLoadingRecipe(false);
      }
    },
    [isBookmarked]
  );

  const updateServings = useCallback((newServings: number) => {
    setSelectedRecipe(current => {
      if (!current || newServings < 1) return current;

      const updatedIngredients = current.ingredients.map(ingredient => ({
        ...ingredient,
        quantity:
          ingredient.quantity === null
            ? null
            : (ingredient.quantity * newServings) / current.servings,
      }));

      return {
        ...current,
        servings: newServings,
        ingredients: updatedIngredients,
      };
    });
  }, []);

  return {
    selectedRecipe,
    setSelectedRecipe,
    isLoadingRecipe,
    error,
    setError,
    loadRecipeById,
    updateServings,
  };
}

export default useRecipe;
