# 👋 Welcome to ShopLite

Hey there! ShopLite is a lightweight, modern mini e-commerce catalog built to simulate a real-world shopping experience. It's designed with a sleek glassmorphism UI, a fully functional shopping cart, and a checkout flow that actually registers your orders to a local mock database. 

You can browse products, add them to your cart, "buy" them (checkout validations included!), and track your fake orders right after. 

## 🛠️ What's Under the Hood?

- **React 19 & Vite** for a blazing fast frontend.
- **Redux Toolkit** to easily manage our shopping cart state.
- **Tailwind CSS & Custom Glass UI** because things should look pretty.
- **JSON Server** acting as our fake backend to store orders locally (`db.json`).

## 🚀 How to Run It Locally

You'll need two terminals for this to work perfectly (one for the frontend, one for our fake backend).

### 1. Install Everything
First things first, grab the dependencies:
```bash
npm install
```

### 2. Boot Up the Fake Backend
In your first terminal, start the JSON Server. This needs to run on port 3000 so the checkout page can save your orders!
```bash
npm run server
```

### 3. Start the Shop!
In your second terminal, fire up the Vite frontend:
```bash
npm run dev
```
*(It should pop open in your browser at `http://localhost:5173`)*

## 🛒 Trying it out
1. Add a few cool items to your cart.
2. Head over to checkout and fill out the dummy shipping and payment details (it validates things like 16-digit card numbers!).
3. Hit buy! Your order is saved to `db.json`, and you'll be taken to the Order Tracking page to see your timeline.

Happy shopping! 🛍️


