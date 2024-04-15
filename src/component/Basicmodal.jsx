import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Assuming you imported the icons correctly
import './Modal.css'; // Assuming you have a CSS file for your modal styles
import { useDispatch } from 'react-redux';
import { addBasket } from '../Slice/BasketSlice';

const CustomModal = ({ isOpen, onClose, productId }) => {
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4041/modalproducts/${productId}`);
        setModalProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen && productId) {
      fetchData();
    }
  }, [isOpen, productId]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };



  const dispatch=useDispatch()

  const [newproduct,setNewproduct]=useState({
    id:null,
    name:"",
    price:null,
    count:null,
    image:""
  })
  const addedProducts=(product)=>{
   dispatch(addBasket(product))
  }

 
  if (!isOpen || !modalProduct) {
    return null;
  }
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-content">
          {/* Close icon */}
          <span className="close-icons" onClick={onClose}>×</span>
          <div className='imageanddescription'>
            <div className='image'>
              {/* Display main image */}
              <img src={modalProduct[`image${selectedImageIndex + 1}`]} className='mainimage' alt="Main" />

              {/* Display thumbnails of other images */}
              <div className="img-showcase">
                {[1, 2, 3].map((index) => (
                  <img
                    key={index}
                    src={modalProduct[`image${index}`]}
                    alt={`Thumbnail ${index}`}
                    className={`img-item ${selectedImageIndex === index - 1 ? 'active' : ''}`}
                    onClick={() => handleImageClick(index - 1)}
                  />
                ))}
              </div>
            </div>
            {/* Product details */}
            <div className="product-details">
              <h2>{modalProduct.name}</h2>
              <p>${modalProduct.price}</p>
              <hr />
              <p>{modalProduct.description}</p>
              <div className="quantity-control">
                <div className="quantity-display">
                  <div className='quantity'>{quantity}</div>
                  <div className="quantity-buttons">
                    <button className="quantity-button" onClick={incrementQuantity}><FaPlus /></button>
                    <button className="quantity-button" onClick={decrementQuantity}><FaMinus /></button>
                  </div>
                </div>
              </div>
              <button className="add-to-cart" onClick={()=>addedProducts(modalProduct)}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
