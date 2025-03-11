import { useRecipeStore } from "./recipeStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeList = () => {
  // ✅ Fix: Retrieve each value individually
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  const [editingId, setEditingId] = useState(null);

  // Function to reset the recipes
  const resetRecipes = () => {
    setRecipes([]); // Clears all recipes
  };

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes..."
      />

      {filteredRecipes.length === 0 ? <p>No recipes found.</p> : null}

      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          {editingId === recipe.id ? (
            <EditRecipeForm recipe={recipe} onClose={() => setEditingId(null)} />
          ) : (
            <>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/recipe/${recipe.id}`}>View Details</Link>
              <button onClick={() => setEditingId(recipe.id)}>Edit</button>
              <DeleteRecipeButton id={recipe.id} />

              {/* ✅ Fix: Ensure toggleFavorite is properly used */}
              <button onClick={() => toggleFavorite && toggleFavorite(recipe.id)}>
                {favorites?.includes(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </>
          )}
        </div>
      ))}

      {/* Button to Generate Recommendations */}
      <button onClick={generateRecommendations}>Generate Recommendations</button>

      {/* Example: Reset recipes using setRecipes */}
      <button onClick={resetRecipes}>Reset Recipes</button>
    </div>
  );
};

export default RecipeList;
