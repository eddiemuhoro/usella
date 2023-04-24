import axios from 'axios'
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCart, deleteProduct, getCartByUser } from '../../../react-redux/features/products/productSlice'
import Loader from '../../loader/Loader'
import './cart.css'
import Paypal from './Paypal'
import { getProfile } from '../../../react-redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import apiUrl from '../../../react-redux/myApi'
const Cart = (props) => {
  const navigate = useNavigate()
  const [phone , setPhone] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.you)
  const [items, setItems] = useState([])
  const [loading , setLoading] = useState(false)
  const [delivery , setDelivery] = useState('')
  const [update, setUpdate] = useState(false)

  const [profile, setProfile] = useState({})

  //profile details
      useEffect(() => {   
         dispatch(getProfile(user.id))
           .then(res => {
                  //array [0] because we are getting an array of objects
                  setProfile(res.payload)
              }
          )
      }, [dispatch, user.id])
  //show delivery on console
  //  console.log(delivery)

  useEffect(() => {
    setLoading(true)
    dispatch(getCartByUser(user.id))
    .then(res => {
      setItems(res.payload)
      setLoading(false)
      setUpdate(false)
      //if no cart items return this
      if(res.payload.length === 0){
        return
      }
    }
  )
  }, [update, dispatch, user.id])

  const handleCartRemove =  (productId) => {
     dispatch(deleteCart(productId))  
     .then((res)=>{
      setUpdate(true)
      props.setCartCount(true)

     })
  } 

//if there are no items in cart return this



  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map(item => {
      if (newQuantity === 0) return item;
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      console.log(item)
      return item;
    });
    setItems(updatedItems);
    axios.put(`https://odd-slip-ant.cyclic.app/products/cart/${itemId}`, {quantity: newQuantity})
  };
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const [checkout, setCheckout] = useState(false)


  //mpesa payment
  const [postloading , setPostLoading] = useState(false)
  const handleSubmit = (quant, id) => {
  
    
      items.map(item => {
      axios.post(apiUrl+'order/create', {
        buyer_id: user.id,
        buyer_email: profile.email,
        buyer_name: profile.name,
        product_id: item.id,
        quantity: item.quantity,
        location: 'profile.location',
      })
      .then(res => {
        console.log({buyer_id: user.id, buyer_email: profile.email, buyer_name: profile.name, prodict_id: item.id, quantity: item.quantity, location: profile.location})
        console.log(res)
        toast.info(
          <div>
            Order placed. Click <Link to="/profile" style={{color:'black'}}>here</Link> to see orders
          </div>,
          {
            autoClose: false,
          }
        ); setUpdate(true)
        setPostLoading(false)
      }

      )
    }
  )
   
  }

    //check if product is in order
    const [inOrder, setInOrder] = useState(false)
    useEffect(() => {
     dispatch(getCartByUser(user.id))
      .then(res => {
        res.data.map(item => {
          if(item.userId === user.id){
            setInOrder(true)
            }
            //if payload is empty return this
            if(res.payload.length === 0){
              return
            }
            
          }
        )
      }
      )
    }, [dispatch, user.id])
    // console.log(inOrder)


  return (
    
    <div className="cart-page">
      <h1>Your Cart</h1>
      {
        loading && <Loader />
      }
      {
        items.length === 0 && <h2>Your cart is empty</h2>
      }
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.images[0]} alt={item.name} />
          <div className="item-details">
            <p>{item.name}</p>
            <p>{`$${item.price}`}</p>
            <div className="quantity">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={()=>handleCartRemove(item.id+user.id)}>Remove</button>
        </div>
      ))}
      <div className="total-price">
        <p>Total Price:</p>
        <p>{`$${totalPrice.toFixed(2)}`}</p>
      </div>
      <div>
      {/* {checkout ? (
        <Paypal />
      ) : (
        <button
          onClick={() => {
            setCheckout(true);
          }}
        >
          Checkout
        </button>
      )} */}
         
        <div/>
       
        <div style={{marginTop:'20px'}}  className='payment'>
       
        {/* <form onSubmit={()=>handleSend( items.quantity, items.id)}>
            {
              checkout ? (

                <p style={{color:'#17516a', width:'40%', }}>
                       Product has been added to products
                </p>
              ) : (
                <button >
                  Order
                </button>
              )

            }
            {
              inOrder && (
                <p style={{color:'#17516a', width:'40%', }}>
                        You have already placed an order
                </p>
              )
            }
       </form> */}
       {
          postloading ? (
            <button style={{marginTop:'20px'}} className='btn btn-primary'>Loading...</button>

          ):(
            <button onClick={handleSubmit} style={{marginTop:'20px'}} className='btn btn-primary'>Order</button>
          )
       }

       {/* <button onClick={handleSubmit} style={{marginTop:'20px'}} className='btn btn-primary'>Order</button> */}

         
        </div>
      {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} 
            createOrder={(data, actions) => {
              
              return actions.order.create({
                  purchase_units: [
                      {
                          amount: {
                              value: 20,
                          },
                      },
                  ],
              });
          }}
          onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  alert(`Transaction completed by ${name}`);
              });
          }}/>
        </PayPalScriptProvider> */}
      </div>
    </div>
  )
}

export default Cart