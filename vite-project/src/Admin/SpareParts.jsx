import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCartPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../Store/usecartstore';

const MedicalStore = () => {
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({ name: '', stock: '', description: '', image: null });
  const [role, setRole] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  const navigate = useNavigate();
  const { addToCart, cartItems } = useCartStore();

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
    formData.append('description', newPart.description); // Include description
    if (newPart.image) formData.append('image', newPart.image);

    try {
      await axios.post('http://localhost:3000/api/parts', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Item added successfully');
      setNewPart({ name: '', stock: '', description: '', image: null }); // Reset all fields
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
      price: part.price || 100,
    });
    toast.success(`${part.name} added to cart`);

    setShowPopup(true);

    if (redirectTimeout) clearTimeout(redirectTimeout);

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

  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-green-400 mb-8 text-center tracking-wider">
        Nirog Plus Medical Store
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-5 py-3 w-full max-w-lg rounded-full border border-green-400/70 bg-gray-900/30 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
        />
      </div>

      {/* Admin Add Medicine Form */}
      {role === 'admin' && (
        <form
          onSubmit={handleAddPart}
          className="mb-12 flex flex-wrap items-center gap-4 bg-gray-900/40 p-6 rounded-2xl shadow-xl backdrop-blur-md border border-green-400/40"
        >
          <input
            type="text"
            placeholder="Medicine Name"
            value={newPart.name}
            onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
            required
            className="px-4 py-3 rounded-lg border border-green-400/50 bg-gray-800/30 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner w-full sm:w-auto flex-1 transition-all"
          />
          <input
            type="text"
            placeholder="Medicine Description"
            value={newPart.description}
            onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
            required
            className="px-4 py-3 rounded-lg border border-green-400/50 bg-gray-800/30 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner w-full transition-all"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newPart.stock}
            onChange={(e) => setNewPart({ ...newPart, stock: e.target.value })}
            required
            className="px-4 py-3 rounded-lg border border-green-400/50 bg-gray-800/30 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner w-full sm:w-32 transition-all"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewPart({ ...newPart, image: e.target.files[0] })}
            className="px-4 py-2 rounded-lg border border-green-400/50 bg-gray-800/30 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:scale-105 transition-transform"
          >
            Add Medicine
          </button>
        </form>
      )}

      {/* Products Grid */}
      {filteredParts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="border border-green-400/30 rounded-2xl p-5 bg-gray-900/40 backdrop-blur-md shadow-xl flex flex-col items-center hover:scale-105 transition-transform"
            >
              {part.image && (
                <img
                  src={`http://localhost:3000${part.image}`}
                  alt={part.name}
                  className="h-40 w-full object-contain mb-4 rounded-xl shadow-md"
                />
              )}
              <h3 className="text-xl font-bold text-green-400 mb-2 text-center">
                {part.name}
              </h3>

              {/* ✅ Description visible for all users */}
              {part.description && (
                <p className="text-sm text-gray-300 mb-3 text-center">
                  {part.description}
                </p>
              )}

              {/* Stock only for admin */}
              {role === 'admin' && (
                <p className="text-gray-300 mb-4 text-center">
                  Stock:{' '}
                  <input
                    type="number"
                    defaultValue={part.stock}
                    onBlur={(e) => updateStock(part.id, e.target.value)}
                    className="ml-2 w-20 border px-2 py-1 rounded text-gray-800"
                  />
                </p>
              )}

              <button
                onClick={() => addItemToCart(part)}
                className="mt-auto flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg font-semibold transition-all hover:scale-105"
              >
                <BsCartPlus className="text-lg" />
                <span>Add to Cart</span>
              </button>
              {role === 'admin' && (
                <p className="text-xs text-gray-400 mt-2">Blur input to update stock</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-12">
          No products found for "{searchTerm}"
        </p>
      )}

      {/* Cart Popup */}
      {showPopup && role !== 'admin' && (
        <div className="fixed bottom-6 right-6 bg-gray-900/90 p-5 rounded-2xl shadow-2xl backdrop-blur-md w-80 animate-bounce">
          <h2 className="text-green-400 font-bold mb-3 text-lg">Cart ({cartItems.length})</h2>
          <ul className="text-white text-sm max-h-48 overflow-y-auto mb-3">
            {cartItems.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item.name} - Qty: {item.quantity}
              </li>
            ))}
          </ul>
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold shadow-lg transition-all hover:scale-105"
            onClick={() => {
              if (redirectTimeout) clearTimeout(redirectTimeout);
              setShowPopup(false);
              navigate('/DashBoard/billing');
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
