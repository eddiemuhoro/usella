
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import './myPosts.css'
import { deleteProduct } from '../../../react-redux/features/products/productSlice'

const MyPosts = () => {
  const params = useParams()
  const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const user = useSelector(state => state.auth.user)

    const seller = user.id

    console.log(seller)

  
    //fetxh from redux store
    useEffect(() => {
      const fetchProducts = async () => {
        const { data } = await axios.get(`https://odd-slip-ant.cyclic.app/products/${seller}`)
        setProducts(data)
      }
      fetchProducts()
    }, [])

  //delete product with a confirmation message
  const handleDelete =  (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <div>
         <section className="products myProducts">
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
                    <p><AiFillDelete style={{color:'red'}} onClick={() => handleDelete(product.id, product.name)} /></p>
                  </div>
                  <div className='favorite'>
                    <AiFillEdit style={{color:'4b59f7'}} />
                  </div>
                  
              </div>
            )
          )
        }
      </section>
      <Link style={{margin:'20px'}} to='/post' className='add-post'>Add a product</Link>
    </div>
  )
}

export default MyPosts

