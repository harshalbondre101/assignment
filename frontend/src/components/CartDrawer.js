import React from 'react';

function QtyControl({ value, onChange }) {
  return (
    <div className="qty-inline">
      <button onClick={() => onChange(Math.max(0, value - 1))}>−</button>
      <input value={value} onChange={e => {
        const v = parseInt(e.target.value || '0', 10);
        if (!Number.isNaN(v)) onChange(v);
      }} />
      <button onClick={() => onChange(value + 1)}>＋</button>
    </div>
  );
}

export default function CartDrawer({ open, cart = { items: [], total: 0 }, onClose, onRemove, onUpdateQty, onCheckout }) {
  return (
    <>
      <div className={`drawer ${open ? 'open' : ''}`} role="dialog" aria-hidden={!open}>
        <div className="drawer-header">
          <h3>Shopping Cart</h3>
          <button className="close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {cart.items.length === 0 ? (
            <div className="empty">Your cart is empty</div>
          ) : (
            <ul className="cart-items">
              {cart.items.map(item => (
                <li key={item.cartId} className="cart-item">
                  <div className="ci-left">
                    <div className="ci-title">{item.name}</div>
                    <div className="ci-sub">Unit ₹{Number(item.price).toFixed(2)}</div>
                  </div>

                  <div className="ci-right">
                    <QtyControl value={item.qty} onChange={(v) => onUpdateQty(item, v)} />
                    <div className="ci-line">₹{Number(item.lineTotal).toFixed(2)}</div>
                    <button className="link remove" onClick={() => onRemove(item.cartId)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="drawer-footer">
          <div className="drawer-total">
            <div>Total</div>
            <div className="total-value">₹{Number(cart.total).toFixed(2)}</div>
          </div>

          <div className="drawer-actions">
            <button className="btn outline" onClick={onClose}>Continue shopping</button>
            <button className="btn primary" disabled={cart.items.length === 0} onClick={() => { onCheckout(); }}>Checkout</button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className={`drawer-backdrop ${open ? 'visible' : ''}`} onClick={onClose} />
    </>
  );
}
