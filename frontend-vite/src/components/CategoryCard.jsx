/*hier werden die CategoryCard Komponenten definiert,
die die Kategorie "Kategorien" darstellt und Optionen zum Bearbeiten und Löschen bietet.*/
import '../styles/components/CategoryCard.css';

export default function CategoryCard({ category, onDelete, onEdit }) {
    return (
        <div className="category-card">
        <h2>{category.name}</h2>

        <div className="card-actions">
            {typeof onEdit === 'function' && (
            <button /* hier wird die Editierfunktion definiert, die aufgerufen wird, wenn der Bearbeiten-Button geklickt wird
                     die Funktion onEdit wird mit der Kategorie als Argument aufgerufen */
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