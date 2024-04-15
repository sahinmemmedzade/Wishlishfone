import React from 'react'
import Carousel from '../component/Carousel'
import Suspendise from '../component/suspendise'
import ShoppingCart from '../component/Bestseller'
import Enjoy from '../component/Enjoy'
import Backtotop from '../component/backtotop'
import Hotdeal from '../component/Hotdeal'
import Cartcarousel from '../component/Cartcarousel'
import Ourblogs from '../component/Ourblogs'
import Foneinstagram from '../component/Foneoninstagram'

const Home = () => {
  return (
    <div>

      <Carousel></Carousel>
      <Cartcarousel></Cartcarousel>
      <Suspendise></Suspendise>
      <ShoppingCart></ShoppingCart>
      <Enjoy></Enjoy>
      <Backtotop></Backtotop>
      <Hotdeal></Hotdeal>
      <Ourblogs></Ourblogs>
      <Foneinstagram></Foneinstagram>
    </div>
  )
}

export default Home