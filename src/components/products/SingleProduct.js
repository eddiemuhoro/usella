import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../react-redux/features/products/productSlice';
import Wishlist from './WishlistButton';


const SingleProduct = () => {
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


useEffect(() => {
  dispatch(getProductById(id))
  .then(res => {
    setclickedProduct(res.payload)
  }
  )
}, [dispatch, id])


const handleCart = async () => {
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
  await axios.post('http://localhost:9000/products/cart', 
    cartData
       )
      }

      const handleCartRemove = async () => {
        await axios.delete(`http://localhost:9000/products/cart/${id}`)
         .then(res => {
           console.log(res)
           console.log(res.data)
         }
         )
      }

      const [cart, setCart] = useState([])
      useEffect(() => {
        const fetchCart = async () => {
          const { data } = await axios.get(`https://odd-slip-ant.cyclic.app/products/cart/${id}`)
          setCart(data)
        }
        fetchCart()
      }, [])

    //fetch wishlist based on product id fetched 
  
  return (
    <div>
    <div className='single-product-container'>
      {
          <section className='product-info'>
          <div>
            <img src="https://images.unsplash.com/photo-1676809767144-d24ba6178421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="product" />
          </div>
          <div className='product-content' >
                <h1 className="info-name">{products.id}</h1>
              
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
                  (cart.length === 0 || cart[0].youId !== user.id) && !update  ? (
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
     <section>
        <h2>Related Products</h2>
     </section>
    </div>
  )
}

export default SingleProduct