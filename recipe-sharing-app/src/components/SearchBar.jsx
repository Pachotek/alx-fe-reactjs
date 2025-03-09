import { recipeStore } from './recipeStore';

const SearchBar = () => {
  const { setSearchTerm, setFilterCategory, setFilterIngredients, setFilterCookTime } = recipeStore();

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Filter by ingredient..."
        onChange={(e) => setFilterIngredients(e.target.value)}
      />

      <select onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>

      <input
        type="number"
        placeholder="Max cook time (min)..."
        onChange={(e) => setFilterCookTime(Number(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
