const request = require('supertest');
const app = require('../server');

describe('API smoke', () => {
  it('GET /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('cart flow', async () => {
    // add product 1
    let r = await request(app).post('/api/cart').send({ productId: 1, qty: 2 });
    expect(r.status).toBe(200);

    let cart = await request(app).get('/api/cart');
    expect(cart.status).toBe(200);
    expect(cart.body.items.length).toBeGreaterThan(0);

    // checkout
    const payload = { cartItems: cart.body.items.map(i => ({ productId: i.productId, qty: i.qty })), name: 'Test', email: 't@e.com' };
    const co = await request(app).post('/api/cart/checkout').send(payload);
    expect(co.status).toBe(200);
    expect(co.body.receipt).toBeDefined();
    expect(typeof co.body.receipt.total).toBe('number');
  });
});
