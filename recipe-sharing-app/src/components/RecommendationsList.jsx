import { useRecipeStore } from "./recipeStore";

const RecommendationsList = () => {
  const { recommendedRecipes } = useRecipeStore();

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendedRecipes.length === 0 ? <p>No recommendations yet.</p> : null}

      {recommendedRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
