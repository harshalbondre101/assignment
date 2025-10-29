import React from 'react';

function QtyControl({ value, onChange }) {
  const dec = () => onChange(Math.max(0, value - 1));
  const inc = () => onChange(value + 1);
  return (
    <div className="qty-control">
      <button onClick={dec} aria-label="Decrease">−</button>
      <input value={value} onChange={e => {
        const v = parseInt(e.target.value || '0', 10);
        if (!Number.isNaN(v)) onChange(v);
      }} />
      <button onClick={inc} aria-label="Increase">＋</button>
    </div>
  );
}

export default function CartView({ cart = { items: [], total: 0 }, onRemove, onUpdateQty, onOpenCheckout }) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <div className="empty">No items yet</div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items.map(item => (
              <li key={item.cartId} className="cart-row">
                <div className="cart-left">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-price">₹{Number(item.lineTotal).toFixed(2)}</div>
                </div>

                <div className="cart-right">
                  <QtyControl value={item.qty} onChange={(newQty) => onUpdateQty(item, newQty)} />
                  <button className="link remove" onClick={() => onRemove(item.cartId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="total">Total: <strong>₹{Number(cart.total).toFixed(2)}</strong></div>
            <button className="btn primary" onClick={onOpenCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
