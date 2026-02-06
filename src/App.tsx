import Header from './components/Header';
import SearchResults from './components/SearchResults';
import RecipeView from './components/RecipeView';
import AddRecipeModal from './components/AddRecipeModal';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="container">
        <Header />
        <SearchResults />
        <RecipeView />
        <AddRecipeModal />
      </div>
    </AppProvider>
  );
}

export default App;
