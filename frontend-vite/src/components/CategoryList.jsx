import CategoryCard from "./CategoryCard";
import "../styles/components/CategoryList.css";

/*
es werden alles Kategoriekarten geladen und angezeigt.
<CategoryCard> ist eine Komponente, die für jede Kategorie eine Karte rendert.
*/
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
