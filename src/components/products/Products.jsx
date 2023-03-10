import React, { useEffect, useState } from 'react'
import './products.css'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Wishlist from './Wishlist'
import Loader from '../loader/Loader'
import CartButton from './CartButton'
const Products = () => {
  //get id of product
  const { id } = useParams()
  const user = useSelector(state => state.auth.user)
  const dispach = useDispatch()
  const [products, setProducts] = useState([])
  const [loading , setLoading] = useState(false)
  //fetxh from redux store
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:9000/products/`)
      setProducts(data)
      .finally(() => setLoading(false))
    }
    fetchProducts()
    .finally(() => setLoading(false))
  }, [])



  return (
    <div>
<h2>Shop Store</h2>
{
  loading ?<Loader/> : (
    <section className="products">
    
    {
      products.map(product => (
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
            <CartButton productId={product.id}  name={product.name} price={product.price} description={product.description} image={product.image} />
          </div>
          <div className='favorite'>
            {/* DISPLAY WISHLIST ID */}
            <Wishlist productId={product.id}  name={product.name} price={product.price} description={product.description} image={product.image} />
          </div>
        </div>
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