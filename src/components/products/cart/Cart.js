import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCart3, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../loader/Loader'
import Wishlist from '../../products/Wishlist'
import './cart.css'
const Cart = () => {
  const user = useSelector(state => state.auth.user)
  const [items, setItems] = useState([])
  const [loading , setLoading] = useState(false)

  const [wishlist , setWishlist] = useState([])
  useEffect(() => {
    setLoading(true)
    const fetchWishlist = async () => {
      const { data } = await axios.get(`http://localhost:9000/products/cart/user/${user.id}`)
      setItems(data)
      setLoading(false)
    }
    fetchWishlist()
  }, [])


 

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      console.log(item)
      return item;
    });
    setItems(updatedItems);
    axios.put(`http://localhost:9000/products/cart/${itemId}`, {quantity: newQuantity})
  };
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <p>{item.name}</p>
            <p>{`$${item.price}`}</p>
            <div className="quantity">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
        </div>
      ))}
      <div className="total-price">
        <p>Total Price:</p>
        <p>{`$${totalPrice.toFixed(2)}`}</p>
      </div>
    </div>
  )
}

export default Cart