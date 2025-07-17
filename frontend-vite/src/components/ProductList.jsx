/*
In der ProductList erstellen wir eine Liste von Produkten, die in einem Raster angezeigt wird.
*/
import { useState } from 'react';
import '../styles/components/ProductList.css';
import ProductCard from './ProductCard';

/*
Die ProductList-Komponente zeigt eine Liste von Produkten an, die nach Kategorien gefiltert werden können.
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
})

/*
hier verwenden wir den useState-Hook, um den Zustand der ausgewählten Kategorie zu verwalten. das bedeutet,
dass wir den Zustand der ausgewählten Kategorie speichern, um die Produkte nach dieser Kategorie zu filtern und anzuzeigen.
Eifach gesagt ist das der Filter, der die Produkte nach Kategorien sortiert.
- const [selectedCategoryId, setSelectedCategoryId] = useState(null) macht einen Zustand, der den Wert null hat, wenn keine Kategorie
  ausgewählt ist.
- const filtered = selectedCategoryId
    ? products.filter(products => products.category?.id === selectedCategoryId)
    : products;
Macht eine Variable, die die gefilterten Produkte enthält.
Wenn eine Kategorie ausgewählt ist, werden nur die Produkte angezeigt, die zu dieser Kategorie gehören.
*/
{
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const filtered = selectedCategoryId
    ? products.filter(products => products.category?.id === selectedCategoryId)
    : products;

  /*
  Hier werden die Buttons für die Kategorien erstellt.
  - Der erste Button zeigt "Alle" an und ist aktiv, wenn keine Kategorie ausgewählt ist.
  - Für jede Kategorie wird ein Button erstellt, der den Namen der Kategorie anzeigt.
  - Wenn eine Kategorie ausgewählt ist, wird der entsprechende Button aktiv.
  - Wenn der Button geklickt wird, wird die ausgewählte Kategorie aktualisiert, um die Produkte nach dieser Kategorie zu filtern.
  */
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

        {/* Hier wird die Liste der Produkte angezeigt. Dabei wird die ProductCard-Komponente für jedes Produkt verwendet
        um es anzuzeigen.*/}
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