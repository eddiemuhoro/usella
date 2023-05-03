import React, { useEffect, useState } from 'react'
import { GrLinkPrevious, GrLinkNext, GrPrevious, GrNext } from 'react-icons/gr';
import { FcNext, FcPrevious } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../react-redux/features/products/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import CartButton from './cart/CartButton';
import { BsCart3, BsHeart } from 'react-icons/bs';
import Wishlist from '../profile/tabs/WishlistButton'
import { IoFilterSharp } from 'react-icons/io5';
import ReactSlider from 'react-slider'

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

  const cutDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + '...'
    } else if (description.length < 50) {
      return description
    }
  }

  return (
    <div className="product">
      <Link key={product.id} to={`/products/${product.id}`}>
        <div className="product-img">

          <img src={product.images[currentImage]} alt={product.name} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />


        </div>


        <div className="product-info">
          <p className="info-name">{product.name}</p>
          <p className="info-description">{cutDescription(product.description)} </p>
        </div>
      </Link>
      <div className="product-btns">
        <p className="info-price">Ksh {product.price.toLocaleString('en-US')}</p>
        {
          you ? (
            <BsCart3  />
            // <CartButton productId={product.id} name={product.name} price={product.price} description={product.description} image={product.image} />
          ) : (
            <BsCart3 onClick={handleLogin} />
          )

        }
      </div>


      <div className='favorite'>
        {/* DISPLAY WISHLIST ID */}
        {
          you ? (
            <BsHeart />
            // <Wishlist productId={product.id} name={product.name} price={product.price} description={product.description} image={product.image} />
          ) : (
            <BsHeart onClick={handleLogin} />
          )

        }
      </div>

      <FcPrevious style={{ color: 'white' }}
        onClick={(e) => {
          e.preventDefault();
          handlePrevImage();
        }}
        className='prev-button'
      />
      <FcNext
        onClick={(e) => {
          e.preventDefault();
          handleNextImage();
        }}
        className='next-button'
      />




    </div>
  );
};

const Products = ({ products, query, filteredData }) => {

  return (
    <div className="products">

      {
        filteredData.map(product => (
          <Product key={product.id} product={product} />
        ))
      }
    </div>
  );
};





const ProductDisplay = () => {
  const dispach = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    dispach(getProduct())
      .then(res => {
        setProducts(res.payload)
        console.log(res.payload)
        setLoading(false)
      }
      )
  }, [])


  useEffect(() => {
    // Calculate the maximum price in the data
    const max = Math.max(...products.map(item => item.price));
    setMaxPrice(max);
    // Initialize the price range to the full range
    setPriceRange([0, max]);
    console.log(max);
  }, [products]);


  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  

  const filteredData = products.filter(item => {
    // Apply the search text filter
    if (query && !item.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    // Apply the category filter
    if (categoryFilter && item.category !== categoryFilter) {
      return false;
    }

    // Apply the price range filter
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false;
    }
    return true;
  });


  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange([event.target.valueAsNumber, priceRange[1]]);
  };

  const handlePriceRangeInputChange = (event) => {
    setPriceRange([priceRange[0], event.target.valueAsNumber]);
  };

  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };


  return (
    <div className="app">
      <div className='products-header'>
        <h1>Products</h1>
        <div className="search-input">
          <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
        </div>

        <IoFilterSharp onClick={handleToggleFilters} title='filters' style={{ fontSize: '25px' }} className='toggle-filters-button' />

        {
          showFilters && (
            <div className="filters mobile">
              <select value={categoryFilter} onChange={handleCategoryFilterChange}>
                <option value="">All categories</option>
                <option value="ELECTRONICS">ELECTRONICS</option>
                <option value="FASHION">FASHION</option>
                <option value="SPORTS">SPORTS</option>
                <option value="HEALTH">HEALTH</option>
                <option value="HOME">HOME</option>

              </select>
              <div className='slider-container'>
            
            <ReactSlider
             className="my-slider"
             thumbClassName="my-thumb"
             trackClassName="my-track"
            min={0} max={maxPrice} value={priceRange} onChange={setPriceRange} />
            </div>
              <p>Price range: {priceRange[0]} - {priceRange[1]}</p>
            </div>
          )
        }

        <div className='filters-desktop'>
          <select value={categoryFilter} onChange={handleCategoryFilterChange}>
            <option value="">All categories</option>
            <option value="ELECTRONICS">ELECTRONICS</option>
            <option value="FASHION">FASHION</option>
            <option value="SPORTS">SPORTS</option>
            <option value="HEALTH">HEALTH</option>
            <option value="HOME">HOME</option>

          </select>
          {/* <input type="range" min={0} max={maxPrice} value={priceRange[0]} onChange={handlePriceRangeChange} />
          <input type="range" min={0} max={maxPrice} value={priceRange[1]} onChange={handlePriceRangeInputChange} />
          <p>Price range: {priceRange[0]} - {priceRange[1]}</p> */}
          <div className='slider-container'>
            
          <ReactSlider
           className="my-slider"
           thumbClassName="my-thumb"
           trackClassName="my-track"
          min={0} max={maxPrice} value={priceRange} onChange={setPriceRange} />
          </div>
          <p>Price range: {priceRange[0]} - {priceRange[1]}</p>
        </div>
      </div>

      <Products products={products} query={query} filteredData={filteredData} />
      {
        loading ? (
          <div className='loading'>
            <h2>Loading...</h2>
          </div>
        ) : (
          filteredData.length === 0 && (<h2>No products found</h2>)
        )
      }

    </div>
  );
};

export default ProductDisplay;
