import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiXSquare } from "react-icons/fi";
import { addBasket, changeCount, removeBasket } from '../Slice/BasketSlice';
import './Checkout.css';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const Checkout = () => {
    const basket = useSelector(state => state.basket.items);
    const dispatch = useDispatch();
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    const decrease = (item) => {
        dispatch(changeCount(item));
    };

    const remove = (id) => {
        dispatch(removeBasket(id));
    };

    const increase = (item) => {
        dispatch(addBasket(item));
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        basket.forEach((item) => {
            totalPrice += item.price * item.count;
        });
        return totalPrice;
    };

    

    return (
        <div className='containtable'>
            <table className='table'>
                <thead></thead>
                <tbody>
                    {basket && basket.map((item) => (
                        <tr key={item.id}>
                            <td className='td'><img src={item.image1} alt="" className='item-images' /></td>
                            <td className='tdname'>{item.name}</td>
                            <td className='tdprice'>{item.price}</td>
                            <td>
                                <FaMinus onClick={() => decrease(item)} />
                                <div className='itemcount'>{item.count}</div>
                                <FaPlus onClick={() => increase(item)} />
                            </td>
                            <td>{item.price * item.count}</td>
                            <td><MdDeleteForever onClick={() => remove(item.id)} className='delete' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='total'>Total Price: {discountApplied ? discountedPrice : calculateTotalPrice()}</div>
         
        </div>
    );
};

export default Checkout;
