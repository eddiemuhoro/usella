import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart, getProductByCategory, getProductById } from '../../react-redux/features/products/productSlice';
import CartButton from './CartButton';
import Wishlist from './WishlistButton';


const SingleProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //save update state in local storage
 const [update , setUpdate] = useState(false)

  const user = useSelector(state => state.auth.you)
  const params = useParams()
  const { id } = params
  const [color, setColor] = useState('#000000'); // initial color is black

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRandomColor()); // set the color to a random color
    }, 5000); // call the function every 1000ms (1 second)

    return () => clearInterval(interval); // cleanup function to clear the interval when the component unmounts
  }, []);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
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
    }
       )
      }


      const [cart, setCart] = useState([])
      useEffect(() => {
        dispatch(getProductById(id))
        .then(res => {
          setclickedProduct(res.payload)
        }
        )
      }, [])

      const [category , setCategory] = useState([ ])
      useEffect(() => {
        dispatch(getProductByCategory(products.category))
        .then(res => {
          setCategory(res.payload)
        }
        )
      }, [dispatch, products.category])

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
        }, 1000);
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
                <h1 className="info-name">{products.name}</h1>
              
                <p className="info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <div>
                <h2 className="info-price">${products.price}</h2>
              </div>
              <div className='warning'>
                <p style={{color, transition: 'color 2s ease-in-out' }}>3 items left</p>
              </div>
              <div className='cart-button'>
                
                {/* CONDITIONAL RENDERING */}
                {
                  (cart.length === 0 || cart[0].userId !== user.id) && !update  ? (
                    <button onClick={handleCart}>Add to cart</button>
                  ) : (
                    <Link to='/cart' ><button>Already added to cart</button></Link>
                  )
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
          <h2>Henry</h2>
          <p style={{textDecoration:'underline'}}>Other products posted by henry[8]</p>
        </section>
    </div>

    <section className="products">
    
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
            <p className="info-price">${product.price}</p>
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