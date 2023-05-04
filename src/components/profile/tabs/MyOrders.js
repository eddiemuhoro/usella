
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './myOrders.css'
import Loader from '../../loader/Loader'
import { cancelOrder, deleteOrder, getOrderByUser, getToken } from '../../../react-redux/features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import {GiCancel} from 'react-icons/gi'
import {ImCancelCircle} from 'react-icons/im'
import { toast } from 'react-toastify'
import apiUrl from '../../../react-redux/myApi'
const MyOrders = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.you)

    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    //fetxh from redux store
    useEffect(() => {
      setLoading(true)
      dispatch (getOrderByUser(user.id))
      .then(res => {
        setProducts(res.payload)
        setLoading(false)
        setUpdate(false)
      }
      )
    }, [update, dispatch, user.id])
 


    const handleOrderCancel = (id)=>{
      dispatch(cancelOrder(id))
      toast.success('order canceled')
      const newOrders = products.filter((order)=> order.id !== id)
      setProducts(newOrders)
      // setUpdate(true)
    }

    const handleBuy= (id, amount) =>{

      const  phone= '796250443'

    dispatch(getToken)
    .then(res => {
      console.log(res.data.token)
      //route to get stk push using token and put request
      axios.post(`${apiUrl}order/pay/${amount}/${id}`, {phone}, {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })    
    }
    )
    }


//wel w know
//waiting
  
  return (
    <div>
         <section className="orders ">

          {
           loading ? (
              <div className="loader">
                <Loader />
              </div>

            ) : 
          
            (
              products.map((order, index) => (
                <div className="order" key={index}>
                  <section className='left'>

                    <div className="order-img">
                      <img src={order.product.images[0]} alt="product" />
                    </div>
                    <div className="order-info">
                      <p className="order-name">{order.product.name}</p>
                      <p className="order-price">Ksh {order.product.price}</p>

                    </div>
                  </section>
                  <section className='right'>
                    <div className="order-quantity">
                      <p className="order-quantity">Quantity: {order.quantity}</p>
                    </div>
                    <div className="shipped">
                      <p className="shipped">Delivery in 5 hours</p>
                      <a style={{textDecoration:'underline'}} href='https://goo.gl/maps/QG262ZmkzkVFFf5y9' target='_blank' rel="noreferrer">{order.delivery}</a>
                    </div>
                  </section>

                  <div className='order-time'>
                    <p className="order-time">From <span>{order.product.seller_name}</span></p>
                  </div>

                  <div title='cancel order' className='cancel-myorder'>
                    <button style={{fontSize:'12px', padding:'3px', marginRight:'10px'}} onClick={()=>handleBuy(order.id, order.product.price)}>Buy</button>
                    <ImCancelCircle onClick={()=>handleOrderCancel(order.id)} />
                  </div>
                
                </div>
               )
              )
            )
          }
          {
             products.length === 0 && 
              <div className="no-products">
                <h1>You have no orders</h1>
                <Link  to='/products' style={{textDecoration:'underline'}}>Go to products</Link>
              </div>
          }
      

            </section>
    </div>
  )
}

export default MyOrders

