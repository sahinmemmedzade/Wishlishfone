import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegHeart, FaShoppingBag } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import CustomModal from './Basicmodal';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4041/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const fetchModalProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4041/modalproducts/${productId}`);
      setModalProduct(response.data);
      setIsModalOpen(true); // Modal açık
    } catch (error) {
      console.error('Error fetching modal product:', error);
    }
  };

  const handleCardClick = (productId) => {
    setSelectedProductId(productId);
    fetchModalProduct(productId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleHeartIconClick = () => {
    console.log('hello');
  };

  const handleShopIconClick = () => {
    console.log('helloshop');
  };


  const dispatch=useDispatch()

  return (
    <section>
      <div className='navigation'>
        <h3>Best seller</h3>
        <span></span>
        <p>Best Seller Product This Week!</p>
      </div>
      <div className="shopping-cart">
        {products.length > 0 && products.map(product => (
          <div key={product.id} className="product-card" onClick={() => handleCardClick(product.id)}>
            {product.issale && <div className="sale-tag">-7%</div>}
            {product.is10 && <div className='sale-10tag'>-10%</div>}
            <div className="image-container">
              <img className="image1" src={product.image1} alt={product.name} />
              <img className="image2" src={product.image2} alt={product.name} />
            </div>
            <div className="product-info">
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
            <div className="cart-icons">
              <FaShoppingBag onClick={handleShopIconClick} />
              <IoSearch />
              <FaRegHeart onClick={handleHeartIconClick} />
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <CustomModal isOpen={isModalOpen} onClose={handleModalClose} productId={selectedProductId} modalProduct={modalProduct} />}
    </section>
  );
}

export default ShoppingCart;
