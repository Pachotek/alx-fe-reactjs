import { recipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = recipeStore((state) => state.deleteRecipe);

  return <button onClick={() => deleteRecipe(id)}>Delete</button>;
};

export default DeleteRecipeButton;
