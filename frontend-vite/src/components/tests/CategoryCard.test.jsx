import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryCard from '../CategoryCard';

test('zeigt den Kategorienamen an und reagiert auf Bearbeiten/Löschen', async () => {
    const category = { id: 1, name: 'Helme' };
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<CategoryCard category={category} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText('Helme')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Bearbeiten/i }));
    expect(onEdit).toHaveBeenCalledWith(category);

    await userEvent.click(screen.getByRole('button', { name: /Löschen/i }));
    expect(onDelete).toHaveBeenCalledWith(1);
});




test('zeigt Buttons nur, wenn die Props gesetzt sind', () => {
    const category = { id: 2, name: 'Bekleidung' };

    const { rerender } = render(<CategoryCard category={category} onDelete={() => {}} />);
    expect(screen.queryByRole('button', { name: /Bearbeiten/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Löschen/i })).toBeInTheDocument();

    rerender(<CategoryCard category={category} onEdit={() => {}} />);
    expect(screen.getByRole('button', { name: /Bearbeiten/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Löschen/i })).not.toBeInTheDocument();
});