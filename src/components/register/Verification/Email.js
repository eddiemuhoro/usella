import React from 'react';
import { useSelector } from 'react-redux';
import './email.css';

const Email = () => {
  const email = useSelector(state => state.auth.google)
  return (
    <div className="verification-page">
    <div className="verification-page__card">
      <h1 className="verification-page__title">Check Your Email</h1>
      <p className="verification-page__message">We've sent an email to <span><a style={{color:'#249d98'}} href='https://mail.google.com/' target="_blank" rel="noopener noreferrer">{email.email}</a></span> with instructions on how to verify your account.</p>
      <p className="verification-page__message">If you don't see the email in your inbox, please check your spam folder.</p>
      <p className="verification-page__message">Once you've verified your account, you can log in and start using our platform.</p>
    </div>
  </div>
  );
}

export default Email;
