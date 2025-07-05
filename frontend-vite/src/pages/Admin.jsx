// Diese Seite ist nur für den Admin-Bereich, um Produkte zu verwalten
import { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

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

const handleDeleteProduct = id => {
    fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setEditingProduct(null);
        loadProducts();
      });
  };

  const handleDeleteCategory = id => {
    const isInUse = products.some(product => product.category?.id === id);
    if (isInUse) {
      alert('Diese Kategorie kann nicht gelöscht werden, da sie von Produkten verwendet wird.');
      return;
    }
    fetch(`http://localhost:8080/api/categories/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.error || 'Fehler beim Löschen der Kategorie'); });
        }
        setEditingCategory(null);
        loadCategories();
      })
      .catch(err => {
        console.error('Fehler beim Löschen der Kategorie:', err);
        alert('Fehler beim Löschen der Kategorie: ' + err.message);
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
        onSubmit={() => {
          setEditingCategory(null);
          loadCategories();
          loadProducts();
        }}
        />

      <CategoryList
        categories={categories}
        onDelete={handleDeleteCategory}
        onEdit={category => setEditingCategory(category)}
      />
    </div>
      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditClick}
      />
    </div>
  );
}