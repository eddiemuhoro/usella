import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { toast, ToastContainer } from 'react-toastify'
import { register, reset } from '../../react-redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
function Register() {
  let userObject = {}
  const [user, setUser] = useState({});
  const [bio, setBio] = useState('')
  // 719668832114-ieqsiradroo9m4tb6584acqhcr80siet.apps.googleusercontent.com
  //published key
  //117852649508-n6pl5fek07k9co4pfqpihgtq7rotv09d.apps.googleusercontent.com
  // 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

  //if phone is not inserted, handleCallbackResponse will not be called



  const handleCallbackResponse = (response) => {
    console.log("response", response.credential)
    userObject = jwt_decode(response.credential)
    console.log("userObject", userObject)
    setUser(userObject)
    //console log name and email
    console.log(userObject.name)
    //store userObject's name and email in local storage
    localStorage.setItem('google', JSON.stringify(userObject))
  //if phone is not inserted, handleCallbackResponse will not be called
  if(phone){

    handleRegister()
  }else{
    alert('Please enter your phone number')
  }
  }



  //117852649508-t13ajvt9etu46132uenkvuvver29vpol.apps.googleusercontent.com


  //GOOGLE REGISTARTION
  useEffect(() => {
    /* global google */    
    google.accounts.id.initialize({
      client_id: '719668832114-ieqsiradroo9m4tb6584acqhcr80siet.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        width: 250,
        height: 50,
        longtitle: true,
        type: 'standard',
        text: 'standard',
      }
    );

    google.accounts.id.prompt()
  }, [])



  //DATA INITIALIZATION
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const { name, email, password, confirmPassword, phone } = formData;

  const { you, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  )


  //REGESTRATION BY GOOGLE 
  const handleRegister = () => {

    const userData = {
      name: userObject.given_name,
      email: userObject.email,
      password: userObject.sub,
      phone: formData.phone,
    }
    console.log(userData)
    dispatch(register(userData))
  }


  console.log(phone);

  useEffect((dispatch) => {
    if (isSuccess || you) {
      toast.success(message)
      navigate('/email')
      window.location.reload()
      dispatch(reset())

    }
    if (isError) {
      alert('Enter valid credentials👀 ')
      navigate('/login')
      window.location.reload()
      dispatch(reset())
    }
  }, [you, isSuccess, isError, message, navigate])


  const handleSubmit = (e) => {

    e.preventDefault()

    if ((password !== confirmPassword)) {
      toast.error("🦄 Passwords don't match!");

    } else if ((!name || !email || !password || !confirmPassword)) {
      toast.error("🦄 Please fill all the fields!");
    } else {
      const userData = {
        name,
        email,
        password,
        phone,
      }
      console.log(userData)
      dispatch(register(userData))
    }
    //send data to backend
  };

  return (
    <div className="register-form-container">

      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName"> Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <h4 style={{ margin: '20px' }}> Or</h4>
      <section>
        <h2 style={{ margin: '0 0 20px 0 ' }}>Sign up with Google</h2>
        <div className="form-group">
          <label htmlFor="confirmPassword">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>
        <div id="signInDiv"></div>
      </section>

      <p>Already have an account? <Link to='/login'>Login</Link></p>

    </div>
  );
}

export default Register;
