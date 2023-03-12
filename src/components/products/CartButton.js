import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3, BsFillCartCheckFill, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const CartButton = ({productId, name, price, description,  image}) => {
    const user = useSelector(state => state.auth.user)
    const [cart, setCart] = useState([])

    const handleCart = async () => {
        await axios.post('http://localhost:9000/products/cart', {
         productId: productId,
         userId: user.id,
          name: name,
          price: price,
          description: description,
          image: image,
          quantity: 1

       })
     }
   
     const handleCartRemove = async () => {
       await axios.delete(`https://odd-slip-ant.cyclic.app/products/cart/${productId}`)
        .then(res => {
          console.log(res)
          console.log(res.data)
        }
        )
     }
   

    useEffect(() => {
        const fetchWishlist = async () => {
          const { data } = await axios.get(`https://odd-slip-ant.cyclic.app/products/cart/${productId}`)
          setCart(data)
        }
        fetchWishlist()
      }, [productId])
    
    
  return (
    <div>
      {/* CHANGE BUTTON IF USER'S PRODUCT IS IN WISHLIST */}
      {
        cart.length === 0 || cart[0].userId !== user.id ? (
          <BsCart3 onClick={handleCart}/>
        ) : (
          <BsFillCartCheckFill color='blue' onClick={handleCartRemove} />
        )
      }
        
    </div>
  )
}

export default CartButton