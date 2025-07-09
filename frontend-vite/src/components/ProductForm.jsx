/*
Formular für die Erstellung und Bearbeitung von Produkten.
Ermöglicht das Eingeben von Name, Beschreibung, Preis, Bewertung und Kategorie.
*/
import { useState, useEffect, use } from 'react';
import '../styles/components/ProductForm.css';

/*
macht aus initialProduct einen boolean Wert, der true ist, wenn initialProduct nicht null ist. Das wird verwendet, um zu unterscheiden,
ob das Formular zum Bearbeiten eines bestehenden Produkts oder zum Erstellen eines neuen Produkts verwendet wird.
initialProduct ist das Produkt, das bearbeitet werden soll, oder null, wenn ein neues Produkt erstellt werden soll.
*/
export default function ProductForm({ initialProduct = null, onSubmit }) {
  const isEdit = Boolean(initialProduct);

/*
hier definieren wir die Zustände für die Eingabefelder des Formulars.
Es wird definiert, welche Werte die Eingabefelder haben sollen, wenn das Formular geladen wird.
Wir haben Platzhalter für Name, Beschreibung, Preis, Bewertung und Kategorie definiert, welche uns anzeigen,
was der Benutzer eingeben soll. (siehe return)
*/
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const[categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

/*
hier laden wir die Kategorien von der API, um sie im Dropdown-Menü anzuzeigen.
Wir verwenden useEffect, um die Kategorien nur einmal zu laden, wenn das Formular geladen wird.
Die Kategorien werden in einem Array gespeichert, das wir später im Dropdown-Menü verwenden.
Wir verwenden fetch, um die Kategorien von der API zu laden und speichern sie im Zustand categories. Fetch ist eine eingebaute
Funktion in JavaScript, die es uns ermöglicht, HTTP-Anfragen zu machen. In diesem Fall machen wir eine GET-Anfrage an die URL
http://localhost:8080/api/categories, um die Kategorien zu laden. Dies müssen wir machen, weil wir die Kategorien an einer anderen
Stelle definiert haben und sie nicht im Formular selbst speichern wollen.
Wenn ein Fehler auftritt, wird eine Fehlermeldung in der Konsole ausgegeben.
*/
  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then(res => res.json())
      .then(list => setCategories(list))
      .catch(err => console.error('Error loading categories', err));
  }, []);

/*
hier setzen wir die Eingabefelder des Formulars auf die Werte des vorhandenen Produkts, wenn das Formular im Bearbeitungsmodus ist.
Wenn isEdit true ist, setzen wir die Eingabefelder auf die Werte des initialProduct. Wenn isEdit false ist, setzen wir die
Eingabefelder auf leere Werte.
Dies wird verwendet, um das Formular im Bearbeitungsmodus mit den Werten des Produkts zu füllen, das bearbeitet werden soll.
*/
  useEffect(() => {
    if (isEdit) {
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setPrice(initialProduct.price);
      setRating(initialProduct.rating);
      setCategoryId(initialProduct.category?.id || '');
    } else {

      setName('');
      setDescription('');
      setPrice('');
      setRating('');
      setCategoryId('');
    }
  }, [initialProduct, isEdit]);

