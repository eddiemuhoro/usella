import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Loader from '../../loader/Loader'
import Wishlist from '../../products/WishlistButton'


const MyWishList = () => {
  const user = useSelector(state => state.auth.user)
  const [items, setItems] = useState([])
  const [loading , setLoading] = useState(false)

  const [wishlist , setWishlist] = useState([])
  useEffect(() => {
    setLoading(true)
    const fetchWishlist = async () => {
      const { data } = await axios.get(`https://odd-slip-ant.cyclic.app/products/wishlist/user/${user.id}`)
      setItems(data)
      setLoading(false)
    }
    fetchWishlist()
  }, [user.id])

  const handleRemoveFavorite = async (id) => {
    await axios.delete(`http://localhost:9000/products/wishlist/${id}`)
    .then(res => {
      console.log(res)
      console.log(res.data)
    }
    )
   
  }


  return (
    <div>
          {
            loading ? (
              <div className="">
                <Loader />
              </div>
            ) : (
          <section className="products myProducts"> 
          {
            items.length === 0 ? (
              <div className="no-products">
                <h1>You have no products in your wishlist</h1>
                <Link to='/products' style={{textDecoration:'underline'}}>Go to products</Link>
              </div>
            ) : (
              
                items.map(product => (
                  
                  <>
                    {
                        product.userId === user.id ? (
                          <div className="product" key={product.id}>
                            
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
                              {
                                wishlist.length === 0 || wishlist[0].userId !== user.id ? (
                                  <BsHeartFill color='red' onClick={()=>handleRemoveFavorite(product.id)} />
                                ) : (
                                  <BsHeart />
                                )
                              }
                            </div>
                          
                          </div>
                        ) : (
                          <div>
    
                          </div>
                        )                    
                    }
                  </>
                  ))
                
            )
          }             
          </section>
            )
              
        }
     
    </div>
  )
}

export default MyWishList