import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
    const product = {
    id: 1,
    name: 'Testhandschuhe',
    description: 'Eine kurze Beschreibung',
    price: 95.85,
    rating: 5,
    category: { id: 1, name: 'Boxhandschuhe' }
    };

    test('zeigt Name, Beschreibung und Preis an und ruft onDelete/onEdit auf', () => {
    const onDelete = vi.fn();
    const onEdit   = vi.fn();

    render(
<ProductCard
        product={product}
        onDelete={onDelete}
        onEdit={onEdit}
    />
    );

    expect(screen.getByText('Boxhandschuhe')).toBeInTheDocument();
    expect(screen.getByText('Testhandschuhe')).toBeInTheDocument();
    expect(screen.getByText('Eine kurze Beschreibung')).toBeInTheDocument();
    expect(screen.getByText('CHF 95.85')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Löschen'));
    expect(onDelete).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Bearbeiten'));
    expect(onEdit).toHaveBeenCalledWith(product);
    });
});