import { recipeStore } from "./recipeStore";

const FavouritesList = () => {
  const { recipes, favourites } = recipeStore();

  // Get only favorite recipes
  const favouriteRecipes = recipes.filter((recipe) => favourites.includes(recipe.id));

  return (
    <div>
      <h2>Favourite Recipes</h2>
      {favouriteRecipes.length === 0 ? <p>No favourite recipes yet.</p> : null}

      {favouriteRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavouritesList;
