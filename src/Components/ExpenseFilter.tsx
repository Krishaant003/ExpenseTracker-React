import categories from "./Category";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((categories) => (
        <option key={categories} value={categories}>
          {categories}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
