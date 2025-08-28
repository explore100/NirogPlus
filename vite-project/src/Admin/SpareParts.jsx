import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCartPlus } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ useNavigate instead of NavLink
import { useCartStore } from '../Store/usecartstore';

const MedicalStore = () => {
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({ name: '', stock: '', image: null });
  const [role, setRole] = useState('');
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // ✅ state for popup
  const navigate = useNavigate();
  const [redirectTimeout, setRedirectTimeout] = useState(null);
  const { addToCart, cartItems} = useCartStore();

  const fetchParts = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setRole(user.role);

      const endpoint =
        user.role === 'admin'
          ? 'http://localhost:3000/api/parts'
          : 'http://localhost:3000/api/customer/parts';

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParts(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch medical items');
    }
  };

  const updateStock = async (id, stock) => {
    if (role !== 'admin') return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/parts/${id}`,
        { stock: parseInt(stock) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Stock updated successfully');
      fetchParts();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update stock');
    }
  };

  const handleAddPart = async (e) => {
    e.preventDefault();
    if (role !== 'admin') return;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', newPart.name);
    formData.append('stock', newPart.stock);
    if (newPart.image) formData.append('image', newPart.image);

    try {
      await axios.post('http://localhost:3000/api/parts', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Item added successfully');
      setNewPart({ name: '', stock: '', image: null });
      fetchParts();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add item');
    }
  };

  const addItemToCart = (part) => {
    if (part.stock <= 0) {
      toast.error('Out of stock!');
      return;
    }
   addToCart({
    id: part.id,
    name: part.name,
    stock: part.stock,
    image: part.image,
    price: part.price || 100, // default if price not set
  });
    toast.success(`${part.name} added to cart`);

    // ✅ show popup
    setShowPopup(true);

    // ✅ clear any old timeout
    if (redirectTimeout) clearTimeout(redirectTimeout);

    // ✅ auto navigate after 5s (only for user side)
    if (role !== 'admin') {
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
        navigate('/DashBoard/cart');
      }, 5000);
      setRedirectTimeout(timeoutId);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
        Nirog Plus Medical Store
      </h1>

      {role === 'admin' && (
        <form
          onSubmit={handleAddPart}
          className="mb-8 flex flex-wrap items-center gap-4 bg-gray-800/20 p-6 rounded-xl shadow-lg backdrop-blur-md"
        >
          {/* Admin form fields */}
          <input
            type="text"
            placeholder="Medicine Name"
            value={newPart.name}
            onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
            required
            className="px-4 py-2 rounded-lg border border-green-400/50 bg-gray-900/20 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newPart.stock}
            onChange={(e) => setNewPart({ ...newPart, stock: e.target.value })}
            required
            className="px-4 py-2 rounded-lg border border-green-400/50 bg-gray-900/20 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewPart({ ...newPart, image: e.target.files[0] })}
            className="px-4 py-2 rounded-lg border border-green-400/50 bg-gray-900/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg transition-all"
          >
            Add Medicine
          </button>
        </form>
      )}

      {/* Store items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div
            key={part.id}
            className="border border-green-400/30 rounded-xl p-4 bg-white/10 backdrop-blur-md shadow-lg flex flex-col items-center transition-transform hover:scale-105"
          >
            {part.image && (
              <img
                src={`http://localhost:3000${part.image}`}
                alt={part.name}
                className="h-36 w-full object-contain mb-4 rounded-lg"
              />
            )}
            <h3 className="text-xl font-semibold text-green-400 mb-2">{part.name}</h3>
            <p className="text-gray-300 mb-2">
              Stock:{' '}
              {role === 'admin' ? (
                <input
                  type="number"
                  defaultValue={part.stock}
                  onBlur={(e) => updateStock(part.id, e.target.value)}
                  className="ml-2 w-20 border px-2 py-1 rounded text-gray-800"
                />
              ) : (
                <span className="font-medium">{part.stock}</span>
              )}
            </p>
            <button
  onClick={() => addItemToCart(part)} // ✅ use correct function
  className="mt-auto flex items-center justify-center gap-2 w-[200px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
>
  <BsCartPlus className="text-lg" />
  <span>Add to Cart</span>
</button>

            {role === 'admin' && (
              <p className="text-xs text-gray-400 mt-1">Blur input to update stock</p>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Popup for cart preview */}
      {showPopup && role !== 'admin' && (
        <div className="fixed bottom-4 right-4 bg-gray-900/90 p-4 rounded-xl shadow-lg backdrop-blur-md max-w-xs animate-bounce">
          <h2 className="text-green-400 font-bold mb-2">Cart ({cartItems.length})</h2>
<ul className="text-white text-sm max-h-40 overflow-y-auto">
  {cartItems.map((item, idx) => (
    <li key={idx}>{item.name} - Qty: {item.quantity}</li>
  ))}
</ul>

          <button
            className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
            onClick={() => {
              if (redirectTimeout) clearTimeout(redirectTimeout);
              setShowPopup(false);
              navigate('/DashBoard/billing'); // ✅ direct checkout
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicalStore;
