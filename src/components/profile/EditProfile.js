import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Popup from "reactjs-popup";
import "./profile.css";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import axios from "axios";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { db } from "../../lib/init-firebase";
import { addDoc, collection } from 'firebase/firestore'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function ProfileEditor({dp, pNo, profBio, id}) {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.you)
  const [bio, setBio] = useState(profBio);
  const [isFile, setFile] = useState(dp);
const [select , setSelect] = useState(dp)
  const [phone , setPhone] = useState(pNo);
  const [loading , setLoading] = useState(false);




  //generate a cloudinary image

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleImageAsFile=e=>{
    setFile(e.target.files[0])
    setSelect(URL.createObjectURL(e.target.files[0]))
}
 //insert to firebase-----------------------
 const handleSubmit= async(e) => {
  setLoading(true)
  try {
    e.preventDefault();
    let file = isFile;

      //storage for images
    const storage= getStorage();
    var storagePath = 'products/'+file.name;;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //progress of uploads
    uploadTask.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is '+ progress + '% done');
    },
    (error) => {
      console.log(error)
    },
    ()=>{
      //get the image url 
      getDownloadURL(uploadTask.snapshot.ref)
      .then((imageUrl)=>{
        console.log('file available at' , imageUrl);
        var imageUrl = imageUrl;
        const resourceCollectionRef = collection(db, 'beauty')
        //add values to firestore firebase
        
         addDoc(resourceCollectionRef, {imageUrl})
         setFile(null);
         const profileData = {
          bio,
          profilePic: imageUrl,
          phone,
          userId: user.id
        }
        console.log(profileData);
        axios.put(`https://odd-slip-ant.cyclic.app/profile/${id}`, profileData)
       setLoading(false)
       
        //navigate to profile page
        navigate('/profile')
        setInterval(() => {
          window.location.reload()
        }
        , 1000)
      })
    }
    )
    alert('success')
  } catch (error) {
    throw error
  }
}


 

  return (
    <Popup trigger={<AiOutlineEdit title='edit' />} modal nested  closeOnDocumentClick={false}>
      {(close) => (
         <div className="popup-overlay">
                 <div className="popup">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="image-section">
                            <div className="profile-avatar">
                                <img src={select} alt="profile"className="current-image" />
                            </div>
                            
                            <div>
                                <label htmlFor="image-upload" className="change-image-btn">
                                    Change Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={handleImageAsFile}
                                />
                              </div>
                           
                     </div>

                        <label htmlFor="bio">Bio:</label>
                        <textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        defaultValue={profBio}
                        onChange={handleBioChange}
                        />

                        <label htmlFor="phone">Phone:</label>
                        <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={pNo}
                        onChange={handlePhoneChange}
                        />
                      
                        <button type="submit">{loading ? 'saving...' : 'Save'}</button>
                    </form>
                    <AiOutlineClose className="close-btn" onClick={close}  size={25} />
                 </div>
        </div>
      )}
    </Popup>
  );
}

export default ProfileEditor;

//https://firebasestorage.googleapis.com/v0/b/fir-api-7421d.appspot.com/o/products%2Fundefined?alt=media&token=29de25ef-1281-40d5-b891-9ece9422f763
//https://firebasestorage.googleapis.com/v0/b/fir-api-7421d.appspot.com/o/products%2Freact-redux-overview.png?alt=media&token=7fbfa759-ad1e-4d4a-a4dd-92294dd9a295