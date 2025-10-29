import React, { useEffect, useState } from 'react';

export default function CheckoutModal({ open, onClose, onSubmit, receipt }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!open) {
      setName(''); setEmail('');
    }
  }, [open]);

  if (!open) return null;

  // receipt view
  if (receipt) {
    return (
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-card">
          <h3>Order receipt</h3>
          <div className="muted">Placed: {new Date(receipt.timestamp).toLocaleString()}</div>
          <div className="receipt-total">Total: ₹{Number(receipt.total).toFixed(2)}</div>
          <ul className="receipt-list">
            {receipt.items.map((it, idx) => (
              <li key={idx}>{it.name} × {it.qty} — ₹{Number(it.lineTotal).toFixed(2)}</li>
            ))}
          </ul>
          <div className="modal-actions">
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  // checkout form
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>Checkout (mock)</h3>

        <label className="field">
          <div className="label">Full name</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
        </label>

        <label className="field">
          <div className="label">Email</div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>

        <div className="muted small">We will generate a mock receipt — no real payment is taken.</div>

        <div className="modal-actions">
          <button className="btn outline" onClick={onClose}>Cancel</button>
          <button
            className="btn primary"
            onClick={() => onSubmit({ name: name.trim(), email: email.trim() })}
            disabled={!name.trim() || !email.includes('@')}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}
