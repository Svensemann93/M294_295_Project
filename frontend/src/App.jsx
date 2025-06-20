import { useEffect, useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = (newProduct) => {
    fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => loadProducts())
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => loadProducts())
      .catch((err) => console.error('Fehler beim Löschen:', err));
  };

  if (loading) return <p className="loading">Lädt …</p>;

  return (
    <div className="container">
      <h1>Produkte</h1>
      <ProductForm onAdd={handleAdd} />
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
}

export default App;