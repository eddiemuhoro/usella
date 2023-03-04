
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { reset, register } from '../../react-redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import './auth.css'
import Spinner from '../Spinner/Spinner'
import FileBase from 'react-file-base64'




const SignUp = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone:'',
    selectedFile:''
 
})
 

  const { name, email, password, password2 } = formData

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
      alert('Enter valid credentials👀 ')
      navigate('/')
      window.location.reload()
      dispatch(reset())
    }
  }, [user, isSuccess, isError , message, navigate])

  
  if(isLoading){
    return <Spinner />
  }
  const onSubmit = (e) => {

    e.preventDefault()

    if ((password !== password2 )) {
      toast.error("🦄 Passwords don't match!");
 
    } else if((!name || !email || !password || !password2)){
      toast.error("🦄 Please fill all the fields!");
    }else {
      const userData = {
        name,
        email,
        password,
        phone:formData.phone,
        selectedFile:formData.selectedFile
      }

      dispatch(register(userData))
    }
  }

  // const onChange = (e) => {
   
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }))
  // }


  return (
    <div className='signup-form'>  
        <SideBar />
    <section className='form'>
    <ToastContainer />
      <div>
      <h1>
       Register
      </h1>
      <p>Please create an account</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
         
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={formData.name}
            placeholder='Enter your name'
            onChange={(e)=> setFormData({...formData, name:e.target.value})}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={formData.email}
            placeholder='Enter your email'
            onChange={(e)=> setFormData({...formData, email:e.target.value})}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={formData.password}
            placeholder='Enter password'
            onChange={(e)=> setFormData({...formData, password:e.target.value})}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password2'
            name='password2'
            value={formData.password2}
            placeholder='Confirm password'
            onChange={(e)=> setFormData({...formData, password2:e.target.value})}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            id='phoneNum'
            name='phoneNum'
            value={formData.phone}
            placeholder='Enter your phone number'
            onChange={(e)=> setFormData({...formData, phone:e.target.value})}
          />
        </div>


          <label>Your image</label>
          <FileBase
            type='file'
            multiple={false}
            onDone={({base64})=> setFormData({...formData, selectedFile:base64})}
          />
      
{/*     */}

        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </form>
    </section>
  </div>
  )
}

export default SignUp