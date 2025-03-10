import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const AddRecipeForm = () => {
  const { recipes, setRecipe } = useRecipeStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cookTime, setCookTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecipe = {
      id: Date.now(),
      title,
      description,
      category,
      ingredients: ingredients.split(',').map(ing => ing.trim()), // Convert string to array
      cookTime: Number(cookTime)
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipe(updatedRecipes); //  Use setRecipe

    // Reset form fields
    setTitle('');
    setDescription('');
    setCategory('');
    setIngredients('');
    setCookTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>

      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma-separated)"
        required
      />

      <input
        type="number"
        value={cookTime}
        onChange={(e) => setCookTime(e.target.value)}
        placeholder="Cook Time (in minutes)"
        required
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
