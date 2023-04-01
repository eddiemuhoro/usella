import React, { useEffect, useState } from 'react';
import MyOrders from './tabs/MyOrders';
import './profile.css';
import MyInbox from './tabs/MyInbox';
import MyWishList from './tabs/MyWishList';
import MyPosts from './tabs/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout, AiOutlineEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { getFollowers, getProfile, logout, reset } from '../../react-redux/features/auth/authSlice';
import Popup from 'reactjs-popup';
import ProfileEditor from './EditProfile';
import axios from 'axios';
import { BsForward } from 'react-icons/bs';

const details = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '55-512-834',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
};



const Profile = () => {
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
       dispatch(getProfile(user.id))
         .then(res => {
                //array [0] because we are getting an array of objects
                setProfile(res.payload)
            }
        )
    }, [dispatch, user.id])

    console.log(profile)




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

    const handleLogout = () => {
        //confirm logout
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(logout())
            dispatch(reset())
            navigate('/login')
        }        
    }

    const slides = [
        {
          id: 1,
          title: 'Add bio',
          description: 'Add your bio to your profile ',
        },
        {
          id: 2,
          title: 'Add your phone number',
          description: 'Add your phone number to your profile',
        },
       
      ];
    

    const [currentSlide, setCurrentSlide] = useState(0)


    const handleNextClick = () => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }else if(currentSlide === slides.length - 1){
          setCurrentSlide(0)
    
        }
      };

      //FETCH FOLLOWERS
      const [followers, serFollowers] = useState([])
      useEffect(()=>{
        dispatch(getFollowers(user.id))
        .then(res => {
            serFollowers(res.payload)
        })
     
      },[dispatch, user.id])

      const currentSlideStyle = {
        transform: `translateX(-${currentSlide * 100}%)`,
    
      };

    return (
        <div className="profile-container">
            <section className='profile-info'>
                <div className="profile-header">Profile</div>
                <div className="profile-details">
                    <div className="profile-avatar">
                        <img src={ !profile.profilePic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profilePic} alt={user.firstName} />
                    </div>
                    <div className="profile-info">
                        <h3 className="profile-name">{profile.name}</h3>
                        <p className="profile-email">{profile.email}</p>
                        <p className="profile-phone">{profile.phone}</p> 
                        <p className='profile-location'>Location: {profile.location}</p>
                        <p className='followers'>followers: {followers.length} </p>         
                    </div>

                    <div className= 'logout-btn'>
                        <AiOutlineLogout title='logout' onClick={handleLogout} />
                    </div>

                    <div className= 'edit-btn'>
                       <ProfileEditor userName={profile.name} profileLocation={profile.location} pNo={profile.phone} profBio={profile.bio}  dp={!profile.profilePic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profilePic}  id={profile.id} />
                    </div> 
                </div>

                {
                     !profile.bio ?
                    (
                        <div className='add-items'>
                    <div className="slider">
                        <div className="slider-wrapper" style={currentSlideStyle}>
                            {slides.map((slide, index) => (
                                <div key={index} className="slider-slide">
                                    <p>{slide.description}</p>

                                </div>
                            ))}
                        </div>
                        <button
                            className="slider-next"
                            onClick={handleNextClick}
                        >
                            <BsForward />
                        </button>
                    </div>
                </div>
                    ):
                    (
                        <p className="profile-bio">{profile.bio}</p>
                    )
                }

                

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
