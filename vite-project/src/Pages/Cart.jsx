import { useCartStore } from "../Store/usecartstore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-green-400 mb-4">Your cart is empty 🛒</h2>
        <button
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-105"
          onClick={() => navigate("/DashBoard/spare-parts")}
        >
          Go to Medical Store
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-white/5 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-green-400 mb-8 text-center tracking-wide">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#E1E9C9] bg-opacity-15 backdrop-blur p-4 rounded-xl shadow-lg w-full"
          >
            {/* Left: Image & Product Info */}
            <div className="flex items-center gap-4 w-1/3">
              <img
                src={`http://localhost:3000${item.image}`}
                alt={item.name}
                className="h-20 w-20 object-contain rounded-lg"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-500">{item.name}</h2>
              </div>
            </div>

            {/* Middle: Quantity Controls */}
            <div className="flex items-center gap-3 w-1/3 justify-center">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                −
              </button>
              <span className="text-white">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                +
              </button>
            </div>

            {/* Right: Price and Remove */}
            <div className="flex items-center justify-end w-1/3 gap-6">
              <span className="text-gray-500 font-semibold text-lg">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Actions */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl text-gray-600 font-semibold">
          Total: <span className="text-green-400">Rs. {totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => clearCart()}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/DashBoard/orderplacement")}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition-all"
          >
            Proceed to Billing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
