/*
Hier testen wir die ProductForm-Komponente, die ein Formular zum Erstellen oder Bearbeiten von Produkten darstellt.
*/
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductForm from '../ProductForm';

beforeEach(() => {
    /* 
    Mock für fetch, damit keine echten Netzwerk-Requests gemacht werden. Das bedeutet, dass wir die API nicht wirklich ansprechen,
    sondern nur simulieren, wie die API antworten würde.
    */
    global.fetch = vi.fn((url) => {
        // Kategorien-Request
        if (url.includes('/api/categories')) {
            return Promise.resolve({
                ok: true,
                json: async () => [
                    { id: 1, name: 'Boxhandschuh Venum' },
                    { id: 2, name: 'Boxhandschuhe' }
                ]
            });
        }
        /*
        Produkt-POST-Request
        */
        return Promise.resolve({
            ok: true,
            json: async () => ({
                id: 42,
                name: 'NeuesProdukt',
                description: 'Beschreibung',
                price: 19.95,
                rating: 4.6,
                category: { id: 2 }
            })
        });
    });
});

afterEach(() => {
    vi.resetAllMocks();
});

test('ProductForm: Felder ausfüllen und absenden ruft onSubmit mit korrektem Payload auf', async () => {
    // Wir erstellen eine Mock-Funktion, um zu prüfen, ob onSubmit aufgerufen wird
    const onSubmit = vi.fn();

    // Das Formular wird im Create-Modus gerendert
    render(<ProductForm initialProduct={null} onSubmit={onSubmit} />);

    // Warte, bis die Kategorien geladen sind
    await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Boxhandschuhe' })).toBeInTheDocument();
    });

    // Kategorie auswählen
const categorySelect = screen.getByRole('combobox');
await userEvent.selectOptions(categorySelect, '2');


    // Name eingeben
    await userEvent.type(screen.getByPlaceholderText('Name'), 'NeuesProdukt');

    // Beschreibung eingeben
    await userEvent.type(screen.getByPlaceholderText('Beschreibung'), 'Beschreibung');

    // Preis eingeben
    const priceInput = screen.getByPlaceholderText('Preis');
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '19.95');

    // Rating eingeben
    const ratingInput = screen.getByPlaceholderText('Bewertung (0-5)');
    await userEvent.clear(ratingInput);
    await userEvent.type(ratingInput, '4.6');

    // Formular absenden
    await userEvent.click(screen.getByRole('button', { name: /Hinzufügen/i }));

    // Prüfen, ob onSubmit mit dem richtigen Wert aufgerufen wurde
    await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 42,
                name: 'NeuesProdukt',
                description: 'Beschreibung',
                price: 19.95,
                rating: 4.6,
                category: { id: 2 }
            })
        );
    });
});