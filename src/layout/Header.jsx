import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdShoppingBag, MdClose, MdDelete } from "react-icons/md";
import { IoIosClose, IoMenu } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import './header.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  const removeItemFromCart = (productId) => {
    let updatedCart = basket.filter(product=>product.Id!==productId)
    localStorage.setItem('basket', JSON.stringify(updatedCart));
    updatedCart=[]
};
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMenuSidebar = () => {
    setMenuSidebarOpen(!menuSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const closeMenuSidebar = () => {
    setMenuSidebarOpen(false);
  };

  const basket=useSelector(state=>state.basket.items)

  return (
    <header>
      <navbar>
        {maxWidth <= 1199 && (
          <div className='littlemenu' onClick={toggleMenuSidebar}>
            <RiMenu2Fill  className={`menu ${menuSidebarOpen ? 'open' : ''}`}/>
          </div>
        )}
        <div className='logo'>
          <img src="https://fone-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1660639000" alt="" />
        </div>
        {maxWidth > 1199 && (
          <div className='bigmenu'>
            <NavLink to='/' activeClassName='active'>Home</NavLink>
            <NavLink to='/page' activeClassName='active'>Pages</NavLink>
            <NavLink to='/shop' activeClassName='active'>
              <div className='hot'>
                <div className='hot-box'>Hot</div>
                Shop
              </div>
            </NavLink>
            <NavLink to='/featured' activeClassName='active'>Featured</NavLink>
            <NavLink to='/blogs' activeClassName='active'>Blogs</NavLink>
          </div>
        )}
        <div className='navbaricon'>
          {maxWidth <= 1199 ? (
            <>
              <CiSearch onClick={toggleSearch} />
              <MdShoppingBag onClick={toggleSidebar} />
            </>
          ) : (
            <>
              <CiSearch onClick={toggleSearch} />
              <MdShoppingBag onClick={toggleSidebar} />
              <IoPerson />
              <FaRegHeart />
            </>
          )}
        </div>
      </navbar>
      {searchOpen && (
        <div className="search-box">
          <div className="search-content">
            <h1>Start typing and hit Enter</h1>
            <input type="text" placeholder="Search..." />
            <MdClose className="close-icon" onClick={toggleSearch} />
          </div>
        </div>
      )}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className='shopsidebartop'>
          <div className='shopcloseicon' onClick={closeSidebar}><IoIosClose /></div>
          <div className='shophead'><h3 className='shoph3'>Shopping Cart</h3></div>
          <div className='shopcount'>{basket.length}</div>
        </div>
        <div>
          {basket && basket.map(product=>(
            <div key={product.id} className='sidebarproduct'>
              <img src={product.image1} alt="" />
              <div className='sidebardescription'>
              <h3>{product.name}</h3>
              <p>{product.price} x {product.count} : {product.price*product.count}</p>
             
              </div>
              <div className='mddelete'>
              <MdDelete  onClick={() => removeItemFromCart(product.Id)}/>
              </div>
            </div>
          ))}
           <div><button className='gototheshop'>   <Link to="/checkout" className="back-link">Go to The Shop</Link></button></div>
        </div>
        <div className='shopsidebarmedium'>
          <h4>Your shopping bag is empty</h4>
         
        </div>
      </div>
      <div className={`menusidebar ${menuSidebarOpen ? 'open' : ''}`}>
        <div className="littlemenu">
          <div className="menutop">
            <div className="menuicon">
              <RiMenu2Fill />
              <span>Menu</span>
            </div>
            <div className="personicon">
              <IoPerson />
              <span>Login</span>
            </div>
          </div>
          <NavLink to='/' activeClassName='active' onClick={closeMenuSidebar}>Home</NavLink>
          <NavLink to='/page' activeClassName='active' onClick={closeMenuSidebar}>Pages</NavLink>
          <NavLink to='/shop' activeClassName='active' onClick={closeMenuSidebar}>
            <div className='hot'>
              <div className='hot-box'>Hot</div>
              Shop
            </div>
          </NavLink>
          <NavLink to='/featured' activeClassName='active' onClick={closeMenuSidebar}>Featured</NavLink>
          <NavLink to='/blogs' activeClassName='active' onClick={closeMenuSidebar}>Blogs</NavLink>
        </div>
        <div className='closemenu'>
          <button className="close-menu" onClick={closeMenuSidebar}>Close</button>
        </div>
      </div>
    </header>
  );
};

export default Header;