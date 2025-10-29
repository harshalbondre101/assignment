import React from 'react';

function ratingStars(score = 4.5) {
  const n = Math.round(score);
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

export default function ProductCard({ product, onAdd }) {
  const price = Number(product.price).toFixed(2);
  const tags = ['popular', 'tech', 'vibe'];

  return (
    <div className="card">
      <div className="card-media">
        <div className="img-placeholder">🎧</div>
        <div className="badge">New</div>
      </div>

      <div className="card-body">
        <h4 className="card-title">{product.name}</h4>
        <div className="card-sub">Minimalist • {tags.join(' • ')}</div>

        <div className="card-meta">
          <div className="price">₹{price}</div>
          <div className="rating" title="Rating">{ratingStars(4)}</div>
        </div>

        <div className="card-actions">
          <button className="btn" onClick={onAdd}>Add to cart</button>
          <button className="btn outline">Details</button>
        </div>
      </div>
    </div>
  );
}
