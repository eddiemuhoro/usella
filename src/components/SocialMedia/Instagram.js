
import React from 'react'
import './ig.css'
import Imagee from '../myImages/image.png'
import { ArrowBack, NotificationAdd, SkipNext } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const SocialMedia = () => {
  return (
    <>
    <div className='largeScreen'>
        <Button><Link to='/aboutus'>Account not ready yet</Link></Button>
    </div>
    <div className='instagram-wrapper'>
        <section className='profile-name'>
            <div style={{display:'flex', alignItems:'center'}}>
                <ArrowBack/>
                 <h3>jobsy dekut</h3>
            </div>
             <NotificationAdd/> 
        </section>
        <section className='ig-top'>
            <div className='ig-profile'>
                <img src={Imagee} alt='profile' />
            </div>
            <div className='ig-followers'>
                <p className='count'>1</p>
                <p>Post</p>
            </div>
            <div className='ig-followers'>
                <p className='count'>34k </p>
                <p>Followers</p>
            </div>
            <div className='ig-followers'>
                <p className='count'>332</p>
                <p>Following</p>
            </div>
            
        </section>

        <section className='profile-detail'>
            <h4>jobsy dekut</h4>
            <p>Online freelancing platform</p>
        </section>

        <section className='follow-wrapper'>
            <div>
                <div className='ig-follow'>
                    <p>Follow</p>
                    <p>Message</p>
                   
                </div>
            </div>
        </section>

        <section className='follow-wrapper'>
            <div>
                <div className='ig-follow'>
                <NotificationAdd/> 
                   <NotificationAdd/>  
                </div>
                <hr/>
            </div>
        </section>

        <section>
        <div className='ig-profile'>
                <img src={Imagee} alt='profile' />
            </div>
        </section>


    </div>
    </>
  )
}

export default SocialMedia