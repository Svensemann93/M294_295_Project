import { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

export default function Admin() {
  const [loading, setLoading]   = useState(true);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

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
  const alreadyExisting = products.some(p => p.category?.id === id);
  if (alreadyExisting) {
    alert('ACHTUNG, diese Kategorie enthält Produkte! Bitte entferne diese Produkte zuerst, bevor du die Kategorie löschst.',);
    return;
  }

  fetch(`http://localhost:8080/api/categories/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw new Error(err.error || 'Delete failed'); });
      }
      setEditingCategory(null);
      loadCategories();
    })
    .catch(err => {
      console.error('Fehler beim Löschen:', err);
      alert('Fehler beim Löschen der Kategorie: ' + err.message);
    });
};

  const handleEditClick = product => {
    setEditingProduct(product);
  };

  const handleFormSubmit = () => {
    setEditingProduct(null);
    setEditingCategory(null);
    loadProducts();
    loadCategories();
  };

  if (loading) return <p>Lädt …</p>;

  return (
    <div className="admin">
      <h1>Admin-Bereich</h1>
        <div className="admin-forms">
          <ProductForm
            initialProduct={editingProduct}
            onSubmit={handleFormSubmit}
          />
          <div className='category-form-container'>
            <CategoryForm
              initialCategory={editingCategory}
              onSubmit={handleFormSubmit}
            />
            <CategoryList
              categories={categories}
              onDelete={handleDeleteCategory}
              onEdit={category => setEditingCategory(category)}
          />
          </div>
        </div>
      <ProductList
        products={products}
        categories={categories}
        onDelete={handleDeleteProduct}
        onEdit={handleEditClick}
      />
    </div>
  );
}