/*
Hier testen wir die CategoryCard-Komponente, die eine Kategorie anzeigt
und es ermöglicht, sie zu bearbeiten oder zu löschen.
*/
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryCard from '../CategoryCard';

test('zeigt den Kategorienamen an und reagiert auf Bearbeiten/Löschen', async () => {
    // Wir erstellen Beispiel-Daten und Mock-Funktionen für die Aktionen
    const category = { id: 1, name: 'Helme' };
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    // Wir rendern die Komponente mit allen Props
    render(<CategoryCard category={category} onEdit={onEdit} onDelete={onDelete} />);

    // Wir prüfen, ob der Kategoriename angezeigt wird
    expect(screen.getByText('Helme')).toBeInTheDocument();

    // Wir klicken auf den Bearbeiten-Button und prüfen, ob onEdit mit dem richtigen Objekt aufgerufen wird
    await userEvent.click(screen.getByRole('button', { name: /Bearbeiten/i }));
    expect(onEdit).toHaveBeenCalledWith(category);

    // Wir klicken auf den Löschen-Button und prüfen, ob onDelete mit der richtigen ID aufgerufen wird
    await userEvent.click(screen.getByRole('button', { name: /Löschen/i }));
    expect(onDelete).toHaveBeenCalledWith(1);
});





/*
Optional: Test für die Anzeige der Buttons basierend auf den Props. Wir testen, ob die Buttons nur angezeigt werden,
wenn die entsprechende Methode (onEdit oder onDelete) übergeben wurde.
*/
test('zeigt Buttons nur, wenn die Props gesetzt sind', () => {
    const category = { id: 2, name: 'Bekleidung' };

    // Nur mit onDelete
    const { rerender } = render(<CategoryCard category={category} onDelete={() => {}} />);
    expect(screen.queryByRole('button', { name: /Bearbeiten/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Löschen/i })).toBeInTheDocument();

    // Nur mit onEdit
    rerender(<CategoryCard category={category} onEdit={() => {}} />);
    expect(screen.getByRole('button', { name: /Bearbeiten/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Löschen/i })).not.toBeInTheDocument();
});