import { useState, useEffect } from 'react';
import '../styles/components/CategoryForm.css';

export default function CategoryForm({ initialCategory = null, onSubmit }) {
    const isEdit = Boolean(initialCategory);
    const [name, setName] = useState('');

    useEffect(() => {
    if (isEdit) {
        setName(initialCategory.name);
    } else {
        setName('');
    }
    }, [initialCategory, isEdit]);

    const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) {
        alert('Bitte geben Sie einen Kategorienamen ein.');
        return;
    }
        try {
        const res = await fetch(
        isEdit
        ? `http://localhost:8080/api/categories/${initialCategory.id}`
        : 'http://localhost:8080/api/categories',
        {
        method: isEdit ? 'PUT' : 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
        }
    );

    if (!res.ok) {
        const text = await res.text();
        console.error('Fehler beim Speichern:', text);
        alert('Speichern fehlgeschlagen');
        return;
    }
    const saved = await res.json();
    alert(`Kategorie "${saved.name}" erfolgreich ${isEdit ? 'aktualisiert' : 'angelegt'}.`);

    if (!isEdit) setName('');

    if (onSubmit) onSubmit(saved);
    } catch (err) {
    console.error('Netzwerkfehler:', err);
    alert('Netzwerkfehler beim Speichern');
    }
};

return (
    <form className='category-form' onSubmit={handleSubmit}>
    <h2>{isEdit ? 'Kategorie bearbeiten' : 'Neue Kategorie hinzufügen'}</h2>
    <label>
        <input
            placeholder="Kategoriename"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            minLength={1}
            maxLength={50}
        />
    </label>
    <button type="submit">{isEdit ? 'Speichern' : 'Hinzufügen'}</button>
    </form>
);
}