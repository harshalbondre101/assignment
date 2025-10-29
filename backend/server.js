const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const fs = require('fs');
const path = require('path');

// Seed products if seed.sql exists
const seedPath = path.join(__dirname, 'seed.sql');
if (fs.existsSync(seedPath)) {
  const seedSql = fs.readFileSync(seedPath).toString();
  db.serialize(() => {
    db.exec(seedSql, (err) => {
      if (err) console.log('Seed error', err.message);
    });
  });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/checkout', require('./routes/checkout'));


const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`Vibe backend running on http://localhost:${PORT}`));

module.exports = app; // exported for tests
