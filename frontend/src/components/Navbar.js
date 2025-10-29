import React from 'react';

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  return (
    <header className="nav">
      <div className="nav-left">
        <div className="brand">
          <div className="logo">V</div>
          <div>
            <div className="brand-title">Vibe Commerce</div>
            <div className="brand-sub">Mock dashboard</div>
          </div>
        </div>
      </div>

      <div className="nav-center">
        <input className="search" placeholder="Search products, e.g. headphones" />
      </div>

      <div className="nav-right">
        <button className="icon-btn" title="Notifications">🔔</button>
        <button className="cart-btn" onClick={onOpenCart} title="Open cart">
          🛒 <span className="cart-badge">{cartCount}</span>
        </button>
        <div className="user">
          <div className="avatar">HB</div>
          <div className="user-name">Harshal</div>
        </div>
      </div>
    </header>
  );
}
