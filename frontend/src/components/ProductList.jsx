import ProductCard from './ProductCard';
export default function ProductList({ products, onDelete }) {
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
        />
      ))}
    </div>
  );
}