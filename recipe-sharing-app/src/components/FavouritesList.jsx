import { useRecipeStore } from "./recipeStore";

const FavoritesList = () => {
  const { recipes, favorites } = useRecipeStore(); 

  // Get only favorite recipes
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div>
      <h2>Favorite Recipes</h2> {}
      {favoriteRecipes.length === 0 ? <p>No favorite recipes yet.</p> : null}

      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList; 
