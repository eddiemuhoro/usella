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
        <h2>Shop Store</h2>
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