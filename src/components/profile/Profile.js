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
import MyPendingOrders from './tabs/MyPendingOrders';
import { getOrderByUser, getPendingOrders, getProductByUser } from '../../react-redux/features/products/productSlice';

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
    const [pending , setPending] = useState(false)
    const [inbox, setInbox] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [posts, setPosts] = useState(false)
    const [profile, setProfile] = useState({})
    const [update, setUpdate] = useState(false)

//profile details
    useEffect(() => {   
       dispatch(getProfile(user.id))
         .then(res => {
                //array [0] because we are getting an array of objects
                setProfile(res.payload)
                setUpdate(false)
            }
        )
    }, [dispatch, user.id, update])





    const handleOrders = () => {
        setOrders(true)
        setInbox(false)
        setWishlist(false)
        setPosts(false)
        setPending(false)
    }

    const handleInbox = () => {
        setOrders(false)
        setInbox(true)
        setWishlist(false)
        setPosts(false)
        setPending(false)
    }

    const handleWishList = () => {
        setOrders(false)
        setInbox(false)
        setWishlist(true)
        setPosts(false)
        setPending(false)
    }

    const handlePosts = () => {
        setOrders(false)
        setInbox(false)
        setWishlist(false)
        setPosts(true)
        setPending(false)
    }

    const handlePendingOrders = ()=> {
        setOrders(false)
        setInbox(false)
        setWishlist(false)
        setPosts(false)
        setPending(true)
    }

    const [pendingOrders, setPendingOrders] = useState([])
    const [myOrders , setMyOrders] = useState([])
    const [myPosts , setMyPosts] = useState([])
    useEffect(() => {
        dispatch (getPendingOrders(user.id))
        .then(res => {
          setPendingOrders(res.payload)
        }
        )
      }, [ dispatch, user.id])

      //fetch my orders to set count
        useEffect(() => {
            dispatch(getOrderByUser(user.id))
            .then(res => {
                setMyOrders(res.payload)
            })
        }, [dispatch, user.id])

            //fetch my posts to set count
            useEffect(() => {
                dispatch(getProductByUser(user.id))
                .then(res => {
                    setMyPosts(res.payload)
                })
            }, [dispatch, user.id])

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

    const [followers, serFollowers] = useState({ });
    useEffect(() => {
        // dispatch(getFollowers(user.id))
        axios.get(`https://usella.up.railway.app/users/followers/${user.id}`)
            .then(res => {
                serFollowers(res.data)
                console.log(` ${res.data}`);
            })

    }, [dispatch, user.id])

      const currentSlideStyle = {
        transform: `translateX(-${currentSlide * 100}%)`,
    
      };

    return (
        <div className="profile-container">
            <section className='profile-info'>
                <div className="profile-header">Profile</div>
                <div className="profile-details">
                    <div className="profile-avatar">
                        <img src={ !profile.profile_pic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profile_pic} alt={user.firstName} />
                    </div>
                    <div className="profile-info">
                        <h3 className="profile-name">{profile.name}</h3>
                        <p className="profile-email">{profile.email}</p>
                        <p className="profile-phone">{profile.phone}</p> 
                        <p className='followers'>followers: {followers.count} </p>         
                        <p className='profile-location'>Location: {profile.location}</p>
                    </div>

                    <div className= 'logout-btn'>
                        <AiOutlineLogout title='logout' onClick={handleLogout} />
                    </div>

                 
                </div>

                <section style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>

             

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
                    <div className= 'edit-btn'>
                       <ProfileEditor setUpdate={setUpdate} userName={profile.name} profileLocation={profile.location} pNo={profile.phone} profBio={profile.bio}  dp={!profile.profile_pic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profile_pic}  id={profile.id} />
                    </div> 

            </section>
                

            </section>
            <section className='profile-contents'>
                <section className='profile-nav'>
                    <div className={orders ? 'profile-nav-item active' : 'profile-nav-item '} onClick={handleOrders}>
                        <p>My Orders</p>
                        <div className='count'>
                            <p>{myOrders.length}</p>
                        </div>
                    </div>
                    <div className={inbox ? 'profile-nav-item active' : 'profile-nav-item '} onClick={handleInbox}>
                        <p>My Inbox</p>
                        
                    </div>

                    <div className={wishlist ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handleWishList}>
                        <p>My Wishlist</p>
                      
                    </div>

                    <div className={posts ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handlePosts}>
                        <p>My Posts</p>
                        <div className='count'>
                               <p>{myPosts.length}</p>
                        </div>
                    </div>

                    <div className={pending ? 'profile-nav-item active' : 'profile-nav-item'} onClick={handlePendingOrders}>
                        <p>Pending Orders</p>
                        {
                            pendingOrders.length > 0 ? ( 
                                <div className='count'>
                                    <p>{pendingOrders.length}</p>
                                </div>
                            ) : (
                                <div style={{display:'none'}} className='count'>
                                    <p>0</p>
                                </div>
                            )
                        }
                    </div>
                </section>

                <section className='selected-tab'>
                    {orders && <MyOrders />}
                    {inbox && <MyInbox />}
                    {wishlist && <MyWishList />}
                    {posts && <MyPosts />}
                    {pending && <MyPendingOrders />}
                </section>
            </section>

        </div>
    );
};

export default Profile;
