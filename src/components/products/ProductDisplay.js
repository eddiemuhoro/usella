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

   const cutDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + '...'
    }else if(description.length < 50) {
      return description
    }
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
          <p className="info-name">{product.category}</p>
          <p className="info-description">{cutDescription(product.description)} </p>
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

const Products = ({ products, query, filteredData }) => {
  
  return (
    <div className="products">
      {
        products.length === 0 && ( <h2>No products found</h2>)
      }
    
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


      useEffect(() => {
        // Calculate the maximum price in the data
        const max = Math.max(...products.map(item => item.price));
        setMaxPrice(max);
        // Initialize the price range to the full range
        setPriceRange([0, max]);
      }, [products]);


      const [query, setQuery] = useState('')
      const [categoryFilter, setCategoryFilter] = useState('');
      const [priceRange, setPriceRange] = useState([0, 100]);
      const [maxPrice, setMaxPrice] = useState(0);

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

        <button className="toggle-filters-button" onClick={handleToggleFilters}>Filters</button>

        {
          showFilters && (
            <div className="filters">
              <select value={categoryFilter} onChange={handleCategoryFilterChange}>
                <option value="">All categories</option>
                <option value="ELECTRONICS">ELECTRONICS</option>
                <option value="FASHION">FASHION</option>
                <option value="SPORTS">SPORTS</option>
                <option value="HEALTH">HEALTH</option>

              </select>
              <input type="range" min={0} max={maxPrice} value={priceRange[0]} onChange={handlePriceRangeChange} />
              <input type="range" min={0} max={maxPrice} value={priceRange[1]} onChange={handlePriceRangeInputChange} />
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

        </select>
        <input type="range" min={0} max={maxPrice} value={priceRange[0]} onChange={handlePriceRangeChange} />
        <input type="range" min={0} max={maxPrice} value={priceRange[1]} onChange={handlePriceRangeInputChange} />
        <p>Price range: {priceRange[0]} - {priceRange[1]}</p>
  </div>
      </div>
      
      <Products products={products} query={query}  filteredData={filteredData} />
      {
        filteredData.length === 0 && (
          <div className='no-products'>
            <img src='https://media.tenor.com/IHdlTRsmcS4AAAAC/404.gif' alt='404' />
          </div>
        )
      }
    </div>
  );
};

export default ProductDisplay;
