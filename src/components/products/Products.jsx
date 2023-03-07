import React, { useEffect, useState } from 'react'
import './products.css'
import { BsCart3, BsHeart } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import axios from 'axios'
const Products = () => {
  const dispach = useDispatch()
  const [products, setProducts] = useState([])
  //fetxh from redux store
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:9000/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])
  console.log(products)





  return (
    <div>

      <section className="products">
        {
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
                <p><BsCart3 /></p>
              </div>
              <div className='favorite'>
                <BsHeart />
              </div>
            </div>
          )
          )

        }

      </section>

    </div>
  )
}

export default Products