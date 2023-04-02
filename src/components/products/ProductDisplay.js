import React, { useEffect, useState } from 'react'
import {GrLinkPrevious, GrLinkNext, GrPrevious, GrNext} from 'react-icons/gr';
import {FcNext, FcPrevious} from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../react-redux/features/products/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import CartButton from './CartButton';
import { BsCart3, BsHeart } from 'react-icons/bs';
import Wishlist from '../profile/tabs/WishlistButton'

const Product = ({ product }) => {
    const you = useSelector(state => state.auth.you)
    const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(0);

  const [startX, setStartX] = useState(null);

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (startX == null) {
      return;
    }
    const deltaX = event.touches[0].clientX - startX;
    if (deltaX > 50 && currentImage > 0) {
      setCurrentImage(currentImage - 1);
      setStartX(null);
    } else if (deltaX < -50 && currentImage < product.images.length - 1) {
      setCurrentImage(currentImage + 1);
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const handleNextImage = () => {
    setCurrentImage((currentImage + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((currentImage - 1 + product.images.length) % product.images.length);
  };

  const handleLogin = () => {
    if (window.confirm('You need to login to add to wishlist'))
     navigate('/login') 
   }

  return (
    <div className="product">
      <div className="product-img">
        
        <img src={product.images[currentImage]} alt={product.name} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />
        <FcPrevious style={{ color: 'white' }} onClick={handlePrevImage} className='prev-button' />
        <FcNext onClick={handleNextImage} className='next-button' />
      </div>
      <Link key={product.id} to={`/products/${product.id}`}>

        <div className="product-info">
          <p className="info-name">{product.name}</p>
          <p className="info-description">hsdkjc  sbvfhsv shvchjsjb shvhjsbkdhcbsh </p>
        </div>
      </Link>
      <div className="product-btns">
        <p className="info-price">Ksh {product.price.toLocaleString('en-US')}</p>
        {
          you ? (
            <CartButton productId={product.id} name={product.name} price={product.price} description={product.description} image={product.image} />
          ) : (
            <BsCart3 onClick={handleLogin} />
          )

        }
      </div>


      <div className='favorite'>
        {/* DISPLAY WISHLIST ID */}
        {
          you ? (
            <Wishlist productId={product.id} name={product.name} price={product.price} description={product.description} image={product.image} />
          ) : (
            <BsHeart onClick={handleLogin} />
          )

        }
      </div>



    </div>
  );
};

const Products = ({ products }) => {
  
  return (
    <div className="products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductDisplay = () => {
    const dispach = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
   
    useEffect( () => {
        setLoading(true)
         dispach(getProduct())
          .then(res => {
            setProducts(res.payload)
            console.log(res.payload)
            setLoading(false)
          }
          )
      }, [])



  return (
    <div className="app">
      <h1>Products</h1>
      <Products products={products} />
    </div>
  );
};

export default ProductDisplay;
