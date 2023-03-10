import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Wishlist = ({productId, name, price, description,  image}) => {
    const user = useSelector(state => state.auth.user)
    const [wishlist, setWishlist] = useState([])

    const handleFavoriteClick = async () => {
        await axios.post('http://localhost:9000/products/wishlist', {
         productId: productId,
         userId: user.id,
          name: name,
          price: price,
          description: description,
          image: image

       })
     }
   
     const handleRemoveFavorite = async () => {
       await axios.delete(`http://localhost:9000/products/wishlist/${productId}`)
        .then(res => {
          console.log(res)
          console.log(res.data)
        }
        )
     }
   

    useEffect(() => {
        const fetchWishlist = async () => {
          const { data } = await axios.get(`http://localhost:9000/products/wishlist/${productId}`)
          setWishlist(data)
        }
        fetchWishlist()
      }, [user.id])
    
    
  return (
    <div>
      {/* CHANGE BUTTON IF USER'S PRODUCT IS IN WISHLIST */}
      {
        wishlist.length === 0 || wishlist[0].userId !== user.id ? (
          <BsHeart onClick={handleFavoriteClick}/>
        ) : (
          <BsHeartFill color='red' onClick={handleRemoveFavorite} />
        )
      }
        
    </div>
  )
}

export default Wishlist