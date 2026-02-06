import { useAppContext } from '../context/useAppContext';

const formatQuantity = (quantity: number | null) => {
  if (quantity === null) return '';
  if (Number.isInteger(quantity)) return quantity.toString();
  return quantity.toFixed(2).replace(/\.00$/, '');
};

function RecipeView() {
  const {
    isLoadingRecipe,
    error,
    selectedRecipe,
    iconsUrl,
    updateServings,
    handleToggleBookmark,
  } = useAppContext();

  return (
    <div className="recipe">
      {isLoadingRecipe && (
        <div className="spinner">
          <svg>
            <use href={`${iconsUrl}#icon-loader`} />
          </svg>
        </div>
      )}

      {!isLoadingRecipe && error && (
        <div className="error">
          <div>
            <svg>
              <use href={`${iconsUrl}#icon-alert-triangle`} />
            </svg>
          </div>
          <p>{error}</p>
        </div>
      )}

      {!isLoadingRecipe && !error && selectedRecipe && (
        <>
          <figure className="recipe__fig">
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="recipe__img" />
            <h1 className="recipe__title">
              <span>{selectedRecipe.title}</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href={`${iconsUrl}#icon-clock`} />
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {selectedRecipe.cookingTime}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href={`${iconsUrl}#icon-users`} />
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {selectedRecipe.servings}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny"
                  type="button"
                  onClick={() => updateServings(selectedRecipe.servings - 1)}
                >
                  <svg>
                    <use href={`${iconsUrl}#icon-minus-circle`} />
                  </svg>
                </button>
                <button
                  className="btn--tiny"
                  type="button"
                  onClick={() => updateServings(selectedRecipe.servings + 1)}
                >
                  <svg>
                    <use href={`${iconsUrl}#icon-plus-circle`} />
                  </svg>
                </button>
              </div>
            </div>

            {selectedRecipe.key && (
              <div className="recipe__user-generated">
                <svg>
                  <use href={`${iconsUrl}#icon-user`} />
                </svg>
              </div>
            )}

            <button className="btn--round" type="button" onClick={handleToggleBookmark}>
              <svg>
                <use
                  href={`${iconsUrl}#${
                    selectedRecipe.bookmarked ? 'icon-bookmark-fill' : 'icon-bookmark'
                  }`}
                />
              </svg>
            </button>
          </div>

          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li className="recipe__ingredient" key={`${ingredient.description}-${index}`}>
                  <svg className="recipe__icon">
                    <use href={`${iconsUrl}#icon-check`} />
                  </svg>
                  <div className="recipe__quantity">{formatQuantity(ingredient.quantity)}</div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ingredient.unit}</span>
                    {ingredient.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher"> {selectedRecipe.publisher}</span>. Please check out
              directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={selectedRecipe.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use href={`${iconsUrl}#icon-arrow-right`} />
              </svg>
            </a>
          </div>
        </>
      )}

      {!isLoadingRecipe && !error && !selectedRecipe && (
        <div className="message">
          <div>
            <svg>
              <use href={`${iconsUrl}#icon-smile`} />
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      )}
    </div>
  );
}

export default RecipeView;
