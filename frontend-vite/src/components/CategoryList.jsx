import CategoryCard from "./CategoryCard";
import "../styles/components/CategoryList.css";

export default function CategoryList({ categories, onDelete, onEdit }) {
  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
