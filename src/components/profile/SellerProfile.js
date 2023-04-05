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
import { getProductByUser } from '../../react-redux/features/products/productSlice';



const SellerProfile = ({name, sellerId, sellerProducts}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.you)
    const [products, setProducts] = useState([])
    const [posts, setPosts] = useState(false)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    
//profile details
    useEffect(() => {   
       dispatch(getProfile(sellerId))
         .then(res => {
                //array [0] because we are getting an array of objects
                setProfile(res.payload)
                setLoading(true)
            }
        )
    }, [loading, dispatch, sellerId])

    console.log(profile)

    //GET SELLER'S PRODUCTS
      //fetxh from redux store
  useEffect(() => {
    setLoading(true)
    dispatch(getProductByUser(sellerId))
      .then(res => {
        setProducts(res.payload)
        setLoading(false)
      })

  }, [ dispatch, sellerId])

  console.log(products)

  
    const handlePosts = () => {
      
        setPosts(true)
    }

      //FETCH FOLLOWERS
      const [followers, setFollowers] = useState([])
      useEffect(()=>{
        axios.get(`https://usella.up.railway.app/users/followers/${sellerId}`)
        .then(res => {
          setFollowers(res.data)
        }
        )
     
      },[dispatch, sellerId])

      //if user is following seller, show following button
      const [following, setFollowing] = useState(false)
      useEffect(()=>{
        axios.get(`https://usella.up.railway.app/users/following/${sellerId}`)
        .then(res => {
          setFollowing(res.data)
        }
        )
     
      }
      ,[dispatch, sellerId])

      console.log(following)

      

   

    return (
        <Popup trigger={<h4>Other products posted by <span> {name}</span>  </h4>} modal nested  closeOnDocumentClick={false}>
            {(close) => (
            <div className="profile-container seller" style={{backgroundColor:'black'}}>
                  <section className='profile-info'>

                    <div className="profile-details seller">
                      <div className="profile-avatar seller">
                        <img src={!profile.profilePic ? 'https://www.w3schools.com/howto/img_avatar.png' : profile.profilePic} alt={user.firstName} />
                        <div className='profile-header phone'>
                          <h3 className="profile-name">{profile.name}</h3>
                          <div className='seller-btn'>
                            <button >Follower</button>
                            <button>Message</button>
                          </div>
                        </div>
                      </div>
                      <div className="profile-info">
                        <div className='profile-header desktop'>
                          <h3 className="profile-name">{name}</h3>
                          <div className='seller-btn'>
                            <button>Following</button>
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
                          <h1>You have no products</h1>
                          <Link to='/post' style={{ textDecoration: 'underline' }}>Add a product</Link>
                        </div>
                      ) : (

                        sellerProducts.map(product => (
                          <div className="product" style={{ height: '300px' }}>

                            <div className="product-img">
                              {loading ? (<img src={product.images[0]} alt="product" />
                              ) : (<img src='https://media.istockphoto.com/id/1138824305/vector/loading-icon-on-black.jpg?s=170667a&w=0&k=20&c=5TgSExGSoy7SXYcXEKfKCfZW-qFXsTaZRHcBF99WMLM=' alt='loading' className='product-image' />
                              )}
                            </div>
                            <div className="product-info">
                              <p className="info-name">{product.name}</p>
                              {/* <p className="info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p> */}

                            </div>
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

export default SellerProfile;
