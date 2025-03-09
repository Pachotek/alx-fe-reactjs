import { create } from "zustand";

const loadRecipes = () => {
  const storedRecipes = localStorage.getItem("recipes");
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

export const recipeStore = create((set, get) => ({
  recipes: loadRecipes(),
  searchTerm: "",
  favourites: [],
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

  toggleFavourite: (id) => {
    const { favourites } = get();
    let updatedFavourites;
    if (favourites.includes(id)) {
      updatedFavourites = favourites.filter((favId) => favId !== id);
    } else {
      updatedFavourites = [...favourites, id];
    }
    set({ favourites: updatedFavourites });
  },

  generateRecommendations: () => {
    const { recipes, favourites } = get();
    // Simple recommendation: suggest recipes that are NOT already favourited
    const recommended = recipes.filter((recipe) => !favourites.includes(recipe.id));
    set({ recommendedRecipes: recommended });
  },
}));

export default recipeStore;
