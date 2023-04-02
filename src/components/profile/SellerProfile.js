import React, { useEffect, useState } from 'react';
import MyOrders from './tabs/MyOrders';
import './profile.css';
import MyInbox from './tabs/MyInbox';
import MyWishList from './tabs/MyWishList';
import MyPosts from './tabs/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { getFollowers, getProfile, logout, reset } from '../../react-redux/features/auth/authSlice';
import Popup from 'reactjs-popup';
import ProfileEditor from './EditProfile';
import axios from 'axios';
import { BsForward } from 'react-icons/bs';



const SellerProfile = ({name, sellerId}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.you)
    const [orders, setOrders] = useState(true)
    const [inbox, setInbox] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [posts, setPosts] = useState(false)
    const [profile, setProfile] = useState({})
//profile details
    useEffect(() => {   
       dispatch(getProfile(sellerId))
         .then(res => {
                //array [0] because we are getting an array of objects
                setProfile(res.payload)
            }
        )
    }, [dispatch, sellerId])

    console.log(profile)




  
    const handlePosts = () => {
        setOrders(false)
        setInbox(false)
        setWishlist(false)
        setPosts(true)
    }


 
    


      //FETCH FOLLOWERS
      const [followers, serFollowers] = useState([])
      useEffect(()=>{
        dispatch(getFollowers(sellerId))
        .then(res => {
            serFollowers(res.payload)
        })
     
      },[dispatch, sellerId])

   

    return (
        <Popup trigger={<h4>Other products posted by <span> {name}</span>  </h4>} modal nested  closeOnDocumentClick={false}>
            {(close) => (
            <div className="profile-container seller" style={{backgroundColor:'black'}}>
                <section className='profile-info'>
                   
                    <div className="profile-details seller">
                        <div className="profile-avatar seller">
                            <img src={ !profile.profilePic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profilePic} alt={user.firstName} />
                            <div className='profile-header phone'>
                                <h3 className="profile-name">{profile.name}</h3>
                                <div className='seller-btn'>
                                    <button>Following</button>
                                    <button>Message</button>
                                </div>
                            </div>
                        </div>
                        <div className="profile-info">
                        <div className='profile-header desktop'>
                                <h3 className="profile-name">{profile.name}</h3>
                                <div className='seller-btn'>
                                    <button>Following</button>
                                    <button>Message</button>
                                </div>
                            </div>
                                <div className='seller-followers'>
                                    <p className='followers'> <strong style={{color:'white'}}> {followers.length}</strong> followers </p>
                                    <p className='following'><strong style={{color:'white'}}> 22</strong> following  </p>
                                </div>
                            <p className="profile-email">{profile.email}</p>
                            <p className="profile-phone">{profile.phone}</p> 
                            <p className='profile-location'>Location: {profile.location}</p>
                        </div>
                    </div> 
                </section>
                <section className='profile-contents'>
                    <section className='profile-nav'>
                    
                        <div className={posts ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handlePosts}>
                            <p>{name}'s Posts</p>
                        </div>
                    </section>

                    <section className='selected-tab'>
                    
                    </section>
                </section>
                <AiOutlineClose className="close-btn" onClick={close}  size={25} />

            </div>
            )}
        </Popup>
    );
};

export default SellerProfile;
