/*
In dieser Datei wird die Komponente ProductCard definiert, die ein Produkt anzeigt.
Sie zeigt den Namen, die Beschreibung, den Preis und die Bewertung des Produkts an.
Außerdem gibt es zwei Schaltflächen zum Bearbeiten und Löschen des Produkts.
Die Schaltflächen werden nur angezeigt, wenn die entsprechenden Funktionen onEdit und onDelete übergeben werden.
*/
import '../styles/components/ProductCard.css';

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="product-card">
      <div className="product-card_body">
        <p className="category-name">{product.category.name}</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="product-price">
          CHF {product.price.toFixed(2)}
        </p>
        <p className="product-rating">
          Bewertung: {product.rating} Stärnä
        </p>
      </div>

      {/* Die Schaltflächen zum Bearbeiten und Löschen des Produkts */}
      <div className="product-card_actions">
        {typeof onEdit === 'function' && (
          <button
            className="edit-button"
            onClick={() => onEdit(product)}
          >
            Bearbeiten
          </button>
        )}
        {typeof onDelete === 'function' && (
          <button
            className="delete-button"
            onClick={() => onDelete(product.id)}
          >
            Löschen
          </button>
        )}
      </div>
    </div>
  );
}
