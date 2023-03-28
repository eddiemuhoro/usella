import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, getCart, getProductByCategory, getProductById, getProductByUser, reset } from '../../react-redux/features/products/productSlice';
import Wishlist from '../profile/tabs/WishlistButton';
import CartButton from './CartButton';


const SingleProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const [update , setUpdate] = useState(false)
  const user = useSelector(state => state.auth.you)
  const params = useParams()
  const { id } = params
  const [color, setColor] = useState('#ffffff'); // initial color is black
  const [loading, setLoading] = useState(false)

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

const handleCart =  () => {
  
  const cartData ={
    productId: products.id,
    userId: user.id,
    name: products.name,
    price: products.price,
    description: products.description,
    image: products.image,
    quantity: 1
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

      useEffect(() => {
        setLoading(true)
        dispatch(getProductById(id))
        .then(res => {
          setclickedProduct(res.payload)
          //settest to category 
          setTest(res.payload.category)
          setLoading(false)
        }
        )
      }, [dispatch, id])


   

      const [category , setCategory] = useState([ ])
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


      // const [sellerProducts , setSellerProducts] = useState([])
      // useEffect(() => {
      //   setLoading(true)
      //   dispatch(getProductByUser(products.sellerId))
      //   .then(res => { 
      //     setSellerProducts(res.payload)
      //     setLoading(false)
      //   })
      //   // const fetchProducts = async () => {
      //   //   const { data } = await axios.get(`http://localhost:9000/products/seller/${seller}`)
      //   //   setProducts(data)
      //   // }
      //   // fetchProducts()
      // }, [dispatch, products.sellerId])




      const cutDescription = (description) => {
        if (description.length > 50) {
          return description.substring(0, 50) + '...'
        }else if(description.length < 50) {
          return description
        }
      }

      //habdle loading after 1 second
      const handleReload = () => {
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }

      const cutSellerDescription = (description) => {
        if (description.length > 30) {
          return description.substring(0, 30) + '...'
        }else if(description.length < 30) {
            return description
        }
      }
  
 
  
  return (
    <div>
    <div className='single-product-container'>
      {
          <section className='product-info'>
          <div>
            <img src={products.image} alt="product" />
          </div>
          <div className='product-content' >
                <h1 className="info-name">{products.category}</h1>
              
                <p className="info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <div>
                <h2 className="info-price">Ksh {products.price}</h2>
              </div>
              <div className='warning'>
                <p style={{color, transition: 'color 2s ease-in-out' }}>{products.quantity} items left</p>
              </div>
              <div className='cart-button'>
                
                {/* CONDITIONAL RENDERING */}
               
                {/* IF QUANTITY IS 0, DISABLE ADD TO CART BUTTON */}
                {
                  user ? (
                    products.quantity === 0 ?  (<button title='out of stock' disabled style={{cursor:'not-allowed'}}>Add to cart</button>):
                    (
                      
                        (cart.length === 0 || cart[0].userId !== user.id) && !update  ? (
                          <button onClick={handleCart}>Add to cart</button>
                        ) : (
                          <Link to='/cart' ><button>Already added to cart</button></Link>
                        )
                      
                    )
                  ):(
                    <button onClick={handleCart}>Log in to add to cart</button>
                  )
                }
                
                {
                 
                }

             
              </div>
              <div className='favorite'>
                  {/* DISPLAY WISHLISsT ID */}
                  {
                      user ? (
                        <Wishlist productId={id}  name={products.name} price={products.price} description={products.description} image={products.image} />
                      ) : (
                        <BsHeart />
                      )

                  }
                </div>
             </div>
         
      </section>
      }
        
        <section className='seller-info'>
         
          <h4 >Other products posted by {products.sellerName}</h4>
          {/* <div className='seller-products'>
          {loading && <p>Please wait a sec...</p>}
              {
                sellerProducts.map(product => (
                 <ul>
                    <li>
                      <Link key={product.id} onClick={handleReload} to={`/products/${product.id}`}>
                        <p ><span style={{textDecoration:'underline'}}>{product.name}</span> {cutSellerDescription(product.description)}</p>
                      </Link>
                    </li>
                 </ul>
                ))
              }
          </div> */}
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
            <img src={product.image} alt="product" />
          </div>
          <div className="product-info">
            <p className="info-name">{product.name}</p>
            <p className="info-description">{cutDescription(product.description)}</p>
          </div>
          <div className="product-btns">
            <p className="info-price">Ksh {product.price}</p>
            {
              user ? (
                <CartButton productId={product.id}  name={product.name} price={product.price} description={product.description} image={product.image} />
              ) : (
                <BsCart3  />
              )

            }
          </div>
          <div className='favorite'>
            {/* DISPLAY WISHLIST ID */}
            {
              user ? (
                <Wishlist productId={product.id}  name={product.name} price={product.price} description={product.description} image={product.image} />
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