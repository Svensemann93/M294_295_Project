import { useState } from 'react';
import '../styles/components/ProductList.css';
import ProductCard from './ProductCard';

export default function ProductList({
  products,
  categories,
  onDelete,
  onEdit
})

{
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const filtered = selectedCategoryId
    ? products.filter(products => products.category?.id === selectedCategoryId)
    : products;

  return (
    <>
      <div className="category-filters">
        <button
          className={selectedCategoryId === null ? 'active' : ''}
          onClick={() => setSelectedCategoryId(null)}
        >
          Alle
        </button>
        {categories.map(categories => (
          <button
            key={categories.id}
            className={selectedCategoryId === categories.id ? 'active' : ''}
            onClick={() => setSelectedCategoryId(categories.id)}
          >
            {categories.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map(products => (
          <ProductCard
            key={products.id}
            product={products}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
}