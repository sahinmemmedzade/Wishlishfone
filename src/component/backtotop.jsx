import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './backtotop.css';

const Backtotop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
      left: 0 
    });
  };

  const handleScroll = () => {
    if (window.pageYOffset > 150) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='containbacktotop' style={{ display: isVisible ? 'block' : 'none' }}>
      <div className='backtotop' onClick={scrollToTop}>
        <FaArrowUp />
        <div className='growLight'></div> {/* Added div for grow light effect */}
      </div>
    </div>
  );
};

export default Backtotop;
