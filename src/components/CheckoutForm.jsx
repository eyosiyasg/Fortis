import React, { useState } from 'react';


const CheckoutForm = ({ cart, total, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    message: '',
    city: '',
    village: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }
    
      if (!formData.city.trim()) {
      setError('city is required');
      return;
    }

      if (!formData.village.trim()) {
      setError('village is required');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const order = {
        ...formData,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total
      };
      
      // Send order to backend https://fortis-gdst.onrender.com
      const response = await fetch('https://fortis-gdst.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }
      
      setSuccessId(result.orderId);
      onSuccess();
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      {error && <div className="error-message">{error}</div>}
      
      {successId ? (
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h3>Order Placed Successfully!</h3>
          <p>Order ID: {successId}</p>
          <p>Our admin will contact you shortly.</p>
          <button className="btn" onClick={onCancel}>
            Continue Shopping
          </button>
        </div>
      ) : (
      // // ሙሉ ስም 
// ስልክ ቁጥር
// ከተማ 
// ስፍር
// መልዕክት
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name (ሙሉ ስም) </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number (ስልክ ቁጥር)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g., +1234567890"
            />
          </div>
          
            <div className="form-group">
            <label htmlFor="city">city(ከተማ)</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

            <div className="form-group">
            <label htmlFor="village">village (ሰፍር) </label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (መልዕክት) </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              placeholder="Any special requests or instructions"
            />
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="total">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn cancel-btn"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Back to Cart
            </button>
            <button 
              type="submit" 
              className="btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;