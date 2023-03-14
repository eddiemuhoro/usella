import React, { useEffect, useState } from 'react'
import './products.css'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Wishlist from './WishlistButton'
import Loader from '../loader/Loader'
import CartButton from './CartButton'
import Popup from 'reactjs-popup'
import { getProduct } from '../../react-redux/features/products/productSlice'
const Products = () => {
  const navigate = useNavigate()
  //get id of product
  const { id } = useParams()
  const you = useSelector(state => state.auth.you)
  const dispach = useDispatch()
  const [products, setProducts] = useState([])
  const [loading , setLoading] = useState(false)

  
  //fetxh from redux store using dispatch
  useEffect( () => {
    setLoading(true)
     dispach(getProduct())
      .then(res => {
        setProducts(res.payload)
        setLoading(false)
      }
      )
  }, [])

  console.log(products);

  const handleLogin = () => {
   if (window.confirm('You need to login to add to wishlist'))
    navigate('/login') 
  }
    



  return (
    <div>
<h2>Shop Store</h2>
{
  loading ?<Loader/> : (
    <section className="products">
    
    {
      products.map(product => (
        <Link key={product.id} to={`/products/${product.id}`}>
        <div className="product">
          <div className="product-img">
            <img src={product.image} alt="product" />
          </div>
          <div className="product-info">
            <p className="info-name">{product.name}</p>
            <p className="info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
          </div>
          <div className="product-btns">
            <p className="info-price">${product.price}</p>
            {
              you ? (
                <CartButton productId={product.id}  name={product.name} price={product.price} description={product.description} image={product.image} />
              ) : (
                <BsCart3 onClick={handleLogin} />
              )

            }
          </div>
          <div className='favorite'>
            {/* DISPLAY WISHLIST ID */}
            {
              you ? (
                <Wishlist productId={product.id}  name={product.name} price={product.price} description={product.description} image={product.image} />
              ) : (
                <BsHeart onClick={handleLogin} />
              )
                
            }
          </div>
         
        </div>
        </Link>
      )
      )
    }

  </section>
  )
}
     

    </div>
  )
}

export default Products