import { useEffect } from "react";
import { useRecipeStore } from "./recipeStore";

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  // Automatically generate recommendations on mount
  useEffect(() => {
    if (recommendations.length === 0) {
      generateRecommendations();
    }
  }, [recommendations.length, generateRecommendations]);

  return (
    <div>
      <h2>Recommended Recipes</h2>
      
      {recommendations.length === 0 ? (
        <>
          <p>No recommendations yet.</p>
          <button onClick={generateRecommendations}>Generate Recommendations</button>
        </>
      ) : (
        <>
          {recommendations.map((recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
          <button onClick={generateRecommendations}>Refresh Recommendations</button>
        </>
      )}
    </div>
  );
};

export default RecommendationsList;
