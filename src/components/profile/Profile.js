import React, { useState } from 'react';
import MyOrders from './tabs/MyOrders';
import './profile.css';
import MyInbox from './tabs/MyInbox';
import MyWishList from './tabs/MyWishList';
import MyPosts from './tabs/MyPosts';
import { useSelector } from 'react-redux';

const details = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '55-512-834',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
};


const Profile = () => {
    const user = useSelector(state => state.auth.you)
    const [orders, setOrders] = useState(true)
    const [inbox, setInbox] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [posts, setPosts] = useState(false)



    const handleOrders = () => {
        setOrders(true)
        setInbox(false)
        setWishlist(false)
        setPosts(false)
    }

    const handleInbox = () => {
        setOrders(false)
        setInbox(true)
        setWishlist(false)
        setPosts(false)
    }

    const handleWishList = () => {
        setOrders(false)
        setInbox(false)
        setWishlist(true)
        setPosts(false)
    }

    const handlePosts = () => {
        setOrders(false)
        setInbox(false)
        setWishlist(false)
        setPosts(true)
    }


    return (
        <div className="profile-container">
            <section className='profile-info'>
                <div className="profile-header">Profile</div>
                <div className="profile-details">
                    <div className="profile-avatar">
                        <img src={details.avatar} alt={details.name} />
                    </div>
                    <div className="profile-info">
                        <h3 className="profile-name">{user.firstName} {user.lastName}</h3>
                        <p className="profile-email">{user.email}</p>
                        <p className="profile-phone">{details.phone}</p>
                    </div>
                </div>
            </section>
            <section className='profile-contents'>
                <section className='profile-nav'>
                    <div className={orders ? 'profile-nav-item active' : 'profile-nav-item '} onClick={handleOrders}>
                        <p>My Orders</p>
                    </div>
                    <div className={inbox ? 'profile-nav-item active' : 'profile-nav-item '} onClick={handleInbox}>
                        <p>My Inbox</p>
                    </div>

                    <div className={wishlist ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handleWishList}>
                        <p>My Wishlist</p>
                    </div>

                    <div className={posts ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handlePosts}>
                        <p>My Posts</p>
                    </div>
                </section>

                <section className='selected-tab'>
                    {orders && <MyOrders />}
                    {inbox && <MyInbox />}
                    {wishlist && <MyWishList />}
                    {posts && <MyPosts />}
                </section>
            </section>

        </div>
    );
};

export default Profile;
