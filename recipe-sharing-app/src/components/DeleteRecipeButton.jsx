import { useRecipeStore } from "../store/useRecipeStore";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return <button onClick={() => deleteRecipe(id)}>Delete</button>;
};

export default DeleteRecipeButton;
