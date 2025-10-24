// File: client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import broomIco from "../assets/broomICO.svg"
import dustpanIco from "../assets/dustpanICO.svg"
import mopIco from "../assets/mopICO.svg"
const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Cleaning Solutions</h1>
          <p>Professional-grade products for sparkling results</p>
          <Link to="/catalog" className="btn hero-btn">Shop Now</Link>
        </div>
      </section>

      <section className="featured-categories">
        <h2>Our Product Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img className="category-icon" src={dustpanIco} />
            <h3>Brushes</h3>
            <p>Specialized brushes for every surface</p>
            <Link to="/catalog?category=brushes">View Products</Link>
          </div>
          <div className="category-card">
            <img type="icon" className="category-icon" src={broomIco} />
            <h3>Brooms</h3>
            <p>Moder brooming materials</p>
            <Link to="/catalog?category=brooms">View Products</Link>
          </div>
          <div className="category-card">
            <img type="icon" className="category-icon"  src={mopIco} />
            <h3>Mops</h3>
            <p>Advanced mopping systems</p>
            <Link to="/catalog?category=mops">View Products</Link>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Why Choose Us</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <div className="benefit-icon">🚀</div>
            <h3>Professional Quality</h3>
            <p>Industrial-grade products for superior results</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">🌿</div>
            <h3>Eco-Friendly</h3>
            <p>Environmentally conscious formulations</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">💯</div>
            <h3>Satisfaction Guaranteed</h3>
            <p>30-day money-back promise</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;