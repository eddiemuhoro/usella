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
import CartButton from './CartButton';
import './products.css'




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
      setColor(getRandomColor()); // set the color to a random color
    }, 5000); // call the function every 1000ms (1 second)

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
  const [products, setclickedProduct] = useState([])

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
  //fetch cart data by user id
  //   useEffect(() => {
  //     dispatch(getCart(products.id))
  //     .then(res => {
  //       setCart(res.payload)
  //     }
  //   )
  // }, [dispatch, products.id])
  const [test, setTest] = useState('ELECTRONICS')
  const [dataFetched, setDataFetched] = useState(false);

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


  const [category, setCategory] = useState([])
  //fetch product by category after fetching product
  useEffect(() => {
    setLoading(true)
    dispatch(getProductByCategory(test))
      .then(res => {
        //set data to category after 2 seconds
        setCategory(res.payload)
        setLoading(false)
      }
      )
  }, [dispatch, test])


  const [sellerProducts , setSellerProducts] = useState([])
  useEffect(() => {
    if(!dataFetched) return;
    setLoading(true)

    dispatch(getProductByUser(products.seller_id))
    .then(res => { 
      setSellerProducts(res.payload)
      console.log(res.payload);
      setLoading(false)
    })
    // const fetchProducts = async () => {
    //   const { data } = await axios.get(`http://localhost:9000/products/seller/${seller}`)
    //   setProducts(data)
    // }
    // fetchProducts()
  }, [dispatch, products.seller_id])




  const cutDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + '...'
    } else if (description.length < 50) {
      return description
    }
  }

  //habdle loading after 1 second
  const handleReload = () => {
    // setTimeout(() => {
    //   window.location.reload()
    // }, 500);
  }

  const cutSellerDescription = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + '...'
    } else if (description.length < 30) {
      return description
    }
  }


  //image corousel that automatically changes image after 5 seconds
  const [index, setIndex] = useState(0);
  const length = products.images && products.images.length;

  useEffect(() => {
    const lastIndex = length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
      
  }, [index, length]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);








  return (
    <div>
      <div className='single-product-container'>
        {
          <section className='product-info'>

            <div className='single-product-image'>
              {products && products.images ? (
                <img src={products.images[index]} alt="product"  />
              ) : (
                <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className='product-image' />
              )}
            </div>

            <div className='product-content cart' >
              <section>
              <h1 className="info-name">{products.name}</h1>

              <p className="info-desc">{products.description}.</p>
              <div>
                <h2 className="info-price">Ksh {products.price}</h2>
              </div>
              <div className='warning'>
                <p style={{ color, transition: 'color 2s ease-in-out' }}> items left: {products.quantity}</p>
              </div>
              <div className='cart-button'>

                {/* CONDITIONAL RENDERING */}

                {/* IF QUANTITY IS 0, DISABLE ADD TO CART BUTTON */}
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
              </section>

              <section>
                <h2>Other images</h2>

                <div className='other-images popup'>
                  {
                    products.images &&
                    products.images.slice(0, 2).map((image, index) => (
                      <div className='image'>
                        <Popup trigger={
                          !loading ?( 
                          <img src={image} alt="product"
                            className={`product-image ${index === expandedIndex ? 'expanded' : ''}`}
                            onClick={() => handleImageClick(index)}
                          />):(
                           
                            <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading'  className={`product-image`}/>

                          )

                        }  closeOnDocumentClick={true} modal>
                          {(close) => (
                            <div className='other-images popup'>
                              {
                                products.images.map((image, index) => (
                                  <div className='image-popup'>
                                    {
                                      !loading ?(
                                        <img src={image} alt="product"
                                          className={`product-image ${index === expandedIndex ? 'expanded' : ''}`}
                                          onClick={() => handleImageClick(index)}
                                        />
                                      ):(
                                        <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading'  className={`product-image`}/>
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
                  {products.images   && (
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
                      <Link key={product.id} onClick={handleReload} to={`/products/${product.id}`}>
                        <p><span style={{textDecoration:'underline'}}>{product.name}</span> {cutSellerDescription(product.description)}</p>
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
            <Link key={product.id} onClick={handleReload} to={`/products/${product.id}`}>
              <div className="product">
                <div className="product-img">
                {
                !loading ? (
                  <img src={product.images[0]} alt="product" />
                ):
                (
                  <img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className='product-image'/>
                )
              }
                </div>
                <div className="product-info">
                  <p className="info-name">{product.name}</p>
                  <p className="info-description">{cutDescription(product.description)}</p>
                </div>
                <div className="product-btns">
                  <p className="info-price">Ksh {product.price}</p>
                  {
                    user ? (
                      <CartButton productId={product.id} name={product.name} price={product.price} description={product.description} image={product.image} />
                    ) : (
                      <BsCart3 />
                    )

                  }
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