import { useMemo, useState } from 'react';
import { useAppContext } from '../context/useAppContext';

const ingredientFieldNames = [
  'ingredient-1',
  'ingredient-2',
  'ingredient-3',
  'ingredient-4',
  'ingredient-5',
  'ingredient-6',
] as const;

const emptyIngredientState = {
  'ingredient-1': '',
  'ingredient-2': '',
  'ingredient-3': '',
  'ingredient-4': '',
  'ingredient-5': '',
  'ingredient-6': '',
};

const isIngredientValid = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const parts = trimmed.split(',').map(part => part.trim());
  return parts.length === 3 && parts[2] !== '';
};

function AddRecipeModal() {
  const {
    isAddRecipeOpen,
    isUploadingRecipe,
    uploadError,
    uploadMessage,
    iconsUrl,
    closeAddRecipeWindow,
    handleUploadRecipe,
  } = useAppContext();

  const [ingredientInputs, setIngredientInputs] =
    useState<Record<(typeof ingredientFieldNames)[number], string>>(emptyIngredientState);

  const ingredientValidation = useMemo(() => {
    const values = ingredientFieldNames.map(name => ingredientInputs[name]);
    const nonEmpty = values.filter(value => value.trim() !== '');
    const hasAtLeastOneValidIngredient = nonEmpty.some(value => isIngredientValid(value));
    const hasInvalidFilledIngredient = nonEmpty.some(value => !isIngredientValid(value));

    return {
      hasAtLeastOneValidIngredient,
      hasInvalidFilledIngredient,
    };
  }, [ingredientInputs]);

  const isSubmitDisabled =
    isUploadingRecipe ||
    !ingredientValidation.hasAtLeastOneValidIngredient ||
    ingredientValidation.hasInvalidFilledIngredient;

  return (
    <>
      <div className={`overlay ${isAddRecipeOpen ? '' : 'hidden'}`} onClick={closeAddRecipeWindow}></div>
      <div className={`add-recipe-window ${isAddRecipeOpen ? '' : 'hidden'}`}>
        <button className="btn--close-modal" type="button" onClick={closeAddRecipeWindow}>
          &times;
        </button>

        {uploadError && (
          <div className="error">
            <div>
              <svg>
                <use href={`${iconsUrl}#icon-alert-triangle`} />
              </svg>
            </div>
            <p>{uploadError}</p>
          </div>
        )}

        {uploadMessage && (
          <div className="message">
            <div>
              <svg>
                <use href={`${iconsUrl}#icon-smile`} />
              </svg>
            </div>
            <p>{uploadMessage}</p>
          </div>
        )}

        <form className="upload" onSubmit={handleUploadRecipe}>
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label htmlFor="title">Title</label>
            <input id="title" required name="title" type="text" />
            <label htmlFor="sourceUrl">URL</label>
            <input id="sourceUrl" required name="sourceUrl" type="text" />
            <label htmlFor="image">Image URL</label>
            <input id="image" required name="image" type="text" />
            <label htmlFor="publisher">Publisher</label>
            <input id="publisher" required name="publisher" type="text" />
            <label htmlFor="cookingTime">Prep time</label>
            <input id="cookingTime" required name="cookingTime" type="number" min="1" />
            <label htmlFor="servings">Servings</label>
            <input id="servings" required name="servings" type="number" min="1" />
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label htmlFor="ingredient-1">Ingredient 1</label>
            <input
              id="ingredient-1"
              type="text"
              name="ingredient-1"
              value={ingredientInputs['ingredient-1']}
              onChange={event =>
                setIngredientInputs(current => ({ ...current, 'ingredient-1': event.target.value }))
              }
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label htmlFor="ingredient-2">Ingredient 2</label>
            <input
              id="ingredient-2"
              type="text"
              name="ingredient-2"
              value={ingredientInputs['ingredient-2']}
              onChange={event =>
                setIngredientInputs(current => ({ ...current, 'ingredient-2': event.target.value }))
              }
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label htmlFor="ingredient-3">Ingredient 3</label>
            <input
              id="ingredient-3"
              type="text"
              name="ingredient-3"
              value={ingredientInputs['ingredient-3']}
              onChange={event =>
                setIngredientInputs(current => ({ ...current, 'ingredient-3': event.target.value }))
              }
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label htmlFor="ingredient-4">Ingredient 4</label>
            <input
              id="ingredient-4"
              type="text"
              name="ingredient-4"
              value={ingredientInputs['ingredient-4']}
              onChange={event =>
                setIngredientInputs(current => ({ ...current, 'ingredient-4': event.target.value }))
              }
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label htmlFor="ingredient-5">Ingredient 5</label>
            <input
              id="ingredient-5"
              type="text"
              name="ingredient-5"
              value={ingredientInputs['ingredient-5']}
              onChange={event =>
                setIngredientInputs(current => ({ ...current, 'ingredient-5': event.target.value }))
              }
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label htmlFor="ingredient-6">Ingredient 6</label>
            <input
              id="ingredient-6"
              type="text"
              name="ingredient-6"
              value={ingredientInputs['ingredient-6']}
              onChange={event =>
                setIngredientInputs(current => ({ ...current, 'ingredient-6': event.target.value }))
              }
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <button className="btn upload__btn" type="submit" disabled={isSubmitDisabled}>
            <svg>
              <use href={`${iconsUrl}#icon-upload-cloud`} />
            </svg>
            <span>{isUploadingRecipe ? 'Uploading...' : 'Upload'}</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default AddRecipeModal;
