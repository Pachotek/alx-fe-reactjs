import { useRecipeStore } from "../store/useRecipeStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeList = () => {
  const { recipes, searchTerm, setSearchTerm, favorites, toggleFavorite, generateRecommendations } =
    useRecipeStore();
  const [editingId, setEditingId] = useState(null);

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

              {/* Favorite Button */}
              <button onClick={() => toggleFavorite(recipe.id)}>
                {favorites.includes(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </>
          )}
        </div>
      ))}

      {/* Button to Generate Recommendations */}
      <button onClick={generateRecommendations}>Generate Recommendations</button>
    </div>
  );
};

export default RecipeList;
