import '../styles/pages/Shop.css';
import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

export default function Shop() {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

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
