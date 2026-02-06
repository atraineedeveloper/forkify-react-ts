import { useCallback, useEffect, useState } from 'react';
import type { Recipe } from '../types/recipe';

const DEFAULT_STORAGE_KEY = 'bookmarks';

const readInitialBookmarks = (storageKey: string): Recipe[] => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
  } catch {
    return [];
  }
};

function useBookmarks(storageKey = DEFAULT_STORAGE_KEY) {
  const [bookmarks, setBookmarks] = useState<Recipe[]>(() => readInitialBookmarks(storageKey));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(bookmarks));
  }, [bookmarks, storageKey]);

  const isBookmarked = useCallback(
    (recipeId: string) => bookmarks.some(bookmark => bookmark.id === recipeId),
    [bookmarks]
  );

  const addBookmark = useCallback((recipe: Recipe) => {
    setBookmarks(current => {
      if (current.some(bookmark => bookmark.id === recipe.id)) return current;
      return [...current, { ...recipe, bookmarked: true }];
    });
  }, []);

  const removeBookmark = useCallback((recipeId: string) => {
    setBookmarks(current => current.filter(bookmark => bookmark.id !== recipeId));
  }, []);

  const toggleBookmark = useCallback((recipe: Recipe) => {
    setBookmarks(current => {
      const exists = current.some(bookmark => bookmark.id === recipe.id);
      if (exists) return current.filter(bookmark => bookmark.id !== recipe.id);
      return [...current, { ...recipe, bookmarked: true }];
    });
  }, []);

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  };
}

export default useBookmarks;
