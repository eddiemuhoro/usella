import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../../react-redux/features/auth/authSlice';
import './register.css';

function Login() {
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
  const { user, isError, isLoading, isSuccess, message }= useSelector (
    (state)=> state.auth
  )


  useEffect((dispatch)=>{
    if(isSuccess || user){
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
  }, [user, isSuccess, isError , message, navigate])



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
            minLength="6"
            required
          />
        </div>
        
        <button type="submit">Register</button>
      </form>
      <p>Don't have an account? <Link to='/register'>Register</Link></p>
    </div>
  );
}

export default Login;
