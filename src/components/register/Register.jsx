import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { toast, ToastContainer } from 'react-toastify'
import { register, reset } from '../../react-redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const { you, isError, isLoading, isSuccess, message }= useSelector (
    (state)=> state.auth
  )

  useEffect((dispatch)=>{
    if(isSuccess || you){
      toast.success(message)
      navigate('/')
      window.location.reload()
      dispatch(reset())
    }
    if(isError){
      alert('Enter valid credentials👀 ')
      navigate('/')
      window.location.reload()
      dispatch(reset())
    }
  }, [you, isSuccess, isError , message, navigate])


  const handleSubmit = (e) => {
    
    e.preventDefault()

    if ((password !== confirmPassword )) {
      toast.error("🦄 Passwords don't match!");
 
    } else if((!firstName || !email || !password || !confirmPassword)){
      toast.error("🦄 Please fill all the fields!");
    }else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
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
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to='/'>Login</Link></p>

    </div>
  );
}

export default Register;
