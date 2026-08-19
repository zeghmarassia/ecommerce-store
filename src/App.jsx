import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, Search, X, Plus, Minus, Trash2, CheckCircle, Eye } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next";

// --- MOCK DATA (Algerian Handmade Products) ---
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Kabyle Silver Jewelry (Taqfayt)',
    category: 'Jewelry',
    price: 85,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional Algerian Berber silver enamel bracelet handcrafted in the Kabylie region.'
  },
  {
    id: 2,
    name: 'Handcrafted Berber Rug',
    category: 'Home Decor',
    price: 240,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
    description: 'Authentic 100% natural wool woven rug made by local female artisans.'
  },
  {
    id: 3,
    name: 'Traditional Pottery Tea Set',
    category: 'Pottery',
    price: 45,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    description: 'Clay tea set hand-painted with authentic Amazigh geometric symbols.'
  },
  {
    id: 4,
    name: 'Embroidered Karakou Vest',
    category: 'Clothing',
    price: 180,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional velvet vest detailed with gold thread embroidery (Majboud).'
  },
  {
    id: 5,
    name: 'Handmade Leather Pouf',
    category: 'Home Decor',
    price: 65,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    description: 'Genuine leather ottoman pouch dyed naturally and stitched by hand.'
  }
];

// --- CART CONTEXT ---
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <CartProvider>
      <StoreFrontend />
    </CartProvider>
  );
}

function StoreFrontend() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Simulated API Fetch (Swap this block when connecting to real backend API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulating API latency
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(INITIAL_PRODUCTS);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-800 font-sans">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-amber-900">El Craftsman</h1>
            <p className="text-xs text-amber-700">Authentic Algerian Handmade Goods</p>
          </div>
          <HeaderCartButton onClick={() => setIsCartOpen(true)} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading authentic products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals & Slide-overs */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function HeaderCartButton({ onClick }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-amber-50 text-amber-900 rounded-lg hover:bg-amber-100 transition-colors"
    >
      <ShoppingCart size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </button>
  );
}

function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={onViewDetails}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-amber-800 hover:bg-white"
        >
          <Eye size={18} />
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-semibold text-lg text-gray-900 mt-1">{product.name}</h3>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-amber-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-900 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/80 p-1 rounded-full hover:bg-white z-10"
        >
          <X size={20} />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <div className="p-6">
          <span className="text-xs text-amber-700 font-semibold uppercase">{product.category}</span>
          <h2 className="text-2xl font-bold mt-1 text-gray-900">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">{product.description}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="bg-amber-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-amber-900 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                  <p className="text-amber-800 font-bold text-sm">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutModal({ onClose }) {
  const { cart, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900">Order Confirmed!</h3>
            <p className="text-sm text-gray-600 mt-2">
              Thank you for supporting Algerian artisans, {formData.name}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-amber-800 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Shipping Address</label>
              <textarea
                required
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-800 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-900 transition-colors"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}