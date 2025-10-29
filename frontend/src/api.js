const API_BASE = process.env.REACT_APP_API || 'http://localhost:4000/api';

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : await res.text().catch(() => null);
  if (!res.ok) {
    const message = body?.error || body || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return body;
}

export async function fetchProducts() {
  return request('/products');
}

export async function fetchCart() {
  return request('/cart');
}

export async function addToCart(productId, qty = 1) {
  return request('/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  });
}

export async function deleteCartItem(cartId) {
  return request(`/cart/${cartId}`, { method: 'DELETE' });
}

/**
 * Checkout helper: try /checkout first, else fallback to /cart/checkout
 * payload: { cartItems: [{productId,qty}], name, email }
 */
export async function checkout(payload) {
  try {
    return await request('/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    if (err.status === 404) {
      return request('/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    throw err;
  }
}
