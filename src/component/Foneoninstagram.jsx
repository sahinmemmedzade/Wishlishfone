import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCart.css';
import './fone.css'
import { FaArrowLeft, FaArrowRight, FaInstagram } from "react-icons/fa";
import './Hotdeal.css';

const Foneinstagram = () => {
  const [products, setProducts] = useState([]);
  
  const [sliderIndex, setSliderIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:4041/foneinstagram')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600 && window.innerWidth>=50) {
        setVisibleItems(2);
      }
       else if (window.innerWidth <= 1024 && window.innerWidth>=600) {
        setVisibleItems(3);
      } else if(window.innerWidth>=1024) {
        setVisibleItems(5);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const goNext = () => {
    setSliderIndex((currentIndex) => currentIndex === products.length - visibleItems ? 0 : currentIndex + 1);
  };

  const goBack = () => {
    setSliderIndex((currentIndex) => currentIndex === 0 ? products.length - visibleItems : currentIndex - 1);
  };

  return (
    <section>
      <div className='navigation'>
        <h3>FONE ON INSTAGRAM</h3>
        <span></span>
        <p className='fone'> #fone</p>
      </div>
      <div className="shopping-cartfone">
        <div className='containercartfone'>
          <button className="prev-buttonfone" onClick={goBack}>
            <FaArrowLeft />
          </button>
          <div className="slidercartfone">
            {products.slice(sliderIndex, sliderIndex + visibleItems).map(product => (
              <div key={product._id} className="product-card product-fone" >
                {product.issale && <div className="sale-tag sale-tag-fone">-7%</div>}
                <div className="image-containerfone">
                  <img className="image1fone" src={product.image} alt={product.name} />
                  <div className="overlayfone">
                    <div className="overlay-contentfone">
                        <FaInstagram className='instagram' />

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="next-buttonfone" onClick={goNext}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Foneinstagram;
