/* 
Hier testen wir die ProductCard-Komponente, die ein Produkt anzeigt und es ermöglicht, es zu bearbeiten oder zu löschen.
*/
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

/* * @jest-environment jsdom
 * Diese Datei testet die ProductCard-Komponente.
 * Sie prüft, ob Name, Beschreibung und Preis korrekt angezeigt werden
 * und ob die onDelete- und onEdit-Callbacks aufgerufen werden.
 */

/*hier wird beschrieben, wie die ProductCard aussehen soll:*/
describe('ProductCard', () => {
    const product = {
    id: 1,
    name: 'Testhandschuhe',
    description: 'Eine kurze Beschreibung',
    price: 95.85,
    rating: 5,
    category: { id: 1, name: 'Boxhandschuhe' }
    };

    /*
    1) Testet, ob die Komponente Name, Beschreibung und Preis anzeigt
    2) Testet, ob der Löschen-Button funktioniert und onDelete aufgerufen wird
    3) Testet, ob der Bearbeiten-Button funktioniert und onEdit aufgerufen wird
     */
    test('zeigt Name, Beschreibung und Preis an und ruft onDelete/onEdit auf', () => {
    const onDelete = vi.fn();
    const onEdit   = vi.fn();

/* hier wird die Komponente gerendert und die Callbacks übergeben, das heisst, dass die Komponente
die Callbacks aufrufen kann, wenn der Benutzer auf die Buttons klickt.*/
    render(
<ProductCard
        product={product}
        onDelete={onDelete}
        onEdit={onEdit}
    />
    );

/* hier wird geprüft, ob die Komponente die richtigen Daten anzeigt.*/
    expect(screen.getByText('Boxhandschuhe')).toBeInTheDocument();
    expect(screen.getByText('Testhandschuhe')).toBeInTheDocument();
    expect(screen.getByText('Eine kurze Beschreibung')).toBeInTheDocument();
    expect(screen.getByText('CHF 95.85')).toBeInTheDocument();

/* hier wird geprüft, ob die Bewertung korrekt angezeigt wird.*/
    fireEvent.click(screen.getByText('Löschen'));
    expect(onDelete).toHaveBeenCalledWith(1);

/* hier wird geprüft, ob der Bearbeiten-Button funktioniert und onEdit aufgerufen wird.
fireEvent simuliert einen Klick auf den Bearbeiten-Button.*/
    fireEvent.click(screen.getByText('Bearbeiten'));
    expect(onEdit).toHaveBeenCalledWith(product);
    });
});