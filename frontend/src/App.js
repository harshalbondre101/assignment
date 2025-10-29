import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart, deleteCartItem, checkout } from './api';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import DashboardSummary from './components/DashboardSummary';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [ps, c] = await Promise.all([fetchProducts(), fetchCart()]);
      setProducts(ps || []);
      setCart(c || { items: [], total: 0 });
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(productId) {
    try {
      await addToCart(productId, 1);
      const c = await fetchCart();
      setCart(c);
      setCartOpen(true);
    } catch (e) {
      console.error(e);
      setError('Could not add to cart');
    }
  }

  async function handleRemove(cartId) {
    try {
      await deleteCartItem(cartId);
      const c = await fetchCart();
      setCart(c);
    } catch (e) {
      console.error(e);
      setError('Could not remove item');
    }
  }

  // update qty by removing row and re-adding desired qty (keeps backend intact)
  async function handleUpdateQty(item, newQty) {
    try {
      await deleteCartItem(item.cartId);
      if (newQty > 0) {
        await addToCart(item.productId, newQty);
      }
      const c = await fetchCart();
      setCart(c);
    } catch (e) {
      console.error(e);
      setError('Could not update quantity');
    }
  }

  async function handleCheckout(customer) {
    try {
      const payload = {
        cartItems: cart.items.map(i => ({ productId: i.productId, qty: i.qty })),
        name: customer.name,
        email: customer.email
      };
      const res = await checkout(payload);
      if (res && res.receipt) {
        setReceipt(res.receipt);
        setCheckoutOpen(false);
        setCartOpen(false);
        // refresh cart (backend may clear cart)
        const c = await fetchCart();
        setCart(c);
      } else {
        setError('Checkout failed');
      }
    } catch (e) {
      console.error(e);
      setError(e.message || 'Checkout error');
    }
  }

  return (
    <div className="dashboard-app">
      <Navbar onOpenCart={() => setCartOpen(true)} cartCount={cart.items.length} />
      <div className="dashboard-container">
        <aside className="left-rail">
          <DashboardSummary products={products} cart={cart} />
        </aside>

        <main className="main-area">
          <div className="main-header">
            <h2 className="page-title">Shop — Featured</h2>
            <p className="lead">Curated picks and vibe essentials — add to cart and checkout (mock).</p>
          </div>

          {loading ? (
            <div className="loading-state">Loading products…</div>
          ) : (
            <ProductGrid products={products} onAdd={handleAdd} />
          )}
        </main>
      </div>

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
        onCheckout={() => { setCheckoutOpen(true); }}
      />

      <CheckoutModal
        open={checkoutOpen || Boolean(receipt)}
        receipt={receipt}
        onClose={() => { setReceipt(null); setCheckoutOpen(false); }}
        onSubmit={handleCheckout}
      />

      {error && (
        <div className="toast" onClick={() => setError(null)}>
          {error}
        </div>
      )}

      <footer className="app-footer">
        <div>© {new Date().getFullYear()} Vibe Commerce — Demo dashboard</div>
      </footer>
    </div>
  );
}
