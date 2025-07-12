/*
Diese Seite ist nur für den Admin-Bereich, um Produkte zu verwalten.
Sie ermöglicht das Hinzufügen, Bearbeiten und Löschen von Produkten und Kategorien.
Weiter ist auch das Fehlerhandling definiert, um dem Benutzer Rückmeldung zu geben,
wenn etwas schiefgeht.
*/
import { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

/*
export default function Admin() { wird verwendet, um die Komponente als Standard-Export zu exportieren.
-const [loading, setLoading] = useState(true); initialisiert den Zustand für das Laden der Daten.
-const [products, setProducts] = useState([]); initialisiert den Zustand für die Produkte.
-const [editingProduct, setEditingProduct] = useState(null); initialisiert den Zustand für das bearbeitete Produkt.
-const [categories, setCategories] = useState([]); initialisiert den Zustand für die Kategorien.
-const [editingCategory, setEditingCategory] = useState(null); initialisiert den Zustand für die bearbeitete Kategorie.
Diese Zustände werden verwendet, um die Daten im Admin-Bereich zu verwalten.
*/
export default function Admin() {
  // let loading = false
  const [loading, setLoading]   = useState(true);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);


/*
Hier werden die Funktionen zum Laden der Produkte und Kategorien definiert.
  - loadProducts lädt die Produkte von der API und aktualisiert den Zustand products.
  - loadCategories lädt die Kategorien von der API und aktualisiert den Zustand categories.
  - setLoading wird auf true gesetzt, um anzuzeigen, dass die Daten geladen werden.
  - fetch wird verwendet, um die Daten von der API zu laden.
  - .then wird verwendet, um die Antwort der API zu verarbeiten. Das bedeutet, dass die Antwort in JSON umgewandelt wird
    und dann der Zustand aktualisiert wird.
  - setLoading wird auf false gesetzt, um anzuzeigen, dass das Laden der Daten abgeschlossen ist.
*/
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

/*
useEffect wird verwendet, um die Funktionen loadProducts und loadCategories nur einmal auszuführen,
wenn die Komponente geladen wird. Das bedeutet, dass die Produkte und Kategorien nur einmal geladen werden,
wenn die Seite geöffnet wird.
*/
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

/* const handleDeleteProduct wird verwendet, um ein Produkt zu löschen.
  - Es wird eine DELETE-Anfrage an die API gesendet, um das Produkt mit der angegebenen ID zu löschen.
  - Nach dem Löschen wird setEditingProduct auf null gesetzt, um das bearbeitete Produkt zurückzusetzen.
  - Dann wird loadProducts aufgerufen, um die Liste der Produkte neu zu laden.
*/
const handleDeleteProduct = id => {
    fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setEditingProduct(null);
        loadProducts();
      });
  };

/*
  const handleDeleteCategory wird verwendet, um eine Kategorie zu löschen.
  - Zuerst wird überprüft, ob es Produkte gibt, die dieser Kategorie zugeordnet sind.
  - Wenn ja, wird eine Warnung angezeigt und die Löschung abgebrochen.
  - Wenn nein, wird eine DELETE-Anfrage an die API gesendet, um die Kategorie zu löschen.
  - Nach dem Löschen wird setEditingCategory auf null gesetzt und loadCategories aufgerufen, um die Liste der Kategorien neu zu laden.
*/
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

/*
const handleEditClick wird verwendet, um ein Produkt zum Bearbeiten auszuwählen.
- Es wird das Produkt, das bearbeitet werden soll, in den Zustand editingProduct gesetzt.
- Dadurch wird das Produktformular mit den Daten des ausgewählten Produkts gefüllt.
*/
  const handleEditClick = product => {
    setEditingProduct(product);
  };
/*
const handleFormSubmit wird verwendet, um das Formular zu verarbeiten, wenn ein Produkt oder eine Kategorie 
hinzugefügt oder bearbeitet wird. 
- Es setzt die Zustände editingProduct und editingCategory auf null, um das Formular zurückzusetzen.
- Dann werden die Funktionen loadProducts und loadCategories aufgerufen, um die Listen der Produkte und Kategorien neu zu laden.
*/
  const handleFormSubmit = () => {
    setEditingProduct(null);
    setEditingCategory(null);
    loadProducts();
    loadCategories();
  };

  if (loading) return <p>Lädt …</p>;

  /*
  Hier wird die Admin-Komponente gerendert.
  - Es wird ein Titel "Admin-Bereich" angezeigt.
  - Es gibt zwei Formulare: eines für Produkte und eines für Kategorien.
  - Das Produktformular wird mit dem Zustand editingProduct initialisiert.
  */
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