import React, { useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64'

import { useDispatch, useSelector } from 'react-redux';
import './post.css'
import { createproduct } from '../../../react-redux/features/products/productSlice';
import { useNavigate } from 'react-router-dom';
const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reader = new window.FileReader();
    const user = useSelector(state => state.auth.you);
    const [imageString, setImageString] = useState('');
    const [post, setPost] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 1,
        category: '',
        seller_id: user.id,
        seller_name: 'edwin',
        seller_email: 'eddie@gmail',
        seller_phone: '0788282838',
        location: 'kenya',

    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageString(reader.result);
        };
      };
      
    
    //send post request to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            name: post.name,
            description: post.description,
            seller_id: (user.id),
            price:  parseInt(post.price),
            quantity: parseInt(post.quantity),
            category: post.category,
            seller_name: 'edwin',
            seller_email: 'eddie@gmail',
            seller_phone: '0788282838',
            location: 'kenya',

          }
          console.log(newPost)
          dispatch(createproduct(newPost))
          .then(() => {
            toast.success('Product created successfully');
           
            })
            .catch((err) => {
                toast.error(err.message);
            });

          //navigate to products
         
    }


    
  return (
    <div className='post-container'>
        
        <section className='post-form'>
        <h2>Post your product here</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Product's Name</label>
                    <input type='text' name='title' id='name' value={post.name} onChange={e => setPost({...post, name: e.target.value})} />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea name='description' id='description' cols='30' rows='10' value={post.description} onChange={e => setPost({...post,description:e.target.value})}></textarea>
                </div>
                <div className='form-group'>
                    <label htmlFor='price'>Price</label>
                    <input type='number' name='price' id='price' value={post.price} onChange={e => setPost({...post, price:e.target.value})} />
                    
                </div>

                <div className='form-group'>
                    <label htmlFor='price'>Quantity</label>
                    <input type='number' name='price' id='price' value={post.quantity} onChange={e => setPost({...post, quantity:e.target.value})} />
                    
                </div>

                <div className='form-group'>
                    <label htmlFor='category'>Category</label>
                    <select name='category' id='category' onChange={e => setPost({...post, category:e.target.value})}>
                        <option value=''>Select Category</option>
                        <option value='electronics'>Electronics</option>
                        <option value='fashion'>Fashion</option>
                        <option value='home'>Home</option>
                        <option value='sports'>Sports</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                {/* <div className='form-group'>
                    <label htmlFor='image'>Image</label>
                    <input type='file' name='image' id='image' onChange={handleImageUpload} />
                </div> */}
                <div className='form-group'>
                    <button type='submit'>Post</button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default Post