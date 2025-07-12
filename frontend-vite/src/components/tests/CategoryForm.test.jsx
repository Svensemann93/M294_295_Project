/*
Hier testen wir die CategoryForm-Komponente, die ein Formular zum Erstellen oder Bearbeiten von Kategorien darstellt.
*/
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryForm from '../CategoryForm';

beforeEach(() => {
    // Mock für fetch, damit kein echter Netzwerk-Request gemacht wird
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ name: 'Neue Kategorie' }),
    });
    // Mock für window.alert, damit wir prüfen können, ob die Alert-Nachricht angezeigt wird
    vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
    // Mocks zurücksetzen
    vi.resetAllMocks();
});

test('Kategorie-Formular: Name eingeben und absenden ruft onSubmit und alert mit Wert auf', async () => {
    // Wir erstellen eine Mock-Funktion, um zu prüfen, ob onSubmit aufgerufen wird
    const onSubmit = vi.fn();

    // Das Formular wird ohne Startwerte gerendert (Create-Modus)
    render(<CategoryForm initialCategory={null} onSubmit={onSubmit} />);

    // Wir suchen das Eingabefeld für den Namen (Placeholder ist "Kategoriename")
    const nameInput = screen.getByPlaceholderText('Kategoriename');

    // Wir geben einen Namen ein
    await userEvent.type(nameInput, 'Neue Kategorie');

    // Wir klicken auf den Button zum Absenden (Button-Text ist "Hinzufügen")
    await userEvent.click(screen.getByRole('button', { name: /Hinzufügen/i }));

    // Wir prüfen, ob alert mit dem richtigen Text aufgerufen wurde
    expect(window.alert).toHaveBeenCalledWith('Kategorie "Neue Kategorie" erfolgreich angelegt.');


    // Wir prüfen, ob onSubmit mit dem richtigen Wert aufgerufen wurde
    expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
            name: 'Neue Kategorie'
        })
    );
});