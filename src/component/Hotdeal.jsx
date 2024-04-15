import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCart.css';
import { FaRegHeart, FaShoppingBag } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import CustomModal from './Basicmodal';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './Hotdeal.css';

const Hotdeal = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProducts, setModalProducts] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    axios.get('http://localhost:4041/hotdeal')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 999 && window.innerWidth>=750) {
        setVisibleItems(3);
      } else if (window.innerWidth <= 750 && window.innerWidth>=50) {
        setVisibleItems(2);
      } else if(window.innerWidth>=999) {
        setVisibleItems(4);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchModalProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4041/modalproducts');
      setModalProducts(response.data);
    } catch (error) {
      console.error('Error fetching modal products:', error);
    }
  };

  const handleModalOpen = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
    fetchModalProducts();
    setIsModalOpen(true);
    fetchModalProducts();
  };

  const handleModalClose = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

 

  const handleHeartIconClick = () => {
    console.log('hello');
  };

  const handleShopIconClick = () => {
    console.log('helloshop');
  };

  const goNext = () => {
    setSliderIndex((currentIndex) => currentIndex === products.length - visibleItems ? 0 : currentIndex + 1);
  };

  const goBack = () => {
    setSliderIndex((currentIndex) => currentIndex === 0 ? products.length - visibleItems : currentIndex - 1);
  };

  return (
    <section>
      <div className='navigation'>
        <h3>HOT DEAL</h3>
        <span></span>
        <p>Don't Miss Today's Featured Deals</p>
      </div>
      <div className="shopping-carthotdeal">
        <div className='containercart'>
          <button className="prev-buttons" onClick={goBack}>
            <FaArrowLeft />
          </button>
          <div className="slidercart">
            {products.slice(sliderIndex, sliderIndex + visibleItems).map(product => (
              <div key={product._id} className="product-card product-hotdeal" >
                {product.issale && <div className="sale-tag sale-tag-hotdeal">-7%</div>}
                <div className="image-container">
                  <img className="image1" src={product.image1} alt={product.name} />
                  <img className="image2" src={product.image2} alt={product.name} />
                </div>
                <div className="product-info product-cart">
                  <h3>{product.name}</h3>
                  {product.price1 ? (
                    <p>
                      <del className='del'> <span className="original-price" >{product.price1}$</span></del>
                      <span className="discounted-price">{product.price}$</span>
                    </p>
                  ) : (
                    <p>{product.price} USD</p>
                  )}
                </div>
                <div className="cart-icons cart-icons-hotdeal">
                  <FaShoppingBag onClick={handleShopIconClick} />
                  <IoSearch onClick={() => handleModalOpen(product.id)} /> 
                  <FaRegHeart onClick={handleHeartIconClick} />
                </div>
              </div>
            ))}
          </div>
          <button className="next-buttons" onClick={goNext}>
            <FaArrowRight />
          </button>
        </div>
      </div>
      {isModalOpen && <CustomModal isOpen={isModalOpen} onClose={handleModalClose} productId={selectedProductId} modalProducts={modalProducts} />}
    </section>
  );
};

export default Hotdeal;
