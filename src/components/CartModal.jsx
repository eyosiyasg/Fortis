// File: client/src/components/CartModal.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrderSuccess = () => {
    setOrderSuccess(true);
    clearCart();
    setTimeout(() => {
      setShowCheckout(false);
      setOrderSuccess(false);
      onClose();
    }, 10000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        {orderSuccess ? (
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Our admin will contact you shortly.</p>
            <p>If the admin didn't contact you in one hour dial +251942066365</p>
          </div>
        ) : showCheckout ? (
          <CheckoutForm 
            cart={cart} 
            total={getTotalPrice()} 
            onSuccess={handleOrderSuccess} 
            onCancel={() => setShowCheckout(false)}
          />
        ) : (
          <>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button className="btn" onClick={onClose}>Continue Shopping</button>
              </div>
            ) : (
              <div className="cart-content">
                <ul className="cart-items">
                  {cart.map(item => (
                    <li key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </li>
                  ))}
                </ul>
                <div className="cart-summary">
                  <div className="total">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button className="btn checkout-btn" onClick={() => setShowCheckout(true)}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;