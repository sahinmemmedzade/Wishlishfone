import React from 'react'
import './Footer.css'
import { FaTwitter } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <div className='allfooter'>
      <div className='footer1'>
        <div className='aboutus'>
          <div className='footerfonecontain'>
          <img className='footerfone' src="https://fone-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1660639000" alt="" />
          <span className=' sophisticated font-medium w-[190px]'>Sophisticated simplicity for the
            independent mind.</span>
          <div className='footeericons'>
          <span><FaTwitter /></span>
          <span><FaDribbble /></span>
          <span><FaBehance /></span>
          <span><FaInstagram /></span>
          </div>
          </div>
        </div>
        <div className='aboutus'>
        <div className='aboutushr'>
          <h6>Help  & Information</h6>
          <hr />
          </div>
          <span>About Us</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Products Return</span>
          <span>Wholesale Policy</span>
        </div>
        <div className='aboutus'>
        <div className='aboutushr'>
          <h6>About Us</h6>
          <hr />
          </div>
          <span>Pagination</span>
          <span>Terms & Conditions</span>
          <span>Contact</span>
          <span>Accessories</span>
          <span>Home Page</span>
        </div>
        <div className='aboutus'>
          <div className='aboutushr'>
          <h6>Categories</h6>
          <hr />
          </div>
          <span>Menu items</span>
          <span>Help Center</span>
          <span>Address Store</span>
          <span>Privacy Policy</span>
          <span>Home Page</span>
        </div>
        <div>

        </div>
      </div>
      <div className='mediumhr'>
      <hr />
      </div>
      <div className='footer2' >
        <span className='text-[14px]'>© Copyright 2022 | Fone By EngoTheme. Powered by Shopify</span>
        <span className='footerimg'><img src="https://fone-store-demo.myshopify.com/cdn/shop/files/logoo-removebg-preview.png?v=1660638975" alt="" /></span>
      </div>
    </div>
  )
}

export default Footer