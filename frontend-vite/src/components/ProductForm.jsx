import { useState, useEffect } from "react";
import "../styles/components/ProductForm.css";

export default function ProductForm({ initialProduct = null, onSubmit }) {
  const isEdit = Boolean(initialProduct);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((list) => setCategories(list))
      .catch((err) => console.error("Error loading categories", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setPrice(initialProduct.price);
      setRating(initialProduct.rating);
      setCategoryId(initialProduct.category?.id || "");
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setRating("");
      setCategoryId("");
    }
  }, [initialProduct, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    if (parsedPrice < 0) {
      alert("Der Preis muss eine positive Zahl sein.");
      return;
    }

    if (!categoryId) {
      alert("Bitte wählen Sie eine Kategorie aus.");
      return;
    }

    const parsedRating = parseFloat(rating);
    if (parsedRating < 0 || parsedRating > 5) {
      alert("Die Bewertung muss zwischen 0 und 5 liegen.");
      return;
    }

    const payload = {
      name,
      description,
      price: parsedPrice,
      rating: parsedRating,
      category: { id: categoryId },
    };

    const url = isEdit
      ? `http://localhost:8080/api/products/${initialProduct.id}`
      : `http://localhost:8080/api/products`;
    const method = isEdit ? "PUT" : "POST";

    let res = null;
    try {
      res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();

      onSubmit(saved);
      if (!isEdit) {
        setName("");
        setDescription("");
        setPrice("");
        setRating("");
        setCategoryId("");
      }
    } catch (error) {
      console.error("Save failed", error);
      alert("Speichern fehlgeschlagen");
      return;
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Produkt bearbeiten" : "Neues Produkt anlegen"}</h2>
      <label className="category-select">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}
          required
        >
          {}
          <option value="">Kategorie wählen</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={1}
        maxLength={100}
      />
      <textarea
        placeholder="Beschreibung"
        value={description}
        minLength={1}
        maxLength={2000}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        step={0.05}
        min={0.0}
        placeholder="Preis"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        step={0.1}
        min={0.0}
        max={5.0}
        placeholder="Bewertung (0-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <button type="submit">{isEdit ? "Speichern" : "Hinzufügen"}</button>
    </form>
  );
}
