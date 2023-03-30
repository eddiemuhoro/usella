import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register, reset } from '../../react-redux/features/auth/authSlice';
import jwt_decode from 'jwt-decode';
import './register.css';

function Login() {

  let userObject = {}
  const [user, setUser] = useState({});
  // 719668832114-ieqsiradroo9m4tb6584acqhcr80siet.apps.googleusercontent.com
  // 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
  const handleCallbackResponse = (response) => {
      console.log("response", response.credential)
       userObject = jwt_decode(response.credential)
      console.log("userObject", userObject)
      setUser(userObject)
      //console log name and email
      console.log(userObject.name)
      //store userObject's name and email in local storage
      localStorage.setItem('google', JSON.stringify(userObject))

      //send request to backend to create a new user with name, email and password
      handleRegister()

  }

  //send request to backend to create a new user with name, email and password
  const handleRegister =  () => {
    const userData = {
     
      email: userObject.email,
      password: userObject.sub,
   
    }
    console.log(userData)
    dispatch(login(userData))

  }


useEffect(()=>{
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
  )
}, [])





  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  const {  email, password } = formData
  const { you, isError, isLoading, isSuccess, message }= useSelector (
    (state)=> state.auth
  )


  useEffect((dispatch)=>{
    if(isSuccess){
      toast.success(message)
      navigate('/')
      window.location.reload()
      dispatch(reset())
    }
    if(isError){
      toast.error(message)
      alert('wrong credentials👀, try again')
      navigate('/login')
      window.location.reload()
      dispatch(reset())
    }
  }, [you, isSuccess, isError , message, navigate])



  const handleSubmit = (e) => {
    e.preventDefault()
  
      const userData = {
        email,
        password,
      }

      dispatch(login(userData))
    // add logic to submit form data to backend
  };

  return (
    <div className="register-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        
       
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
            required
          />
        </div>
        
        <button type="submit">Register</button>
        <br />
        <h4>Sign in with Google</h4>
        <br />
        <div id="signInDiv"></div>
      </form>
      <p>Don't have an account? <Link to='/register'>Register</Link></p>
    </div>
  );
}

export default Login;
