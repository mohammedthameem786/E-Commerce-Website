import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: number;
  brand: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  address: OrderAddress;
  totals: { subtotal: number; discount: number; delivery: number; gst: number; total: number };
  paymentMethod: string;
  deliveryType: string;
  status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  createdAt: string;
  deliveryDate: string;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: number[];
  currentPage: string;
  selectedProduct: Product | null;
  categoryFilter: string;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  toggleWishlist: (id: number) => void;
  showPage: (page: string) => void;
  showProductDetail: (product: Product) => void;
  setCategoryFilter: (cat: string) => void;
  cartTotal: () => { subtotal: number; discount: number; delivery: number; gst: number; total: number };
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  promoApplied: boolean;
  applyPromo: (code: string) => boolean;
  orderHistory: Order[];
  addOrderToHistory: (order: Order) => void;
  searchOrders: (query: string) => Order[];
  clearCart: () => void;
  getLastAddress: () => OrderAddress | null;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be within StoreProvider');
  return ctx;
};

let toastId = 0;

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  // Load order history from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      try {
        setOrderHistory(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to load order history:', e);
      }
    }
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, brand: product.brand, name: product.name, emoji: product.img, price: product.price, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = i.qty + delta;
      return newQty <= 0 ? null! : { ...i, qty: newQty };
    }).filter(Boolean));
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const showPage = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showProductDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cartTotal = useCallback(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    const discount = promoApplied ? Math.round(subtotal * 0.1) : (totalItems > 2 ? Math.round(subtotal * 0.1) : 0);
    const delivery = subtotal > 999 ? 0 : 99;
    const gst = Math.round((subtotal - discount + delivery) * 0.18);
    const total = subtotal - discount + delivery + gst;
    return { subtotal, discount, delivery, gst, total };
  }, [cart, promoApplied]);

  const applyPromo = useCallback((code: string) => {
    if (code.toUpperCase() === 'TECHHUB10') {
      setPromoApplied(true);
      showToast('10% discount applied!', 'success');
      return true;
    }
    showToast('Invalid promo code', 'error');
    return false;
  }, [showToast]);

  const addOrderToHistory = useCallback((order: Order) => {
    setOrderHistory(prev => {
      const updated = [order, ...prev];
      localStorage.setItem('orderHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const searchOrders = useCallback((query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return orderHistory;
    
    return orderHistory.filter(order => 
      order.items.some(item => 
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q)
      )
    );
  }, [orderHistory]);

  const clearCart = useCallback(() => {
    setCart([]);
    setPromoApplied(false);
  }, []);

  const getLastAddress = useCallback(() => {
    if (orderHistory.length === 0) return null;
    return orderHistory[0].address;
  }, [orderHistory]);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, currentPage, selectedProduct, categoryFilter,
      addToCart, removeFromCart, updateQty, toggleWishlist,
      showPage, showProductDetail, setCategoryFilter,
      cartTotal, toasts, showToast, promoApplied, applyPromo,
      orderHistory, addOrderToHistory, searchOrders, clearCart, getLastAddress,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
