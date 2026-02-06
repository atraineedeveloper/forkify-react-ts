import { useAppContext } from '../context/useAppContext';

function Header() {
  const {
    logoUrl,
    iconsUrl,
    query,
    setQuery,
    handleSearch,
    openAddRecipeWindow,
    bookmarks,
    selectedRecipeId,
    handleSelectRecipe,
  } = useAppContext();

  return (
    <header className="header">
      <img src={logoUrl} alt="Logo" className="header__logo" />

      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button className="btn search__btn" type="submit">
          <svg className="search__icon">
            <use href={`${iconsUrl}#icon-search`} />
          </svg>
          <span>Search</span>
        </button>
      </form>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className="nav__btn nav__btn--add-recipe"
              type="button"
              onClick={openAddRecipeWindow}
            >
              <svg className="nav__icon">
                <use href={`${iconsUrl}#icon-edit`} />
              </svg>
              <span>Add recipe</span>
            </button>
          </li>

          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks" type="button">
              <svg className="nav__icon">
                <use href={`${iconsUrl}#icon-bookmark`} />
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className="bookmarks">
              <ul className="bookmarks__list">
                {bookmarks.length === 0 && (
                  <div className="message">
                    <div>
                      <svg>
                        <use href={`${iconsUrl}#icon-smile`} />
                      </svg>
                    </div>
                    <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                  </div>
                )}

                {bookmarks.map(bookmark => (
                  <li className="preview" key={bookmark.id}>
                    <a
                      className={`preview__link ${selectedRecipeId === bookmark.id ? 'preview__link--active' : ''}`}
                      href={`#${bookmark.id}`}
                      onClick={event => {
                        event.preventDefault();
                        handleSelectRecipe(bookmark.id);
                      }}
                    >
                      <figure className="preview__fig">
                        <img src={bookmark.image} alt={bookmark.title} />
                      </figure>
                      <div className="preview__data">
                        <h4 className="preview__title">{bookmark.title}</h4>
                        <p className="preview__publisher">{bookmark.publisher}</p>
                        {bookmark.key && (
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
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
