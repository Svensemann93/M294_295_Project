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
        /*Try benutzen wird hier, um Fehler beim Netzwerkaufruf abzufangen. Es wird dabei
        versucht, die Kategorie zu speichern. Falls ein Fehler auftritt, wird dieser im Catch-Block behandelt.*/
        try {
    /*hier wird die URL für den API-Aufruf gesetzt. Wenn es sich um eine Bearbeitung handelt,
    wird die ID der Kategorie in der URL verwendet.
    await bedeutet, dass nur die asynchrone-Funktion blockiert wird während dem Request und nicht der ganze Server. fetch startet dann
    die Anfrage und liefert den Promise*/
            const res = await fetch(
        isEdit
        ? `http://localhost:8080/api/categories/${initialCategory.id}`
        : 'http://localhost:8080/api/categories',
        {
        /*hier wird die HTTP-Methode festgelegt.
        Bei einer Bearbeitung wird PUT verwendet, sonst POST.*/
        method: isEdit ? 'PUT' : 'POST',
        /* hier wird der Content-Type Header gesetzt, um anzugeben,
        dass die Daten im JSON-Format gesendet werden.*/
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
        }
    );

    /*nachfolgend wird geprüft, ob die Antwort des Servers erfolgreich war.
    Wenn nicht, wird eine Fehlermeldung ausgegeben und eine Alert-Box angezeigt.
    Da es für unique keine HTML5-Validierung gibt,
    nutze ich einen alert*/
    if (!res.ok) {
        const text = await res.text();
        console.error('Fehler beim Speichern:', text);
        alert('Speichern fehlgeschlagen');
        return;
    }
    const saved = await res.json();
    alert(`Kategorie "${saved.name}" erfolgreich ${isEdit ? 'aktualisiert' : 'angelegt'}.`);

      // Eingabe zurücksetzen, wenn neu angelegt
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
        />
    </label>
    <button type="submit">{isEdit ? 'Speichern' : 'Hinzufügen'}</button>
    </form>
);
}