import { create } from "zustand";

// ✅ Load recipes from localStorage
const loadRecipes = () => {
  const storedRecipes = localStorage.getItem("recipes");
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

export const useRecipeStore = create((set, get) => ({
  recipes: loadRecipes(),
  searchTerm: "",
  favorites: [],
  recommendations: [],

  addRecipe: (newRecipe) => {
    const updatedRecipes = [...get().recipes, { 
      id: Date.now(), 
      category: newRecipe.category || "Uncategorized",
      cookTime: newRecipe.cookTime || 0,
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

  setRecipes: (newRecipes) => {
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    set({ recipes: newRecipes });
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  addFavorite: (id) => {
    set((state) => ({
      favorites: [...state.favorites, id]
    }));
  },

  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id)
    }));
  },

  generateRecommendations: () => {
    const { recipes, favorites } = get();
    let recommended = [];

    if (favorites.length > 0) {
      // Get favorite recipes
      const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

      // Extract categories of favorite recipes
      const favoriteCategories = [...new Set(favoriteRecipes.map((recipe) => recipe.category))];

      // Prioritize recommendations based on favorite categories
      recommended = recipes.filter(
        (recipe) =>
          favoriteCategories.includes(recipe.category) && 
          !favorites.includes(recipe.id) // Ensure it's not already a favorite
      );
    }

    // If recommendations are less than 5, add random recipes to diversify
    if (recommended.length < 5) {
      const additionalRecipes = recipes
        .filter((recipe) => !favorites.includes(recipe.id)) // Avoid recommending favorites
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, 5 - recommended.length); // Pick remaining needed

      recommended = [...recommended, ...additionalRecipes];
    }

    // Finalize recommendations (ensure uniqueness)
    set({ recommendations: [...new Set(recommended)].slice(0, 5) });
  },
}));

export default useRecipeStore;
