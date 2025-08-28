import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      const exists = state.cartItems.find((i) => i.id === item.id);
      if (exists) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1, price: item.price || 100 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== id),
    })),

  updateQuantity: (id, delta) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
