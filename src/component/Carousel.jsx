import React from 'react';
import './Carousel.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      slides: [
        { 
          backgroundImage: 'url(https://fone-store-demo.myshopify.com/cdn/shop/files/s1.jpg?v=1660640243)',
          description: <div className='slide1in'> <p className='styledestination'>Style Destination</p> <h4>Burger Delicious</h4> <span> It is a long established fact that a reader will be distracted by the readable content</span> <div> <button className='slidebutton'>Shop Now</button></div></div>
        },
        { 
          backgroundImage: 'url(https://fone-store-demo.myshopify.com/cdn/shop/files/s2.jpg?v=1660640292)',
          description:  <div className='slide1in'> <p className='styledestination'>Style Destination</p> <h4>Delicious Foods</h4> <span> It is a long established fact that a reader will be distracted by the readable content</span> <div> <button className='slidebutton'>Shop Now</button></div></div>
        }
      ]
    };
  }

  nextSlide = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex + 1) % prevState.slides.length
    }));
  }

  prevSlide = () => {
    this.setState(prevState => ({
      currentIndex: (prevState.currentIndex - 1 + prevState.slides.length) % prevState.slides.length
    }));
  }

  goToSlide = (index) => {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    const { currentIndex, slides } = this.state;

    return (
      <div className="carousel">
        <div className="slide" style={{ backgroundImage: slides[currentIndex].backgroundImage }}>
          <h1 className='slidein'>
            {slides[currentIndex].description}
          </h1>
        </div>
        <div className="dots">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={currentIndex === index ? 'dot active' : 'dot'}
              onClick={() => this.goToSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
