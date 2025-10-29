// checkout.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/checkout
router.post('/', (req, res) => {
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

    // Clear cart after checkout (optional)
    db.run('DELETE FROM cart', [], function (e) { /* ignore */ });

    res.json({ receipt });
  });
});

module.exports = router;
