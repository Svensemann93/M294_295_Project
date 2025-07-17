import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryForm from '../CategoryForm';

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ name: 'Neue Kategorie' }),
    });
    vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
    vi.resetAllMocks();
});

test('Kategorie-Formular: Name eingeben und absenden ruft onSubmit und alert mit Wert auf', async () => {
    const onSubmit = vi.fn();

    render(<CategoryForm initialCategory={null} onSubmit={onSubmit} />);

    const nameInput = screen.getByPlaceholderText('Kategoriename');

    await userEvent.type(nameInput, 'Neue Kategorie');

    await userEvent.click(screen.getByRole('button', { name: /Hinzufügen/i }));

    expect(window.alert).toHaveBeenCalledWith('Kategorie "Neue Kategorie" erfolgreich angelegt.');

    expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
            name: 'Neue Kategorie'
        })
    );
});