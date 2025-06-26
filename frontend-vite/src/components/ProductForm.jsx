import { useState } from 'react';
import '../styles/components/ProductForm.css';
 
export default function ProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description, price: parseFloat(price),  rating: parseFloat(rating) });
    setName('');
    setDescription('');
    setPrice('');
    setRating('');
  };

  return (
    <section className="add-section">
      <h2>Neues Produkt hinzufügen</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preis"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.1"
          min ="0.0"
          max="5.0"
          placeholder="Rating"
          value={rating}
          onChange={(e) =>setRating(e.target.value)}
          required
        />
        <button type="submit">Hinzufügen</button>
      </form>
    </section>
  );
}