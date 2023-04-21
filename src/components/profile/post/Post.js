import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/init-firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import {FcNext} from 'react-icons/fc'
import './post.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiUrl from "../../../react-redux/myApi";
const Post = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.you)
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [post, setPost] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 1,
    category: '',
    seller_id: user.id,
    seller_name: user.fisrtName,
    seller_email: user.email,
    //generate a random number for the phone number if the user does not have one
    seller_phone: user.phone || Math.floor(Math.random() * 10000000000),
    location:"Nairobi"
});


  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
  
    const promises = [];

    images.map((image) => {
      setLoading(true);
    const storage= getStorage();
    var storagePath = 'products/'+image.name;;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, image);

      promises.push(uploadTask);
     
         //progress of uploads
    uploadTask.on('state_changed', (snapshot)=>{
      setLoading(true);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is '+ progress + '% done');
    },
    (error) => {
      console.log(error)
    },
    ()=>{
      //get the image url 
      getDownloadURL(uploadTask.snapshot.ref)
      .then((urls)=>{
        setLoading(false);
        console.log('file available at' , urls);
        var urls = urls;
        const resourceCollectionRef = collection(db, 'beauty')
        //add values to firestore firebase
        
         addDoc(resourceCollectionRef, {urls})
         setUrls((prevState) => [...prevState, urls]);
      })
    }
    )
    });

    Promise.all(promises)
      .then(() => toast.success("Images uploaded successfully"), 
        setUrls(urls),
       
      )
      .catch((err) => console.log(err))


      

  };
  console.log("urlData", urls);
  console.log(loading);

  //send the urls to the backend using axios


  // axios.post('http://localhost:9000/products/test', {name: 'kimm',price:99, description: 'nice',category: 'electronics',images:urls})

  //send urls to an axios endpoint
  const handleSend = () => {
    setSending(true);
    console.log(`urls to be sent: ${urls}`);
    const sentData ={name:post.name,price:parseInt(post.price), description: post.description,quantity:parseInt(post.quantity), category: post.category.toUpperCase(), seller_name: user.name, seller_id: user.id, seller_email: user.email, seller_phone: user.phone || Math.floor(Math.random() * 10000000000).toString(), location: "Nairobi",images:urls}
    console.log(sentData);
    axios.post(apiUrl+'product/send', 
        //CONTENT TYPE IS IMPORTANT
      
        sentData
    )
    .then((res)=>{
      console.log(res);
      //navigate to the home page
      navigate('/products')
      setSending(false);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <section className='post-form'>
      <h2 style={{margin:'10px 0'}}>Post your product here</h2>
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
                        <option value='books'>Books</option>
                        <option value='health'>Health</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                <input type="file" multiple onChange={handleChange} />
                <div className="product-upload-btn">
                  {
                    loading ? <button>Uploading</button> : <button onClick={handleUpload}>Upload</button>
                  }
                  <FcNext />
                  <button onClick={handleSend}>Send</button>
        </div>
        <h3>selected images</h3>
        <section className="selected-image">
          {urls.map((url, i) => (
            <div>
              <img
                key={i}

                src={url || "http://via.placeholder.com/300"}
                alt="firebase"
              />
            </div>
          ))}
        </section>
      </section>
      <br />
      {/* <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleSend}>Send</button> */}
      <br />
      {/* {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
      ))} */}
      <br />
    
    </div>
  );
};


export default Post