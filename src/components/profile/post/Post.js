import React, {useNavigate, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64'

import { useSelector } from 'react-redux';
import './post.css'
const Post = () => {
    const reader = new window.FileReader();
    const user = useSelector(state => state.auth.user);
    const [imageString, setImageString] = useState('');
    const [post, setPost] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        sellerId: user.id,
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
            sellerId: (user.id),
            price: post.price,
            category: post.category,
            image: imageString,
          }
          console.log(newPost)
          await axios.post('http://localhost:9000/products', newPost)

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
                <div className='form-group'>
                    <label htmlFor='image'>Image</label>
                    <input type='file' name='image' id='image' onChange={handleImageUpload} />
                </div>
                <div className='form-group'>
                    <button type='submit'>Post</button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default Post