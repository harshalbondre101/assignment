const express = require('express');
const router = express.Router();
const db = require('../db');

// Get cart with product details and total
router.get('/', (req, res) => {
  const sql = `
    SELECT c.id as cartId, p.id as productId, p.name, p.price, c.qty,
           (p.price * c.qty) as lineTotal
    FROM cart c
    JOIN products p ON p.id = c.productId
  `;
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = rows.reduce((s, r) => s + (r.lineTotal || 0), 0);
    res.json({ items: rows, total: +total.toFixed(2) });
  });
});

// Add or update item
router.post('/', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !Number.isInteger(qty) || qty < 1) {
    return res.status(400).json({ error: 'Invalid productId or qty' });
  }

  // If product already in cart, update qty
  db.get('SELECT id, qty FROM cart WHERE productId = ?', [productId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      const newQty = row.qty + qty;
      db.run('UPDATE cart SET qty = ? WHERE id = ?', [newQty, row.id], function (e) {
        if (e) return res.status(500).json({ error: e.message });
        return res.json({ message: 'updated', id: row.id, qty: newQty });
      });
    } else {
      db.run('INSERT INTO cart (productId, qty) VALUES (?, ?)', [productId, qty], function (e) {
        if (e) return res.status(500).json({ error: e.message });
        return res.json({ message: 'added', id: this.lastID });
      });
    }
  });
});

// Remove item by cart id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM cart WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'deleted' });
  });
});

// Checkout
router.post('/checkout', (req, res) => {
  const { cartItems, name, email } = req.body || {};
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const ids = cartItems.map(i => i.productId);
  const placeholders = ids.map(() => '?').join(',');
  db.all(`SELECT id, name, price FROM products WHERE id IN (${placeholders})`, ids, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const map = new Map(rows.map(r => [r.id, r]));
    let total = 0;
    const items = cartItems.map(ci => {
      const p = map.get(ci.productId);
      const line = {
        productId: ci.productId,
        name: p ? p.name : 'Unknown',
        price: p ? p.price : 0,
        qty: ci.qty
      };
      line.lineTotal = +(line.price * line.qty).toFixed(2);
      total += line.lineTotal;
      return line;
    });

    const receipt = {
      total: +total.toFixed(2),
      timestamp: new Date().toISOString(),
      items,
      name: name || null,
      email: email || null
    };

    // Optionally clear cart after checkout; comment out to keep persistence
    db.run('DELETE FROM cart', [], function (e) { /* ignore errors */ });

    res.json({ receipt });
  });
});

module.exports = router;
