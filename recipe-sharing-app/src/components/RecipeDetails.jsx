import { useParams, Link } from "react-router-dom";
import { recipeStore } from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const { recipes } = recipeStore(); // Get recipes from Zustand store

  // Convert ID to number (because Zustand IDs might be stored as numbers)
  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      {/* Display Cooking Time and Category */}
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Steps</h3>
      <ol>
        {recipe.steps?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <Link to="/">Back to Recipes</Link>
    </div>
  );
};

export default RecipeDetails;
