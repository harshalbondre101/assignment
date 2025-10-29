# 💲 Vibe Commerce — Mock E-Commerce Cart App

A **full-stack shopping cart application** built as a technical screening project for **Vibe Commerce**.  
It demonstrates **end-to-end integration** between a React frontend and a Node + Express + SQLite backend, handling products, cart management, and a mock checkout process.

---

## 🚀 Features

### 🖥️ Frontend (React)
- Responsive product grid with **Add to Cart** buttons  
- **Cart view** showing items, quantity, price, and total  
- Ability to **update quantity** or **remove** items  
- **Checkout form** with name and email inputs  
- Displays a **mock receipt modal** after checkout  
- Smooth UI animations and minimal, real-world e-commerce styling  

### ⚙️ Backend (Node + Express + SQLite)
- REST API for products, cart, and checkout  
- Server-side cart total calculation  
- SQLite persistence layer (no external DB required)  
- Clean error handling and modular structure  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React 19 (Create React App) |
| Backend | Node.js + Express 4 |
| Database | SQLite (via `sqlite3`) |
| Testing | Jest + Supertest |
| Styling | CSS / Tailwind (optional) |

---

## 🗂️ Project Structure

```
vibe-commerce/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── tests/
│   │   └── api.test.js
│   ├── package.json
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductList.jsx
    │   │   ├── Cart.jsx
    │   │   └── CheckoutModal.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.js
    │   └── ...
    ├── package.json
    └── ...
```

---

## ⚙️ Backend Setup

### 1️⃣ Navigate and install
```bash
cd backend
npm install
```

### 2️⃣ Start server
```bash
npm run dev
```
or  
```bash
node server.js
```

Server will start at 🔗 **http://localhost:4000**

### 3️⃣ Test APIs
| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/products` | GET | List all products |
| `/api/cart` | GET | Retrieve cart items + total |
| `/api/cart` | POST | Add product `{ productId, qty }` |
| `/api/cart/:id` | DELETE | Remove cart item |
| `/api/checkout` | POST | Mock checkout `{ cartItems, name, email }` |

✅ Example:
```bash
curl http://localhost:4000/api/products
```

---

## 💻 Frontend Setup

### 1️⃣ Navigate and install
```bash
cd frontend
npm install
```

### 2️⃣ Start React app
```bash
npm start
```
Frontend will run at 🔗 **http://localhost:3000**

### 3️⃣ Connect backend
The app automatically connects to the backend running on `http://localhost:4000`.

---

## 🥪 Testing

### Run backend tests
```bash
cd backend
npm test
```

---

## 🎨 UI Highlights

- Clean, card-based product layout  
- Floating cart panel with real-time total  
- Checkout popup with order summary  
- Adaptive mobile and tablet layouts  

---

## 📦 Deployment Guide

### Build frontend for production
```bash
cd frontend
npm run build
```
This creates an optimized `build/` folder.

You can then:
1. Serve the build with any static host (Vercel, Netlify), or  
2. Copy `frontend/build` into `backend/public` and serve via Express.

---

## 💡 Future Improvements

- Integrate Fake Store API for dynamic products  
- Add user authentication (mock user login)  
- Connect to MongoDB Atlas  
- Improve accessibility (ARIA labels)  
- Add Redux or Context API for global state  

---

## 👨‍💻 Author

**Harshal Bondre**  
Project built for **Vibe Commerce Full-Stack Screening**.  
Feel free to fork, explore, and extend!

