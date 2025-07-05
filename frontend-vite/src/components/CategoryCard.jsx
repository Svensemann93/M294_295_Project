import '../styles/components/CategoryCard.css';

export default function CategoryCard({ category, onDelete, onEdit }) {
    return (
        <div className="category-card">
        <h2>{category.name}</h2>

        <div className="card-actions">
            {typeof onEdit === 'function' && (
            <button
                className="edit-button"
                onClick={() => onEdit(category)}
            >
                Bearbeiten
            </button>
            )}
            {typeof onDelete === 'function' && (
            <button
                className="delete-button"
                onClick={() => onDelete(category.id)}
            >
                Löschen
            </button>
            )}
        </div>
        </div>
    );
    }