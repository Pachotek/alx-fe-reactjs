import { useRecipeStore } from "./recipeStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeList = () => {
  const { recipes, searchTerm, setSearchTerm, favourites, toggleFavourite, generateRecommendations, setRecipe } =
    useRecipeStore();
  const [editingId, setEditingId] = useState(null);

  // Function to reset the recipes (example usage of setRecipe)
  const resetRecipes = () => {
    setRecipe([]); // Clears all recipes (or could restore defaults)
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

              {/* Favourite Button */}
              <button onClick={() => toggleFavourite(recipe.id)}>
                {favourites.includes(recipe.id) ? "Remove from Favourites" : "Add to Favourites"}
              </button>
            </>
          )}
        </div>
      ))}

      {/* Button to Generate Recommendations */}
      <button onClick={generateRecommendations}>Generate Recommendations</button>

      {/* Example: Reset recipes using setRecipe */}
      <button onClick={resetRecipes}>Reset Recipes</button>
    </div>
  );
};

export default RecipeList;
