
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './myOrders.css'
import Loader from '../../loader/Loader'
import { deleteOrder, getOrderByUser } from '../../../react-redux/features/products/productSlice'
import { useDispatch } from 'react-redux'
import {GiCancel} from 'react-icons/gi'
const MyOrders = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    //fetxh from redux store
    useEffect(() => {
      setLoading(true)
      dispatch (getOrderByUser(user.id))
      .then(res => {
        setProducts(res.payload)
        setLoading(false)
      }
      )
      setLoading(false)
    }, [dispatch, user.id])
    console.log(products)


  
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
              products.map(product => (
                <div className="order">
                  <section className='left'>

                    <div className="order-img">
                      <img src="https://images.unsplash.com/photo-1676809767144-d24ba6178421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="product" />
                    </div>
                    <div className="order-info">
                      <p className="order-name">{product.name}</p>
                      <p className="order-price">Ksh {product.price}</p>

                    </div>
                  </section>
                  <section className='right'>
                    <div className="order-quantity">
                      <p className="order-quantity">Quantity: {product.quantity}</p>
                    </div>
                    <div classname="shipped">
                      <p className="shipped">Delivery in 5 hours</p>
                      <Link to ='/products' className="order-btn" style={{textDecoration:"underline"}}>{product.delivery}</Link>
                    </div>
                  </section>
                
                </div>
              )
              )
            )

          }
          {
             products.length === 0 && 
              <div className="no-products">
                <h1>You have no products in your wishlist</h1>
                <Link to='/products' style={{textDecoration:'underline'}}>Go to products</Link>
              </div>
          }
      

      </section>
    </div>
  )
}

export default MyOrders

