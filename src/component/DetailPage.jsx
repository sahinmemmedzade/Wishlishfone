import React from 'react';
import axios from 'axios';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true
    };
  }

  componentDidMount() {
    // JSON verisini axios ile alın
    axios.get('http://localhost:4041/modalproducts')
      .then(response => {
        this.setState({
          products: response.data,
          loading: false
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  getProductById = (productId) => {
    return this.state.products.find(product => product.id === productId);
  };

  render() {
    const { loading } = this.state;
    const productId = 1; // Örnek olarak bir ID belirtin veya başka bir yolla bir ID alın

    if (loading) {
      return <div>Loading...</div>;
    }

    const product = this.getProductById(productId);

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div>
        <h1>Product Details</h1>
        <div>
          <img src={product.image1} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      </div>
    );
  }
}

export default DetailPage;
