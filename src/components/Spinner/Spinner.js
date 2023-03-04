import React from 'react'
import { Audio, FidgetSpinner } from 'react-loader-spinner'
import Footer from '../Footer/Jfooter'
import HomeNavBar from '../homePage/HomeNavBar'
import './spinner.css'
const Spinner = () => {
  return (
    <>
    <HomeNavBar/>
    <div className='spin-container'>
        <div className='spin'></div>
    </div>
    <Footer/>
    </>
  )
}

export default Spinner