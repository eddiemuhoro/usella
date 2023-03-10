import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import Wishlist from '../../products/Wishlist'

const MyWishList = () => {
  const user = useSelector(state => state.auth.user)
  const [items, setItems] = useState([])
  const [wishlist , setWishlist] = useState([])
  useEffect(() => {
    const fetchWishlist = async () => {
      const { data } = await axios.get(`http://localhost:9000/products/wishlist/user/${user.id}`)
      setItems(data)
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
      <h1>Helo world</h1>
      <section className="products myProducts">
      {
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
      }
      </section>
    </div>
  )
}

export default MyWishList