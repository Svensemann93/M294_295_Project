import '../styles/components/ProductCard.css';

export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="product-card">
      {/* Body spannt sich auf die volle Resthoehe */}
      <div className="product-card__body">
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

      {/* Actions werden mit margin-top: auto ans Kartenende geschoben */}
      <div className="product-card__actions">
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
            Löschen
          </button>
        )}
      </div>
    </div>
  );
}
