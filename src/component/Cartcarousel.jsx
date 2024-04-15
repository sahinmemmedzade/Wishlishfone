import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './cartcarousel.css';

const sliderImages = [
  'https://fone-store-demo.myshopify.com/cdn/shop/files/ba3.png?v=1660639419',
  'https://fone-store-demo.myshopify.com/cdn/shop/files/ba2.png?v=1660639531',
  'https://fone-store-demo.myshopify.com/cdn/shop/files/ba4.png?v=1660639490',
  'https://fone-store-demo.myshopify.com/cdn/shop/files/ba1.png?v=1660639419',
];

const itemsData = [
  { name: "Ham Sandwitch", description: "It is a long established fact that a reader" },
  { name: "Hamburger Veggie", description: "It is a long established fact that a reader" },
  { name: " Sushi Sashimi", description: "It is a long established fact that a reader" },
  { name: "Pepperoni Pizza", description: "It is a long established fact that a reader" },
];

const Cartcarousel = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setVisibleItems(1);
      }
      else if(window.innerWidth <= 1200){
        setVisibleItems(2);

      }
       else {
        setVisibleItems(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = () => {
    setSliderIndex((currentIndex) => currentIndex === sliderImages.length - visibleItems ? 0 : currentIndex + 1)
  }

  const goBack = () => {
    setSliderIndex((currentIndex) => currentIndex === 0 ? sliderImages.length - visibleItems : currentIndex - 1)
  }

  return (
    <section className='slider-section'>
      <div className='navigation'>
        <h3>VISIT OUR STORE</h3>
          <span></span>
        
      </div>
      <div className='container'>
        <div className='lefticon' onClick={goBack}>
          <FaArrowLeft />
        </div>
        <div className="slider">
          {Array.from({ length: visibleItems }).map((_, index) => (
            <div key={index} className="cart">
              <img src={sliderImages[sliderIndex + index]} alt={`Item ${sliderIndex + index}`} />
              <div className="description">
                <h2>{itemsData[sliderIndex + index].name}</h2>
                <p>{itemsData[sliderIndex + index].description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='righticon' onClick={goNext}>
          <FaArrowRight />
        </div>
      </div>
    </section>
  );
};

export default Cartcarousel;
