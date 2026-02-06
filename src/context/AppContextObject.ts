import { createContext } from 'react';
import type { FormEvent } from 'react';
import type { SearchResult } from '../types/recipe';
import type useBookmarks from '../hooks/useBookmarks';
import type useRecipe from '../hooks/useRecipe';

export type AppContextValue = {
  logoUrl: string;
  iconsUrl: string;
  query: string;
  setQuery: (value: string) => void;
  handleSearch: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  bookmarks: ReturnType<typeof useBookmarks>['bookmarks'];
  selectedRecipeId?: string;
  handleSelectRecipe: (id: string) => void;
  openAddRecipeWindow: () => void;
  isLoadingResults: boolean;
  paginatedResults: SearchResult[];
  page: number;
  pageCount: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  isLoadingRecipe: boolean;
  error: string | null;
  selectedRecipe: ReturnType<typeof useRecipe>['selectedRecipe'];
  updateServings: (newServings: number) => void;
  handleToggleBookmark: () => void;
  isAddRecipeOpen: boolean;
  isUploadingRecipe: boolean;
  uploadError: string | null;
  uploadMessage: string | null;
  closeAddRecipeWindow: () => void;
  handleUploadRecipe: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const AppContext = createContext<AppContextValue | null>(null);
