# ShopLite - Mini E-Commerce Catalog

ShopLite is a modern, lightweight e-commerce application built with React, Redux Toolkit, Tailwind CSS, and a mock JSON server backend. It allows users to browse an electronic/home catalog, filter items, manage a shopping cart, securely "checkout", and track their simulated orders.

## Tech Stack
- **Frontend Framework:** React 19 + Vite
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Styling:** Tailwind CSS (v4) & Custom Glassmorphism CSS
- **Routing:** React Router v7
- **Data Fetching:** Axios
- **Backend Simulation:** JSON Server
- **UI Notifications:** React Hot Toast

---

## 🚀 Setup & Execution Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Mock Backend (JSON Server)**
   Open a terminal and run the server to serve `db.json` on port 3000:
   ```bash
   npm run server
   ```

3. **Start the React Application (Vite)**
   Open a second terminal and start the frontend:
   ```bash
   npm run dev
   ```
   *The app will automatically pop up in your browser (usually `http://localhost:5173`).*

4. **Demo Payment + Tracking Flow**
   - Complete checkout with valid demo fields.
   - Payment success redirects automatically to tracking after a short delay.
   - You can cancel an order from the tracking page to demonstrate realistic order lifecycle behavior.

5. **If Payment Fails**
   - Verify JSON Server is running on `http://localhost:3000`.
   - Confirm no other process is already using port `3000`.
   - Retry checkout after server is available.

---

## 👥 Team Workload Distribution (TA2 Defense)

Designed for a 5-person team, the architecture was intentionally divided to highlight different paradigms in modern web development.

### 1. Frontend Architecture & Global State (Student 1)
- **Role:** Setup Redux Toolkit over Context API for scalable global state. Handled routing mapping.
- **Key Contributions:** `store/index.js`, `cartSlice.js`, `productSlice.js`.
- **Defense Focus:** Explain why Redux prevents unnecessary component re-renders compared to Context layout. Discuss how `createAsyncThunk` elegantly separates API calls from UI components.

### 2. API Integration & Backend Services (ADPer)
- **Role:** Designed the `db.json` schema and integrated `json-server` to act as a proper REST API, moving the team away from hardcoded JSON.
- **Key Contributions:** `db.json`, `package.json` server scripts, Axios integration across Redux and Checkout flows.
- **Defense Focus:** Explain RESTful verbs (`GET` for catalogs, `POST` for completing orders) and the asynchronous nature of API fetching.

### 3. Product Catalog & Search Optimization (Ujjwal)
- **Role:** Built the main landing page, responsive grids, and advanced string-matching filters.
- **Key Contributions:** `Home.jsx`, `FilterBar.jsx`, `ProductCard.jsx`, `Navbar.jsx`.
- **Defense Focus:** Explain the `useMemo` React hook used in `Home.jsx` to prevent lag when the user types on the search bar. This optimizes computations.

### 4. Cart Mechanics & State Consumption (Student 4)
- **Role:** Handled mathematical logic for the shopping cart (subtotals, tax, inventory checking).
- **Key Contributions:** `Cart.jsx`, `CartItem.jsx`, and the Redux Cart Selectors (`selectCartTotal`).
- **Defense Focus:** Explain how `useSelector` maps global state directly to the component. Walk through the array modification methods (`filter`, `reduce`) used for cart actions.

### 5. Secure Checkout Flow & Tracking (Student 5)
- **Role:** Handled the complex multistep checkout pipeline, regex form validations, and the order tracking timeline.
- **Key Contributions:** `Checkout.jsx`, `OrderTracking.jsx`, `react-hot-toast` integration.
- **Defense Focus:** Explain regular expressions for email and address validation. Walk through how an order payload is constructed for the `POST` request, and how parameterized routing (`/track/:orderId`) works.
