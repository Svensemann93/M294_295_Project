import '../styles/pages/Shoeppe.css';
import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

export default function Shoeppe() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fehler beim Laden:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Lädt …</p>;

  return (
    <div className="shoeppe">
      <h1>Willkommen bei Shöppe.ch</h1>
      <ProductList products={products} />
    </div>
  );
}
