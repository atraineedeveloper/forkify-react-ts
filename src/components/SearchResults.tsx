import { useAppContext } from '../context/useAppContext';

function SearchResults() {
  const {
    isLoadingResults,
    paginatedResults,
    selectedRecipeId,
    iconsUrl,
    handleSelectRecipe,
    page,
    pageCount,
    goToPrevPage,
    goToNextPage,
  } = useAppContext();

  return (
    <div className="search-results">
      {isLoadingResults && (
        <div className="spinner">
          <svg>
            <use href={`${iconsUrl}#icon-loader`} />
          </svg>
        </div>
      )}

      {!isLoadingResults && paginatedResults.length > 0 && (
        <ul className="results">
          {paginatedResults.map(result => (
            <li className="preview" key={result.id}>
              <a
                className={`preview__link ${selectedRecipeId === result.id ? 'preview__link--active' : ''}`}
                href={`#${result.id}`}
                onClick={event => {
                  event.preventDefault();
                  handleSelectRecipe(result.id);
                }}
              >
                <figure className="preview__fig">
                  <img src={result.image} alt={result.title} />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{result.title}</h4>
                  <p className="preview__publisher">{result.publisher}</p>
                  {result.key && (
                    <div className="preview__user-generated">
                      <svg>
                        <use href={`${iconsUrl}#icon-user`} />
                      </svg>
                    </div>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {!isLoadingResults && pageCount > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button className="btn--inline pagination__btn--prev" type="button" onClick={goToPrevPage}>
              <svg className="search__icon">
                <use href={`${iconsUrl}#icon-arrow-left`} />
              </svg>
              <span>Page {page - 1}</span>
            </button>
          )}
          {page < pageCount && (
            <button className="btn--inline pagination__btn--next" type="button" onClick={goToNextPage}>
              <span>Page {page + 1}</span>
              <svg className="search__icon">
                <use href={`${iconsUrl}#icon-arrow-right`} />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
