import { create } from "zustand";

const loadRecipes = () => {
  const storedRecipes = localStorage.getItem("recipes");
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

export const useRecipeStore = create((set, get) => ({
  recipes: loadRecipes(),
  searchTerm: "",
  favorites: [],
  recommendedRecipes: [], // Ensure this is an array, not a function

  addRecipe: (newRecipe) => {
    const updatedRecipes = [...get().recipes, { 
      id: Date.now(), 
      category: newRecipe.category || "Uncategorized", // Default category
      cookTime: newRecipe.cookTime || 0, // Default cook time
      ...newRecipe 
    }];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    set({ recipes: updatedRecipes });
  },

  deleteRecipe: (id) => {
    const updatedRecipes = get().recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    set({ recipes: updatedRecipes });
  },

  updateRecipe: (id, updatedRecipe) => {
    const updatedRecipes = get().recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    set({ recipes: updatedRecipes });
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  toggleFavorite: (id) => {
    const { favorites } = get();
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    set({ favorites: updatedFavorites });
  },

  generateRecommendations: () => {
    const { recipes, favorites } = get();
    // Simple recommendation: suggest recipes that are NOT already favorited
    const recommended = recipes.filter((recipe) => !favorites.includes(recipe.id));
    set({ recommendedRecipes: recommended });
  },
}));

export default useRecipeStore;
