import ProductCard from './ProductCard';
import '../styles/components/ProductList.css';

export default function ProductList({ products, onDelete, onEdit }) {
  if (!products.length) {
    return <p className="no-products">Keine Produkte gefunden.</p>;
  }
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}