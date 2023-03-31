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
const Cart = (props) => {
  const navigate = useNavigate()
  const [phone , setPhone] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.you)
  const [items, setItems] = useState([])
  const [loading , setLoading] = useState(false)
  const [delivery , setDelivery] = useState('')
  const [update, setUpdate] = useState(false)

  
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
  const handleSubmit = (e) => {
    e.preventDefault()
    //check if phone number is entered
    
    //check if delivery point is selected.if not alert user
    if(delivery === ''){
      alert('Please select a delivery point')
      return
    }
    const data = {
      phone: phone,
      amount: totalPrice
    }
    axios.post(' https://odd-slip-ant.cyclic.app/daraja', data)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    }
)
  
  
    //add purchased items to orders
    //check if delivery point is selected.if not alert user
 

    items.map(item => {
      axios.post('https://odd-slip-ant.cyclic.app/products/orders', {
        userId: user.id,
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        delivery:   delivery,
      })
      .then(res => {
        console.log(res)
        navigate('/profile')
      }
      )
    }
  )

    //set setCheckout to true FOR 10 seconds then set it to false
    setCheckout(true)
    setTimeout(() => {
      setCheckout(false)
    }, 60000);

    //update product quantity to 0 after order is placed
    items.map(item => {
      axios.put(`https://odd-slip-ant.cyclic.app/products/orders/${item.productId}`, {
        quantity: 0
      })
      .then(res => {
        console.log(res)
      }
      )
    }
    )


      // delete purchased items from cart
      // items.map(item => {
      //   dispatch(deleteCart(item.productId))

      // }
      // )
      setTimeout(() => {
        items.map (item => {
          dispatch(deleteCart(item.productId))
        }
        )
      }, 5000);

   
  }


  //CHECKOUT BUTTON

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
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <p>{item.name}</p>
            <p>{`$${item.price}`}</p>
            <div className="quantity">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={()=>handleCartRemove(item.productId)}>Remove</button>
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
          {/*mpesa number input*/}
          
          <form onSubmit={handleSubmit}>
          <h3>Pay via Mpesa</h3>
          <input type='number' placeholder='Enter your phone number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <h3>Choose delivery point</h3>
          <select name="delivery" id="delivery" onChange={(e)=>setDelivery(e.target.value)}>
              <option value="Kiwa Shop" >Choose delivery point</option>
              <option value="Jemwa Shop">Jemwa Shop</option>
              <option value="Kiwa Shop">Kiwa Shop</option>
          </select>
          {/* Money to be paid */}
          <p>Amount to be paid: {totalPrice}</p>
          {/*mpesa pay button*/}
            {
              checkout ? (

                <p style={{color:'#17516a', width:'40%', }}>
                       Check a message on your phone to complete the payment
                </p>
              ) : (
                <button
                 
                >
                  Pay
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
          </form>

         
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