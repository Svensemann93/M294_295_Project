/*
Hier wird ein Formular für die Kategorienverwaltung erstellt. Es ermöglicht das Hinzufügen und Bearbeiten von Kategorien.
*/
import { useState, useEffect } from 'react';
import '../styles/components/CategoryForm.css';

/* export default function CategoryForm({ initialCategory = null, onSubmit }) macht die Komponente CategoryForm
    verfügbar, die entweder eine neue Kategorie anlegt oder eine bestehende Kategorie bearbeitet.
    - const isEdit = Boolean(initialCategory); prüft, ob eine Kategorie zum Bearbeiten übergeben wurde.
    - const [name, setName] = useState(''); initialisiert den Zustand für den Kategorienamen.*/
export default function CategoryForm({ initialCategory = null, onSubmit }) {
    const isEdit = Boolean(initialCategory);
    const [name, setName] = useState('');

    /*
    useEffect wird verwendet, um den Kategorienamen zu setzen, wenn eine Kategorie zum Bearbeiten übergeben wird.
    Wenn isEdit true ist, wird der Name der initialen Kategorie gesetzt, andernfalls wird der Name auf einen leeren String gesetzt.
    */
    useEffect(() => {
    if (isEdit) {
        setName(initialCategory.name);
    } else {
        setName('');
    }
    /*
    [initialCategory, isEdit] bedeutet,
    dass der Effekt nur ausgeführt wird, wenn sich initialCategory oder isEdit ändert.
    Dadurch wird sichergestellt, dass der Name nur aktualisiert wird, wenn eine neue Kategorie zum Bearbeiten übergeben wird
    oder wenn der Bearbeitungsmodus wechselt.
    */
    }, [initialCategory, isEdit]);

    /*
    handleSubmit ist eine asynchrone Funktion, die beim Absenden des Formulars aufgerufen wird.
    Sie verhindert die Standardaktion des Formulars, prüft, ob ein Name eingegeben wurde,
    und sendet dann die Daten an den Server. Wenn die Kategorie erfolgreich gespeichert wurde,
    wird eine Erfolgsmeldung angezeigt und die Eingabe zurückgesetzt, wenn es sich um eine neue Kategorie handelt.
    Asynchron bedeutet, dass die Funktion nicht sofort ein Ergebnis zurückgibt, sondern stattdessen ein Promise zurückgibt,
    das später aufgelöst wird, wenn die Operation abgeschlossen ist.
    .trim entfernt Leerzeichen am Anfang und Ende des Namens.
    */
    const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) {
        alert('Bitte geben Sie einen Kategorienamen ein.');
        return;
    }
        /*
        Try benutzen wird hier, um Fehler beim Netzwerkaufruf abzufangen. Es wird dabei
        versucht, die Kategorie zu speichern. Falls ein Fehler auftritt, wird eine Fehlerbehandlung
        durchgeführt, die eine Fehlermeldung in der Konsole ausgibt und eine Alert-Box anzeigt.
        Das ist wichtig, um den Benutzer über Netzwerkprobleme zu informieren, ohne dass die Anwendung abstürzt.
        */
        try {
    /*
    const res = await fetch(...) führt einen HTTP-Request an den Server aus. Dieser Request sendet die Daten der Kategorie
    an den Server, um sie zu speichern oder zu aktualisieren.
    await bedeutet, dass die Funktion wartet, bis der Request abgeschlossen ist,bevor sie mit dem nächsten Schritt fortfährt.
    - Wenn isEdit true ist, wird die PUT-Methode verwendet, um eine bestehende Kategorie zu aktualisieren.
    - Wenn isEdit false ist, wird die POST-Methode verwendet, um eine neue Kategorie anzulegen.
    - Der URL für den Request hängt davon ab, ob es sich um eine Bearbeitung oder eine Neuanlage handelt.
    */
        const res = await fetch(
        isEdit
        ? `http://localhost:8080/api/categories/${initialCategory.id}`
        : 'http://localhost:8080/api/categories',
        {
        method: isEdit ? 'PUT' : 'POST',

        /*
        hier wird der Content-Type Header gesetzt, um anzugeben,dass die Daten im JSON-Format an den Server gesendet werden.
        */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
        }
    );

    /*
    nachfolgend wird geprüft, ob die Antwort des Servers erfolgreich war. Wenn nicht, wird eine Fehlermeldung ausgegeben
    und eine Alert-Box angezeigt.
    Da es für unique keine HTML5-Validierung gibt, nutze ich einen alert.
    */
    if (!res.ok) {
        const text = await res.text();
        console.error('Fehler beim Speichern:', text);
        alert('Speichern fehlgeschlagen');
        return;
    }
    /*
    const saved = await res.json() wandelt die Antwort des Servers in ein JSON-Objekt um.
    Dieses Objekt enthält die gespeicherte Kategorie, die dann in einer Alert-Box angezeigt wird, mit dem Hinweis,
    dass die Kategorie erfolgreich gespeichert wurde.
    await bedeutet, dass die Funktion wartet, bis die Antwort des Servers verarbeitet wurde, bevor sie mit dem nächsten
    Schritt fortfährt.
    */
    const saved = await res.json();
    alert(`Kategorie "${saved.name}" erfolgreich ${isEdit ? 'aktualisiert' : 'angelegt'}.`);

    /*
    Wenn es sich um eine neue Kategorie handelt, wird der Name zurückgesetzt, damit das Formular für die nächste Eingabe bereit ist.
    */
    if (!isEdit) setName('');

    /* if (onSubmit) onSubmit(saved); ruft die onSubmit-Funktion auf, wenn sie definiert ist.
    Diese Funktion wird verwendet, um die gespeicherte Kategorie an die übergeordnete Komponente zurückzugeben,
    damit sie dort weiterverarbeitet werden kann, z.B. um die Liste der Kategorien zu aktualisieren.
    catch (err) fängt Fehler ab, die während des Netzwerkaufrufs auftreten können.
    console.error('Netzwerkfehler:', err); gibt den Fehler in der Konsole aus und alert('Netzwerkfehler beim Speichern')
    zeigt eine Fehlermeldung an, wenn ein Netzwerkfehler auftritt.
    Diese Fehlerbehandlung ist wichtig, um den Benutzer über Probleme beim Speichern der Kategorie zu informieren,
    ohne dass die Anwendung abstürzt.
    Solche Fehler können z.B. auftreten, wenn der Server nicht erreichbar ist oder ein Problem mit der Netzwerkverbindung besteht.
    Diese Funktion ist asynchron, da sie auf die Antwort des Servers wartet, bevor sie fortfährt.
    */
    if (onSubmit) onSubmit(saved);
    } catch (err) {
    console.error('Netzwerkfehler:', err);
    alert('Netzwerkfehler beim Speichern');
    }
};

/*
Das return-Statement gibt das JSX zurück, das das Formular darstellt.
Es enthält ein Eingabefeld für den Kategorienamen und einen Button zum Absenden des Formulars.
Das Formular hat eine Überschrift, die je nach Bearbeitungsmodus entweder "Kategorie bearbeiten" oder "Neue Kategorie hinzufügen"
anzeigt.
Das Eingabefeld ist erforderlich (required), was bedeutet, dass der Benutzer einen Namen eingeben muss,
bevor er das Formular absenden kann.
Weiterhin hat das Eingabefeld eine Mindestlänge von 1 Zeichen und eine maximale Länge von 50 Zeichen.
*/
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