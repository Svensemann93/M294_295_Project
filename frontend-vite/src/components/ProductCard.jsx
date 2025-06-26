import '../styles/components/ProductCard.css';
export default function ProductCard({ product, onDelete }) {
return (
    <div className="product-card">
    <h2 className="product-title">{product.name}</h2>
    <p>{product.description}</p>
    <p className="product-price">{product.price.toFixed(2)} CHF</p>
    <p className="product-rating">Rating: {product.rating}</p>
    <button
        className="delete-button"
        onClick={() => onDelete(product.id)}
    >
        Löschen
    </button>
    </div>
);
}
