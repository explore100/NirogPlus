import { useCartStore } from "../Store/usecartstore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty 🛒</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={() => navigate("/DashBoard/medical-store")}
        >
          Go to Medical Store
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white/10 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={`http://localhost:3000${item.image}`}
                  alt={item.name}
                  className="h-20 w-20 object-contain rounded-lg"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold text-green-400">{item.name}</h2>
                <p className="text-gray-300">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg"
              >
                -
              </button>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/DashBoard/billing")}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md"
      >
        Proceed to Billing
      </button>
    </div>
  );
};

export default Cart;
