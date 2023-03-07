import React, { useState } from 'react';
import MyOrders from './tabs/MyOrders';
import './profile.css';
import MyInbox from './tabs/MyInbox';
import MyWishList from './tabs/MyWishList';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-1234',
  avatar: 'https://www.w3schools.com/howto/img_avatar.png',
};


const Profile = () => {
   const [orders , setOrders] = useState(true)
    const [inbox , setInbox] = useState(false)
    const [wishlist , setWishlist] = useState(false)

    const handleOrders = () => {
        setOrders(true)
        setInbox(false)
        setWishlist(false)
    }

    const handleInbox = () => {
        setOrders(false)
        setInbox(true)
        setWishlist(false)
    }

    const handleWishList = () => {
        setOrders(false)
        setInbox(false)
        setWishlist(true)
    }


  return (
      <div className="profile-container">
          <div className="profile-header">Profile</div>
          <div className="profile-details">
              <div className="profile-avatar">
                  <img src={user.avatar} alt={user.name} />
              </div>
              <div className="profile-info">
                  <h3 className="profile-name">{user.name}</h3>
                  <p className="profile-email">{user.email}</p>
                  <p className="profile-phone">{user.phone}</p>
              </div>
          </div>
          <section className='profile-nav'>
                <div className={orders ? 'profile-nav-item active' : 'profile-nav-item '} onClick={handleOrders}>
                    <p>My Orders</p>
                </div>
                <div className={inbox? 'profile-nav-item active' : 'profile-nav-item '} onClick={handleInbox}>
                    <p>My Inbox</p>
                </div>
               
                <div className={wishlist ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handleWishList}>
                    <p>My Wishlist</p>
                </div>
          </section>

          <section className='selected-tab'>
              {orders && <MyOrders />}
                {inbox && <MyInbox />}
                {wishlist && <MyWishList />}
          </section>


      </div>
  );
};

export default Profile;
