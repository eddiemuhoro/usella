import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3, BsFillCartCheckFill, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCart } from '../../react-redux/features/products/productSlice'

const CartButton = ({productId, name, price, description,  image}) => {
  const dispatch = useDispatch()
    const user = useSelector(state => state.auth.you)
    const [cart, setCart] = useState([])
    const [test , setTest] = useState(false)
    const [update , setUpdate] = useState(false)

     

    useEffect(() => {
        dispatch(getCart(productId))
        .then(res => {
          setCart(res.payload)
        }
        )
    }, [dispatch, productId])

      console.log(cart)
    
    
  return (
    <div>
      {/* CHANGE BUTTON IF you'S PRODUCT IS IN WISHLIST */}
     {
        cart.length === 0 || cart[0].userId !== user.id ? (
          <BsCart3 />
        ) : (
          <BsFillCartCheckFill color='blue'  />
        )
     }
        
    </div>
  )
}

export default CartButton