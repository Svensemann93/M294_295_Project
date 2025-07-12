/*
Hier wird die Shop-Seite erstellt.
Diese Seite zeigt eine Liste von Produkten an.
*/
import '../styles/pages/Shop.css';
import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

/*
hier wird die Shop-Komponente exportiert. Das wird benötigt, um die Seite in der App anzuzeigen.
Die Komponente lädt Produkte und Kategorien von der API und zeigt sie an.
*/
export default function Shop() {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  /*
  Hier wird die useEffect-Hook verwendet, um die Produkte und Kategorien von der API zu laden. 
  UseEffect wird nur einmal ausgeführt, wenn die Komponente geladen wird. Falls ein Fehler auftritt, wird eine Fehlermeldung gesetzt.
  */
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/products').then(res => res.json()),
      fetch('http://localhost:8080/api/categories').then(res => res.json()),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fehler beim Laden:', err);
        setError('Daten konnten nicht geladen werden.');
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Lädt …</p>;
  if (error)   return <p className="error">{error}</p>;
  return (
    <div className="frontpage">
      <h1>Willkommen in meinem Shop</h1>
      <ProductList
        products={products}
        categories={categories}
      />
    </div>
  );
}
