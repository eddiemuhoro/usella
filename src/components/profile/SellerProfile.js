import React, { memo, useEffect, useState } from 'react';
import MyOrders from './tabs/MyOrders';
import './profile.css';
import MyInbox from './tabs/MyInbox';
import MyWishList from './tabs/MyWishList';
import MyPosts from './tabs/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { followSeller, getFollowers, getProfile, logout, reset, unfollowSeller } from '../../react-redux/features/auth/authSlice';
import Popup from 'reactjs-popup';
import ProfileEditor from './EditProfile';
import axios from 'axios';
import { BsForward } from 'react-icons/bs';
import { getProductByUser } from '../../react-redux/features/products/productSlice';
import { toast } from 'react-toastify';
import apiUrl from '../../react-redux/myApi';



const SellerProfile = ({name, sellerId, sellerProducts}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.you)
    const [products, setProducts] = useState([])
    const [posts, setPosts] = useState(false)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const userId = user.id
    let isFollowing = false
    
//profile details
    useEffect(() => {   
       dispatch(getProfile(sellerId))
         .then(res => {
                setProfile(res.payload)
                setLoading(true)
            }
        )
    }, [loading, dispatch, sellerId])

    //GET SELLER PRODUCTS

  useEffect(() => {
    setLoading(true)
    dispatch(getProductByUser(sellerId))
      .then(res => {
        setProducts(res.payload)
        setLoading(false)
      })
  }, [ dispatch, sellerId])

  
    const handlePosts = () => {
        setPosts(true)
    }

    const followUser = ()=> {
      const followData = {
        followerId : user.id,
        followingId: sellerId
      }
      dispatch(followSeller(followData))
      .then(res => {
        toast.success(`You are now following ${name}`)  
        setUpdate(!update)      
      }
      )
      .catch(error => {
        toast.error('already following')
      })
    }

    const unFollow = ()=> {
      const followData = {
        followerId : user.id,
        followingId: sellerId
      }
      dispatch(unfollowSeller(followData))
      .then(res => {
        toast.success(`unfollowed ${name}`)  
        setUpdate(!update)      
      }
      )
      .catch(error => {
        toast.error('already following')
      })
    }


      //FETCH FOLLOWERS
      const [followers, setFollowers] = useState([])
      useEffect(()=>{
        axios.get(`${apiUrl}users/followers/${sellerId}`)
        .then(res => {
          setFollowers(res.data)
          console.log(res.data);
        }
        )
      },[dispatch, sellerId,loading, isFollowing,update])

 //a function to check if user is following seller

 if (followers.followers) {
  isFollowing = followers.followers.some(follower => follower.id === userId)


 }
 console.log(isFollowing);

      //if user is following seller, show following button
      const [following, setFollowing] = useState(false)
      const [action, setAction] = useState(false)

      //set action to true after 2 seconds
       
      useEffect(()=>{
          axios.get(`${apiUrl}users/following/${sellerId}`)
          .then(res => {
            setFollowing(res.data)
          }
        )
      }
      ,[dispatch, sellerId, action])
      // console.log(following)


    return (
        <Popup trigger={<h4>Other products posted by <span style={{cursor:'pointer'}}> {name}</span>  </h4>} modal nested  closeOnDocumentClick={false}>
            {(close) => (
            <div className="profile-container seller" style={{backgroundColor:'black'}}>
                  <section className='profile-info'>
                    <div className="profile-details seller">
                      <div className="profile-avatar seller">
                        <img src={!profile.profilePic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profilePic} alt={user.firstName} />
                        <div className='profile-header phone'>
                          <h3 className="profile-name" style={{marginRight:'20px'}} >{name}</h3>
                          <div className='seller-btn'>

                                <button onClick={followUser}>Follow</button>

                            <button>Message</button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-info">
                        <div className='profile-header desktop'>
                          <h3 className="profile-name" style={{marginRight:'20px'}}>{name}</h3>
                          <div className='seller-btn'>

                          {
                            isFollowing ? (
                              <button onClick={unFollow}>Unfollow</button>
                            ) : (
                              <button onClick={followUser}>Follow</button>
                            )
                          }
                          
                            {/* <button  onClick={followUser}>Follow</button> */}
                       
                            <button>Message</button>
                          </div>
                        </div>
                        <div className='seller-followers'>

                          <p className='followers'> <strong style={{ color: 'white' }}> {followers.count}</strong> followers </p>
                          <p className='following'><strong style={{ color: 'white' }}> {following.count}</strong> following  </p>
                        </div>
                      
                        <p className="profile-email">{profile.bio}</p>
                        <p className='profile-location'>{profile.location}</p>
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
                  <section className="products myProducts">
                    {
                      !sellerProducts ? (
                        <div className="no-products">
                          <h1>{name} has no products yet</h1>
                          {/* <Link to='/post' style={{ textDecoration: 'underline' }}>Add a product</Link> */}
                        </div>
                      ) : (

                        sellerProducts.map(product => (
                          <div className="product" style={{ height: '300px' }}>
                            <Link key={product.id} to={`/products/${product.id}`} onClick={close}  >
                            <div className="product-img">
                              {loading ? (<img src={product.images[0]} alt="product" />
                              ) : (<img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className='product-image' />
                              )}
                            </div>
                            <div className="product-info">
                              <p className="info-name">{product.name}</p>
                              {/* <p className="info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p> */}

                            </div>
                            </Link>
                            <div className="product-btns">
                              <p className="info-price">${product.price}</p>
                            </div>
                            <div className='favorite'>
                            </div>

                          </div>
                        )
                        )

                      )
                    }

                  </section>
                <AiOutlineClose className="close-btn" onClick={close}  size={25} />

            </div>
            )}
        </Popup>
    );
};

export default memo(SellerProfile)
