import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], onAdd }) {
  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={() => onAdd(p.id)} />
      ))}
    </div>
  );
}
