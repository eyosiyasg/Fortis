// File: client/src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import logo from '../assets/logo.jpg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/catalog', label: 'Catalog' },
    { path: '/about', label: 'About' }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            {/*<span className="logo-icon">🧹</span>*/}
            <img src= {logo} className="logo-icon" /> 
          </Link>
          
          <div className="desktop-menu">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="nav-actions">
            <button className="cart-btn" onClick={toggleCart}>
              🛒 <span className="cart-count">{getTotalItems()}</span>
            </button>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      
      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Navbar;