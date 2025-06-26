// Diese Seite ist nur für den Admin-Bereich, um Produkte zu verwalten
import { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

const handleDelete = id => {
    fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setEditingProduct(null);
        loadProducts();
      });
  };

  const handleEditClick = product => {
    setEditingProduct(product);
  };

  const handleFormSubmit = savedProduct => {
    setEditingProduct(null);
    loadProducts();
  };

  if (loading) return <p>Lädt …</p>;

  return (
    <div className="admin">
      <h1>Produkte verwalten</h1>

      <ProductForm
        initialProduct={editingProduct}
        onSubmit={handleFormSubmit}
      />

      <ProductList
        products={products}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </div>
  );
}