/*
handleSubmit ist die Funktion, die aufgerufen wird, wenn das Formular abgeschickt wird.
Sie verhindert das Standardverhalten des Formulars und führt dann die Validierung der Eingabefelder durch.
Das Standartverhalten des Formulars ist, dass die Seite komplett neu geladen wird, wenn das Formular abgeschickt wird. Wir wollen
das aber nicht, sondern nur die angepassten Daten neu angezeigt bekommen.
Wenn die Validierung erfolgreich ist, wird das Produkt an die API gesendet, um es zu speichern oder zu aktualisieren.
*/
  const handleSubmit = async e => {
    e.preventDefault();

// Validierung: Preis darf nicht negativ sein
    const parsedPrice = parseFloat(price);
    if (parsedPrice < 0) {
      alert('Der Preis muss eine positive Zahl sein.');
      return;
    }

    if (!categoryId) {
      alert('Bitte wählen Sie eine Kategorie aus.');
      return;
    }

// Validierung: Rating zwischen 0 und 5
    const parsedRating = parseFloat(rating);
    if (parsedRating < 0 || parsedRating > 5) {
      alert('Die Bewertung muss zwischen 0 und 5 liegen.');
      return;
    }

    /*
    const payload macht aus den Eingabewerten ein Objekt, das an die API gesendet wird.
    Es enthält die Werte für Name, Beschreibung, Preis, Bewertung und Kategorie.
    */
    const payload = {
      name,
      description,
      price: parsedPrice,
      rating: parsedRating,
      category: {id: categoryId}
    };

/*
Hier wird die URL und die HTTP-Methode festgelegt, je nachdem, ob wir ein Produkt bearbeiten oder erstellen.
Wenn isEdit true ist, verwenden wir die PUT-Methode und die URL des Produkts, das bearbeitet werden soll.
Wenn isEdit false ist, verwenden wir die POST-Methode und die URL für die Erstellung eines neuen Produkts.
*/
    const url    = isEdit
      ? `http://localhost:8080/api/products/${initialProduct.id}`
      : `http://localhost:8080/api/products`;
    const method = isEdit ? 'PUT' : 'POST';

/*
const res macht eine HTTP-Anfrage an die API, um das Produkt zu speichern oder zu aktualisieren.
await fetch macht eine asynchrone Anfrage an die API und wartet auf die Antwort. Asynchron bedeutet, dass der Code nicht weiter
ausgeführt wird, bis die Anfrage abgeschlossen ist. Das ist wichtig, damit wir die Antwort der API erhalten,
bevor wir mit dem nächsten Schritt fortfahren.
Wenn die Anfrage erfolgreich ist, wird das gespeicherte Produkt zurückgegeben und an die onSubmit-Funktion übergeben.
Wenn die Anfrage fehlschlägt, wird eine Fehlermeldung in der Konsole ausgegeben.
*/
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error('Save failed', await res.text());
      return;
    }
    const saved = await res.json();

    onSubmit(saved);

/*Hier setzen wir die Eingabefelder des Formulars zurück, wenn das Produkt erfolgreich gespeichert wurde.
Wenn isEdit true ist, bedeutet das, dass wir ein Produkt bearbeiten und die Eingabefelder nicht zurücksetzen wollen.
Wenn isEdit false ist, bedeutet das, dass wir ein neues Produkt erstellen und die Eingabefelder zurücksetzen wollen.
*/
    if (!isEdit) {
      setName(''); setDescription(''); setPrice(''); setRating(''); setCategoryId('');
    }
  };

  return (
    /*
    <form> ist das HTML-Element, das das Formular darstellt.
    Das className-Attribut wird verwendet, um dem Formular eine CSS-Klasse zuzuweisen,
    die in der Datei ProductForm.css definiert ist. Dadurch können wir das Formular stylen und anpassen.
    Das onSubmit-Attribut wird verwendet, um die handleSubmit-Funktion aufzurufen, welche wir oben definiert haben.
    Dadurch wird das Formular abgeschickt, wenn der Benutzer auf den "Hinzufügen"-Button klickt.
    */
    <form className='product-form' onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Produkt bearbeiten' : 'Neues Produkt anlegen'}</h2>

      <label className="category-select">
        <select
        value={categoryId}
        onChange={e => setCategoryId(parseInt(e.target.value, 10))}
        required
        >
          <option value="">Kategorie wählen</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        minLength={1}
        maxLength={100}
      />
      <textarea
        placeholder="Beschreibung"
        value={description}
        minLength={1}
        maxLength={2000}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        step={0.05}
        min={0.00}
        placeholder="Preis"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        step={0.1}
        min={0.0}
        max={5.0}
        placeholder="Bewertung (0-5)"
        value={rating}
        onChange={e => setRating(e.target.value)}
        required
      />
      <button type="submit">{isEdit ? 'Speichern' : 'Hinzufügen'}</button>
    </form>
  );
}