import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

export const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ Explicitly ensuring event.preventDefault() is present
    updateRecipe(recipe.id, { title, description });
    onClose(); // Close the form after updating
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;
