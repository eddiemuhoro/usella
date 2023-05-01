import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import { addToCart, getCart, getProductByCategory, getProductById, getProductByUser, reset } from '../../react-redux/features/products/productSlice';
import Loader from '../loader/Loader';
import SellerProfile from '../profile/SellerProfile';
import Wishlist from '../profile/tabs/WishlistButton';
import CartButton from './cart/CartButton';
import './products.css'
import apiUrl from '../../react-redux/myApi';
import { getProfile } from '../../react-redux/features/auth/authSlice';




const SingleProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)
  const user = useSelector(state => state.auth.you)
  const params = useParams()
  const { id } = params
  const [color, setColor] = useState('#ffffff'); // initial color is black
  const [loading, setLoading] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(null);

  //EXPAND IMAGE
  const handleImageClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRandomColor()); 
    }, 5000); 

    return () => clearInterval(interval); // cleanup function to clear the interval when the component unmounts
  }, []);

  function getRandomColor() {
    var letters = "123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 15)];
    }
    return color;
  }

  //fetch clicked product'


  //ADDING PRODUCT TO CART USING BUYER & PRODUCT ID
  const handleCart = () => {

    const cartData = {
      product_id: products.id,
      buyer_id: user.id,
    }
    setUpdate(!update)
    dispatch(addToCart(cartData))
      .then(res => {
        console.log(res)
        toast.success('Product added to cart')
      }
      )
  }



  const [cart, setCart] = useState([])

 
  const [dataFetched, setDataFetched] = useState(false);
  const [test, setTest] = useState('ELECTRONICS')

  // FETCH CLICKED PRODUCT BY ID IN PARAMS
  const [products, setclickedProduct] = useState([])  
  useEffect(() => {
    setLoading(true)
    dispatch(getProductById(id))
      .then(res => {
        setclickedProduct(res.payload)
        //settest to category 
        setTest(res.payload.category)
        setLoading(false)
        setDataFetched(true);
      }
      )
  }, [dispatch, id])


  //FETCH PRODUCTS BY CATEGORY from clicked product
  const [category, setCategory] = useState([])
  useEffect(() => {
    setLoading(true)
    products && (
    dispatch(getProductByCategory(test))
    )
      .then(res => {
        //set data to category after 2 seconds
        setCategory(res.payload)
        setLoading(false)
      }
      )
  }, [dispatch, test])



  //FETCH PRODUCTS BY SELLER ID from clicked product
  const [sellerProducts, setSellerProducts] = useState([])
  useEffect(() => {
    if (!dataFetched) return;
    setLoading(true)

    dispatch(getProductByUser(products.seller_id))
      .then(res => {
        setSellerProducts(res.payload)
        console.log(res.payload);
        setLoading(false)
      })
  }, [dispatch, products.seller_id])



//cut description
  const cutDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + '...'
    } else if (description.length < 50) {
      return description
    }
  }


  const cutSellerDescription = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + '...'
    } else if (description.length < 30) {
      return description
    }
  }


  //image corousel that automatically changes image after 5 seconds

  const [currentImage, setCurrentImage] = useState(0)
  useEffect(() => {
    
    const interval = setInterval(() => {
      products.images && (
      setCurrentImage(currentImage => (currentImage + 1) % products.images.length)
      )
    }, 3000)
    
    return () => clearInterval(interval)
  }, [products.images])

  //GET PROFILE OF BUYER
  const [profile, setProfile] = useState([])
  useEffect(() => {
    setLoading(true)
    dispatch(getProfile(user.id))

      .then(res => {
        setProfile(res.payload)
        setLoading(false)
      }
      )
  }, [dispatch, user.id])


