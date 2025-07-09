/*
In der ProductList erstellen wir eine Liste von Produkten, die in einem Raster angezeigt wird.
*/
import { useState } from 'react';
import '../styles/components/ProductList.css';
import ProductCard from './ProductCard';

/* Die ProductList-Komponente zeigt eine Liste von Produkten an, die nach Kategorien gefiltert werden können.
- products ist ein Array von Produktobjekten, die angezeigt werden sollen.
- categories ist ein Array von Kategorieobjekten, die für die Filterung der Produkte verwendet werden
- onDelete ist eine Funktion, die aufgerufen wird, wenn ein Produkt gelöscht wird.
- onEdit ist eine Funktion, die aufgerufen wird, wenn ein Produkt bearbeitet wird.
*/
export default function ProductList({
  products,
  categories,
  onDelete,
  onEdit
}){
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