import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductForm from '../ProductForm';

beforeEach(() => {

    global.fetch = vi.fn((url) => {
        if (url.includes('/api/categories')) {
            return Promise.resolve({
                ok: true,
                json: async () => [
                    { id: 1, name: 'Boxhandschuh Venum' },
                    { id: 2, name: 'Boxhandschuhe' }
                ]
            });
        }

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
    const onSubmit = vi.fn();

    render(<ProductForm initialProduct={null} onSubmit={onSubmit} />);

    await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Boxhandschuhe' })).toBeInTheDocument();
    });

const categorySelect = screen.getByRole('combobox');
await userEvent.selectOptions(categorySelect, '2');

    await userEvent.type(screen.getByPlaceholderText('Name'), 'NeuesProdukt');

    await userEvent.type(screen.getByPlaceholderText('Beschreibung'), 'Beschreibung');

    const priceInput = screen.getByPlaceholderText('Preis');
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '19.95');

    const ratingInput = screen.getByPlaceholderText('Bewertung (0-5)');
    await userEvent.clear(ratingInput);
    await userEvent.type(ratingInput, '4.6');

    await userEvent.click(screen.getByRole('button', { name: /Hinzufügen/i }));

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