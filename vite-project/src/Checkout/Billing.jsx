import React, { useState } from "react";
import { useCartStore } from "../Store/usecartstore";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  // Place order handler
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert(`✅ Order placed successfully using ${paymentMethod === 'creditCard' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}!`);
    clearCart();
    navigate("/DashBoard/spare-parts"); // ✅ Redirect to medical store
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-blue-700">Your cart is empty 🛒</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={() => navigate("/DashBoard/spare-parts")} // ✅ Fixed route
        >
          Go to Medical Store
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Billing & Checkout</h1>

      <div className="bg-white/10 p-6 rounded-lg shadow-md space-y-6">
        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-600 pb-2"
          >
            <div>
              <h2 className="text-lg font-semibold text-green-400">{item.name}</h2>
              <p className="text-gray-600">{item.quantity} × Rs. {item.price}</p>
            </div>
            <span className="font-semibold text-gray-500">
              Rs. {item.quantity * item.price}
            </span>
          </div>
        ))}

        {/* Totals */}
        <div className="pt-4 space-y-2 text-right text-gray-600">
          <p>
            Subtotal: <span className="font-semibold">Rs. {subtotal.toFixed(2)}</span>
          </p>
          <p>
            Tax (5%): <span className="font-semibold">Rs. {tax.toFixed(2)}</span>
          </p>
          <p className="text-xl font-bold text-green-400">
            Total: Rs. {total.toFixed(2)}
          </p>
        </div>

        {/* Payment Method */}
        <div className="pt-4 border-t border-gray-600">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Payment Method</h2>
          <form>
            <label className="flex items-center mb-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={() => setPaymentMethod("creditCard")}
                className="mr-3 bg-blue-500"
              />
              <span className="text-gray-600 font-semibold">Credit Card</span>
            </label>

            <label className="flex items-center mb-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                className="mr-3 bg-blue-500 "
              />
              <span className="text-gray-600 font-semibold">PayPal</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mr-3 bg-blue-500"
              />
              <span className="text-gray-600 font-semibold">Cash on Delivery</span>
            </label>
          </form>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Billing;
