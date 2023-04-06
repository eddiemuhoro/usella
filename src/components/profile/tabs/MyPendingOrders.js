
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './myOrders.css'
import Loader from '../../loader/Loader'
import { cancelOrder, deleteOrder, getOrderByUser, getPendingOrders } from '../../../react-redux/features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import {GiCancel} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyPendingOrders = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.you)

    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    //fetxh from redux store
    useEffect(() => {
      setLoading(true)
      dispatch (getPendingOrders(user.id))
      .then(res => {
        setProducts(res.payload)
        setLoading(false)
        setUpdate(false)
      }
      )
    }, [update, dispatch, user.id])
    console.log(products)

    const handleOrderCancel = (id)=>{
      dispatch(cancelOrder(id))
      toast.success('order canceled')
      setUpdate(true)
    }


  
  return (
    <div>
         <section className="orders ">
         {products.length === 0 && <p>No prods</p>}

          {
           loading ? (
              <div className="loader">
                <Loader />
              </div>

            ) : 
          
            (
              products.map((product, index) => (
                <div className="order" key={index}>
                  <section className='left'>

                    <div className="order-img">
                      <img src={product.product.images[0]} alt="product" />
                    </div>
                    <div className="order-info">
                      <p className="order-name">{product.product.name}</p>
                      <p className="order-price">Ksh {product.product.price}</p>
                    </div>
                   
                  </section>
                  <section className='right confirmation'>
                    
                        <div className='confirm-orders'>
                            <button className='confirm-order-btn'>Confirm</button>
                            <button className='cancel-order-btn' style={{background:"brown", color:'white'}} onClick={()=>handleOrderCancel(product.id)}>Cancel</button>
                        </div>
                  </section>

                  <div className='order-time'>
                    <p className="order-time"> Order by <span>{product.product.seller_name}</span></p>
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
                <Link to='/products' style={{textDecoration:'underline'}}>Go to products</Link>
              </div>
          }
      

            </section>
    </div>
  )
}

export default MyPendingOrders

