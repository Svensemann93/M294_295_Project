import { useState, useEffect } from 'react';
import '../styles/components/ProductForm.css';

export default function ProductForm({ initialProduct = null, onSubmit }) {
  const isEdit = Boolean(initialProduct);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (isEdit) {
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setPrice(initialProduct.price);
      setRating(initialProduct.rating);
    } else {

      setName('');
      setDescription('');
      setPrice('');
      setRating('');
    }
  }, [initialProduct]);

  const handleSubmit = async e => {
    e.preventDefault();

        // Validierung: Preis darf nicht negativ sein
    const parsedPrice = parseFloat(price);
    if (parsedPrice < 0) {
      alert('Der Preis muss eine positive Zahl sein.');
      return;
    }
    // Validierung: Rating zwischen 0 und 5
    const parsedRating = parseFloat(rating);
    if (parsedRating < 0 || parsedRating > 5) {
      alert('Die Bewertung muss zwischen 0 und 5 liegen.');
      return;
    }

    const payload = {
      name,
      description,
      price: parsedPrice,
      rating: parsedRating
    };

    const url    = isEdit
      ? `http://localhost:8080/api/products/${initialProduct.id}`
      : `http://localhost:8080/api/products`;
    const method = isEdit ? 'PUT' : 'POST';

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

    if (!isEdit) {
      setName(''); setDescription(''); setPrice(''); setRating('');
    }
  };

  return (
    <form className='product-form' onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Produkt bearbeiten' : 'Neues Produkt anlegen'}</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Beschreibung"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        step="0.05"
        min="0.00"
        placeholder="Preis"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.1"
        min="0.0"
        max="5.0"
        placeholder="Bewertung (0-5)"
        value={rating}
        onChange={e => setRating(e.target.value)}
        required
      />
      <button type="submit">{isEdit ? 'Speichern' : 'Hinzufügen'}</button>
    </form>
  );
}