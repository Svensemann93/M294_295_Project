// Diese Seite ist nur für den Admin-Bereich, um Produkte zu verwalten
import { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadProducts = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  const loadCategories = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/categories')
      .then(r => r.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      });
    };
  useEffect(() => {
    loadProducts();
    loadCategories();
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
    loadCategories();
  };

  if (loading) return <p>Lädt …</p>;

  return (
    <div className="admin">
      <h1>Shopverwaltung</h1>
      <div className="admin-forms">
      <ProductForm
        initialProduct={editingProduct}
        onSubmit={handleFormSubmit}
      />

      <CategoryForm
        initialCategory={editingCategory}
        onSubmit={category => {
          setEditingCategory(null);
          loadCategories();
        }}
        />
    </div>
      <ProductList
        products={products}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </div>
  );
}