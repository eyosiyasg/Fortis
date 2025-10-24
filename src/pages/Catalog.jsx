// File: client/src/pages/Catalog.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchParams} from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import products from '../data/products';
// import './Catalog.css';

const Catalog = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    
    if (category) {
      setActiveCategory(category);
      setFilteredProducts(
        category === 'all' ? products : products.filter(p => p.category === category)
      );
    } else {
      setActiveCategory('all');
      setFilteredProducts(products);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId) =>{
    setActiveCategory(categoryId)
    if(categoryId ==- 'all'){
      setSearchParams({})
    } else{
      setSearchParams({category: categoryId})
    }
  }
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'brushes', name: 'Brushes' },
    { id: 'brooms', name: 'Brooms' },
    { id: 'mops', name: 'Mops' }
  ];

  return (
    <div className="catalog">
      <div className="catalog-header">
        <h1>Product Catalog</h1>
        <p>Explore our premium cleaning solutions</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} image={product.image} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found in this category</p>
          <button 
            className="btn"
            onClick={() => setActiveCategory('all')}
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;