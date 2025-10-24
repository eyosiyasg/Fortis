// File: client/src/components/ProductCard.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import BigOlympic from '../assets/Big Olympic.jpg'
import SmallOlympic from '../assets/Small Olympic.jpg'
import BigT from '../assets/Big T.jpg'
import brush from '../assets/brush.jpg'

// import image from {product.image}

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
    setQuantity(1);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {/*<img src={product.image} alt={product.name} />*/}
        <img src= {product.image} alt={product.name} />

        <div className="product-badge">{product.category}</div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="price">${product.price.toFixed(2)}</div>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          <button 
            className={`add-to-cart ${isAnimating ? 'animate' : ''}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;