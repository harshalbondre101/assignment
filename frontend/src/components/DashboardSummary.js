import React from 'react';

function statCard(title, value, desc) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
}

export default function DashboardSummary({ products = [], cart = { items: [], total: 0 } }) {
  const totalProducts = products.length;
  const cartItems = cart.items.reduce((s, it) => s + it.qty, 0);
  const cartTotal = cart.total ?? 0;

  // Mock recent orders (not persisted — display from cart for demo)
  const recentOrders = cart.items.slice(0, 3).map(it => ({
    id: `ORD-${1000 + it.productId}`,
    name: it.name,
    amount: it.lineTotal
  }));

  return (
    <div className="summary">
      <h3 className="summary-title">Dashboard</h3>

      <div className="stats">
        {statCard('Products', totalProducts, 'Active catalog')}
        {statCard('Items in cart', cartItems, 'Pending checkout')}
        {statCard('Cart total', `₹${Number(cartTotal).toFixed(2)}`, 'Server-calculated')}
      </div>

      <div className="panel">
        <div className="panel-title">Recent (demo)</div>
        {recentOrders.length === 0 ? <div className="muted">No recent orders</div> : (
          <ul className="recent-list">
            {recentOrders.map(o => (
              <li key={o.id}>
                <div className="ord-left">
                  <div className="ord-id">{o.id}</div>
                  <div className="ord-name">{o.name}</div>
                </div>
                <div className="ord-right">₹{Number(o.amount).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="panel small">
        <div className="panel-title">Quick actions</div>
        <button className="btn full">View products</button>
        <button className="btn full outline">Clear cart (demo)</button>
      </div>
    </div>
  );
}