//BUY DIRECTLY
const [buying, setBuying] = useState(false)
  const handleBuy = () => {
    // setBuying(true)
    // profile &&(
    // axios.post(apiUrl+'order/create', {
    //   buyer_id: user.id,
    //   buyer_email: profile.email,
    //   buyer_name: profile.name,
    //   product_id: products.id,
    //   quantity: products.quantity,
    //   location: 'Nakuru',
    // })
    // )
    // .then(res => {
    //   console.log(res)
    //   toast.info(
    //     <div>
    //       Order placed. Click <Link to="/profile" style={{color:'black'}}>here</Link> to see orders
    //     </div>,
    //     {
    //       autoClose: false,
    //     }
    //   ); 
    //   setBuying(false)
    //   }
    // )
    toast.warn('please wait as our developers fix this feature')
  }




  return (
    <div>
      <div className='single-product-container'>
        {
          <section className='product-info'>
            {
              products.images && (
                <div className='single-product-image'>
                
                  <div style={{
                    display: 'flex',
                    width: `${products.images.length}00%`,
                    transform: `translateX(-${currentImage * (100 / products.images.length)}%)`,
                    transition: 'transform 0.5s ease-in-out',
                    height:'100%'
                  }}>
                    { products.images.map((image, index) => (
                      <img key={index} src={image} alt={`image${index}`} style={{ height: '100%', width: `${100 / products.images.length}%`, objectFit: "contain" }} />
                    ))}
                  </div>
           
              </div>
              )
            }

            <div className='product-content cart' >
              <section>
                  <div className='heading'>
                    <h1 className="info-name">{products.name}</h1>
                    <h2>Ksh {products.price}</h2>
                  </div>

                  <div>
                    <p className="">bkdsc scsd svhcs vshvhk</p>
                  </div>
              

                <div className='warning'>
                  <p style={{ color, transition: 'color 2s ease-in-out' }}> items left: {products.quantity}</p>
                </div>
                <section className='buttons'>

                    <div className='cart-button'>

                      {
                        user ? (
                          products.quantity === 0 ? (<button title='out of stock' disabled style={{ cursor: 'not-allowed' }}>Add to cart</button>) :
                            (

                              (cart.length === 0 || cart[0].userId !== user.id) && !update ? (
                                <button onClick={handleCart}>Add to cart</button>
                              ) : (
                                <Link to='/cart' ><button>Already added to cart</button></Link>
                              )

                            )
                        ) : (
                          <button onClick={handleCart}>Log in to add to cart</button>
                        )
                      }


                    </div>
                    <div className='buy-button'>
                      <button onClick={handleBuy}>Buy Now</button>
                    </div>
                </section>

              </section>

              <section>
                <h2>Other images</h2>

                <div className='other-images popup'>
                  {
                    products.images &&
                    products.images.slice(0, 2).map((image, index) => (
                      <div className='image'>
                        <Popup trigger={
                          !loading ? (
                            <img src={image} alt="product"
                              className={`product-image ${index === expandedIndex ? 'expanded' : ''}`}
                              onClick={() => handleImageClick(index)}
                            />) : (

                            <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className={`product-image`} />

                          )

                        } closeOnDocumentClick={true} modal>
                          {(close) => (
                            <div className='other-images popup'>
                              {
                                products.images.map((image, index) => (
                                  <div className='image-popup'>
                                    {
                                      !loading ? (
                                        <img src={image} alt="product"
                                          className={`product-image ${index === expandedIndex ? 'expanded' : ''}`}
                                          onClick={() => handleImageClick(index)}
                                        />
                                      ) : (
                                        <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className={`product-image`} />
                                      )
                                    }
                                  </div>
                                ))

                              }
                              <AiOutlineClose className="close-btn" onClick={close} size={25} />

                            </div>
                          )}
                        </Popup>
                      </div>
                    ))
                  }
                  {products.images && (
                    products.images.length > 2 &&
                    <div className="extra-images-label" >
                      +{products.images.length - 2}
                    </div>
                  )}

                </div>
              </section>
            </div>
          </section>
        }




        <section className='seller-info'>
          <SellerProfile name={products.seller_name} sellerId={products.seller_id} sellerProducts={sellerProducts} />
          <div className='seller-products'>

            {
              sellerProducts.map(product => (
                <ul>
                  <li>
                    <Link key={product.id}  to={`/products/${product.id}`}>
                      <p><span style={{ textDecoration: 'underline' }}>{product.name}</span> {cutSellerDescription(product.description)}</p>
                    </Link>
                  </li>
                </ul>
              ))
            }
          </div>
          <div className='favorite'>
            {/* DISPLAY WISHLISsT ID */}
            {
              user ? (
                <Wishlist productId={id} name={products.name} price={products.price} description={products.description} image={products.image} />
              ) : (
                <BsHeart />
              )

            }
          </div>
        </section>

      </div>




      <h2>Related products</h2>
      <section className="products">

        {loading && <p>Please wait a sec...</p>}
        { 
          category.map(product => (
            <Link key={product.id}  to={`/products/${product.id}`}>
              <div className="product">
                <div className="product-img">
                  {
                    !loading ? (
                      <img src={product.images[0]} alt="product" />
                    ) :
                      (
                        <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className='product-image' />
                      )
                  }
                </div>
                <div className="product-info">
                  <p className="info-name">{product.name}</p>
                  <p className="info-description">{cutDescription(product.description)}</p>
                </div>
                <div className="product-btns">
                  <p className="info-price">Ksh {product.price}</p>
                  
                </div>
                <div className='favorite'>
                  {/* DISPLAY WISHLIST ID */}
                  {
                    user ? (
                      <Wishlist productId={product.id} name={product.name} price={product.price} description={product.description} image={product.image} />
                    ) : (
                      <BsHeart />
                    )

                  }
                </div>

              </div>
            </Link>
          )
          )
        }

      </section>

    </div>
  )
}

export default SingleProduct