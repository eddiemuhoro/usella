import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FilledInput, FormControl,  TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { reset, login, loginEmployer } from '../../react-redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './auth.css'
import Spinner from '../Spinner/Spinner'

const LoginEmployer = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const [formData, setFormData] = useState({
 
    email: '',
    password: '',
   
  })

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
  if(isLoading){
    return <><Spinner /></>
  }
  if(isLoading){
    return <h1>Loading...</h1>
  }
  const onSubmit = (e) => {
    e.preventDefault()

  
      const userData = {
        
        email,
        password,
      }

      dispatch(loginEmployer(userData))
    }
  

  const onChange = (e) => {
   
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  return (
    <div className='signup-form'>  
      <ToastContainer />
    
   <div className='login-sidebar'>
            <img src='https://t4.ftcdn.net/jpg/02/60/53/37/360_F_260533737_N1QkCY09mwIy7A0Yph79lkqCl0iB2mvF.jpg' alt='login'/>
      </div> 

    <section className='form'>
      <div>
      <h1>
       Login
      </h1>
      <p>Log in as employer</p>
      </div>
      <form onSubmit={onSubmit}>
      
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>
       
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
          <p>Don't have an account? <Link to='/registerEmployer'>Sign Up</Link></p>
        </div>
      </form>
    </section>
  </div>
  )
}

export default LoginEmployer