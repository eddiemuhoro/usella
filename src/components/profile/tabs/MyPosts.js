
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import './myPosts.css'
import { deleteProduct, getProductByUser } from '../../../react-redux/features/products/productSlice'

const MyPosts = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.auth.you)

  const seller = user.id

  console.log(seller)

  //state to update the fetched products using useEffect
  const [update, setUpdate] = useState(false)

  //delete product with a confirmation message
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteProduct(id))
        .then(res => {
          setUpdate(true)
        }
        )
    }
  }

  //fetxh from redux store
  useEffect(() => {
    setLoading(true)
    dispatch(getProductByUser(seller))
      .then(res => {
        setProducts(res.payload)
        setUpdate(false)
        setLoading(false)
      })

    // const fetchProducts = async () => {
    //   const { data } = await axios.get(`http://localhost:9000/products/seller/${seller}`)
    //   setProducts(data)
    // }
    // fetchProducts()
  }, [update, dispatch, seller])

  console.log(products)




  return (
    <div>
      <section className="products myProducts">
        {
          !products ? (
            <div className="no-products">
              <h1>You have no products</h1>
              <Link to='/post' style={{ textDecoration: 'underline' }}>Add a product</Link>
            </div>
          ) : (

            products.map(product => (
              <div className="product">
                <div className="product-img">
                  {!loading ? (<img src={product.images[0]} alt="product" />
                  ) : (<img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className='product-image' />
                  )}
                </div>
                <div className="product-info">
                  <p className="info-name">{product.name}</p>
                  <p className="info-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

                </div>
                <div className="product-btns">
                  <p className="info-price">${product.price}</p>
                  <p><AiFillDelete style={{ color: 'red' }} onClick={() => handleDelete(product.id, product.name)} /></p>
                </div>
                <div className='favorite'>
                  <AiFillEdit style={{ color: '4b59f7' }} />
                </div>

              </div>
            )
            )

          )
        }

{
             products.length === 0 && 
              <div className="no-products">
                <h1>You have no posts</h1>
                <Link  to='post' style={{textDecoration:'underline'}}>Sell</Link>
              </div>
          }

      </section>
    </div>
  )
}

export default MyPosts

