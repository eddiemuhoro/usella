import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

const Wishlist = ({productId, name, price, description, image}) => {
    const user = useSelector(state => state.auth.you)
    //useMemo to prevent infinite loop in useEffect below where dependency is wishlist
    const [wishlist, setWishlist] = useState([])
    //a state that updates the useEffect below
    const [update, setUpdate] = useState(false)

    const [loading , setLoading] = useState(false)

    const handleFavoriteClick = async () => {
      setLoading(true)
        await axios.post('https://odd-slip-ant.cyclic.app/products/wishlist', {
         productId: productId,
         userId: user.id,
          name: name,
          price: price,
          description: description,
          image: image
       })
        .then(res => {
          console.log(res)
          console.log(res.data)
          alert('added to wishlist')
          //set update to true after adding to wishlist
          setUpdate(true)
        }
        )
        toast.success('favorite added')
        setLoading(false)
     }
   
     const handleRemoveFavorite = async () => {
       await axios.delete(`https://odd-slip-ant.cyclic.app/products/wishlist/${productId}`)
        .then(res => {
          console.log(res)
          console.log(res.data)
          alert('removed from wishlist')
          //set update to true after removing from wishlist
          setUpdate(true)
        }
        )
     }

    useEffect(() => {
        const fetchWishlist = async () => {
          const { data } = await axios.get(`https://odd-slip-ant.cyclic.app/products/wishlist/${productId}`)
          setWishlist(data)
          //set update to false after fetching wishlist
          setUpdate(false)
          //use update as dependency to prevent infinite loop
        }
        fetchWishlist()
      }, [update, productId])

     
    
    
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