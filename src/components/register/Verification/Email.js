import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './email.css';
import apiUrl from '../../../react-redux/myApi';

const Email = () => {
  const navigate = useNavigate()
//get google from local storage
const google = JSON.parse(localStorage.getItem('google'));
const [code, setCode] = React.useState('');
const [verifying, setVerifying] = useState(false)

if(!google){
  return(
    <p>hello</p>
  )
}
const API_URL = apiUrl;
// send a put request to the backend by passing the email and code as params
const handleVerify = async (e) => {
  e.preventDefault();
  setVerifying(true)
  const response = await axios.put(API_URL + `users/verify/${google.email}/${code}`)
  if(response.data){
    localStorage.removeItem('google');
    localStorage.setItem('you', JSON.stringify(response.data));
    console.log(response.data);

    //navigate to dashboard
    navigate('/')
    //reload
    window.location.reload();
  }
  return response.data;
}

  return (
    <div className="verification-page">
    <div className="verification-page__card">
      <h1 className="verification-page__title">Check Your Email</h1>
      <p className="verification-page__message">We've sent an email to <span><a style={{color:'#249d98'}} href='https://mail.google.com/' target="_blank" rel="noopener noreferrer">{google.email}</a></span> with instructions on how to verify your account.</p>
      <p className="verification-page__message">If you don't see the email in your inbox, please check your spam folder.</p>
      <p className="verification-page__message">Once you've verified your account, you can log in and start using our platform.</p>
      <form onSubmit={handleVerify}>
            <input type="text" placeholder="Enter code" className="verification-page__input" onChange={(e) => setCode(e.target.value)} />
            {
              verifying ? <p>verifying...</p> : <button type="submit" className="verification-page__button">Verify</button>
            }
            
          </form>
    </div>
  </div>
  );
}

export default Email;
 