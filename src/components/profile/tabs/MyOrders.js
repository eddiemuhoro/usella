
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart } from 'react-icons/bs'
import axios from 'axios'
import Wishlist from '../../products/WishlistButton'
import { Link } from 'react-router-dom'
const MyOrders = () => {
    const [products, setProducts] = useState([])
    //fetxh from redux store
    useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get('https://odd-slip-ant.cyclic.app/products')
        setProducts(data)
      }
      fetchProducts()
    }, [])
    console.log(products)
  
  
  return (
    <div>
         <section className="products myProducts">
          {
            products.length === 0 ? (
              <div className="no-products">
                <h1>You have no products in your wishlist</h1>
                <Link to='/products' style={{textDecoration:'underline'}}>Go to products</Link>
              </div>
            ) : (
              products.map(product => (
                <div className="product">
                  <div className="product-img">
                    <img src="https://images.unsplash.com/photo-1676809767144-d24ba6178421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="product" />
                  </div>
                  <div className="product-info">
                    <p className="info-name">{product.name}</p>
                    <p className="info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                  </div>
                  <div className="product-btns">
                    <p className="info-price">${product.price}</p>
                  </div>
                  <div className='favorite'>
                  </div>
                </div>
              )
              )
            )

          }
      

      </section>
    </div>
  )
}

export default MyOrders

