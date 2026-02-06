import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import logoUrl from '../img/logo.png';
import iconsUrl from '../img/icons.svg';
import { getResultsPage, searchRecipes, uploadRecipe } from '../services/forkifyApi';
import type { SearchResult, UploadRecipeFormData } from '../types/recipe';
import useBookmarks from '../hooks/useBookmarks';
import useRecipe from '../hooks/useRecipe';
import { AppContext } from './AppContextObject';
import type { AppContextValue } from './AppContextObject';

const MODAL_CLOSE_SEC = 2.5;

export function AppProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [isUploadingRecipe, setIsUploadingRecipe] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { bookmarks, isBookmarked, addBookmark, toggleBookmark } = useBookmarks();
  const {
    selectedRecipe,
    setSelectedRecipe,
    isLoadingRecipe,
    error,
    setError,
    loadRecipeById,
    updateServings,
  } = useRecipe({ isBookmarked });

  const paginatedResults = getResultsPage(results, page);
  const pageCount = Math.max(1, Math.ceil(results.length / 10));

  useEffect(() => {
    setSelectedRecipe(current => {
      if (!current) return current;
      return { ...current, bookmarked: isBookmarked(current.id) };
    });
  }, [isBookmarked, setSelectedRecipe]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      void loadRecipeById(id);
    };

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, [loadRecipeById]);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    void loadRecipeById(id);
  }, [loadRecipeById]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) return;

    try {
      setError(null);
      setIsLoadingResults(true);
      const foundResults = await searchRecipes(query.trim());
      setResults(foundResults);
      setPage(1);
      setSelectedRecipe(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoadingResults(false);
    }
  };

  const handleSelectRecipe = (id: string) => {
    void loadRecipeById(id);
  };

  const handleToggleBookmark = () => {
    if (!selectedRecipe) return;
    toggleBookmark(selectedRecipe);
  };

  const openAddRecipeWindow = () => {
    setUploadError(null);
    setUploadMessage(null);
    setIsAddRecipeOpen(true);
  };

  const closeAddRecipeWindow = () => {
    if (isUploadingRecipe) return;
    setIsAddRecipeOpen(false);
  };

  const handleUploadRecipe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setUploadError(null);
      setUploadMessage(null);
      setIsUploadingRecipe(true);

      const formData = new FormData(event.currentTarget);
      const rawData = Object.fromEntries(formData.entries());
      const normalizedData = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, String(value)])
      ) as UploadRecipeFormData;

      const recipe = await uploadRecipe(normalizedData);
      const bookmarkedRecipe = { ...recipe, bookmarked: true };

      setSelectedRecipe(bookmarkedRecipe);
      addBookmark(bookmarkedRecipe);

      setUploadMessage('Recipe was successfully uploaded :)');
      window.history.pushState(null, '', `#${recipe.id}`);

      window.setTimeout(() => {
        setIsAddRecipeOpen(false);
        setUploadMessage(null);
      }, MODAL_CLOSE_SEC * 1000);

      event.currentTarget.reset();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Could not upload recipe');
    } finally {
      setIsUploadingRecipe(false);
    }
  };

  const value: AppContextValue = {
    logoUrl,
    iconsUrl,
    query,
    setQuery,
    handleSearch,
    bookmarks,
    selectedRecipeId: selectedRecipe?.id,
    handleSelectRecipe,
    openAddRecipeWindow,
    isLoadingResults,
    paginatedResults,
    page,
    pageCount,
    goToPrevPage: () => setPage(current => Math.max(1, current - 1)),
    goToNextPage: () => setPage(current => Math.min(pageCount, current + 1)),
    isLoadingRecipe,
    error,
    selectedRecipe,
    updateServings,
    handleToggleBookmark,
    isAddRecipeOpen,
    isUploadingRecipe,
    uploadError,
    uploadMessage,
    closeAddRecipeWindow,
    handleUploadRecipe,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
