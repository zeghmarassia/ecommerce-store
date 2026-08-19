# 🏺 Algerian Handmade Products - E-Commerce Store

An elegant, modern, responsive E-commerce web application built with **React** to showcase and sell authentic Algerian artisanal and handmade products (such as Kabyle silver jewelry, handwoven Berber rugs, pottery, and embroidered garments).

Designed as a clean, performant front-end prototype featuring simulated API state management, rich filtering, shopping cart functionality, dynamic detail modals, and a complete checkout workflow.

---

## 🌟 Key Features

* **📦 Product Catalog & Listings**: Displays handmade items complete with visual cards, ratings, category tags, descriptions, and pricing.
* **🏷️ Category Filtering**: Filter products dynamically across various categories (e.g., *Jewelry*, *Home Decor*, *Pottery*, *Clothing*).
* **🔍 Live Search**: Instant search filtering by product titles.
* **🔎 Product Details Modal**: High-res product view with detailed descriptions and direct add-to-cart actions.
* **🛒 Interactive Shopping Cart**:
  * Slide-over cart drawer UI.
  * **Quantity Management**: Real-time quantity increment/decrement and item removal.
  * Live total calculation and item count badge on header.
* **💳 Checkout UI Flow**: Interactive order confirmation modal with form validation and success state.
* **📱 Fully Responsive**: Tailored layout for mobile, tablet, and desktop views.
* **🔌 Simulated API / State Setup**: Built using React's `Context API` and `useEffect` mock fetch loops, designed for seamless integration with real RESTful or GraphQL backends.

---

## 🛠️ Tech Stack & Concepts Covered

- **React.js** (Functional Components, Custom Hooks, `useState`, `useEffect`)
- **React Context API** (Global state management for cart items & actions)
- **Lucide React** (Modern, lightweight icons)
- **CSS / Styling**: Standard CSS / Tailwind CSS options included
- **JavaScript (ES6+)**: Array methods (`filter`, `reduce`, `map`), Async state simulation

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have Node.js installed on your computer:
- [Node.js](https://nodejs.org/) (version 16.x or higher recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/algerian-handmade-store.git
   cd algerian-handmade-store
   ```

2. **Install dependencies**
   ```bash
   npm install lucide-react
   ```
   *(If you are using Tailwind CSS, ensure your Tailwind configuration is setup or CDN link is present in `public/index.html`)*.

3. **Start the development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

---

## 📂 Project Structure

```text
src/
 ├── components/       # Reusable components (ProductCard, CartDrawer, etc.)
 ├── context/          # CartContext provider and custom hook
 ├── data/             # Mock JSON product dataset
 ├── App.jsx           # Main layout & route component
 └── index.css         # Global styles
```

---

## 🔌 Connecting to a Real API

Currently, product data is fetched from local mock JSON in `App.jsx`:

```javascript
useEffect(() => {
  const fetchProducts = async () => {
    // Replace this mock fetch with your real API endpoint:
    // const res = await fetch('https://api.yourdomain.com/products');
    // const data = await res.json();
    setProducts(INITIAL_PRODUCTS);
  };
  fetchProducts();
}, []);
```

Simply replace `INITIAL_PRODUCTS` with your backend endpoint URL (e.g., Express.js, Django, Node.js, or Firebase).

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
