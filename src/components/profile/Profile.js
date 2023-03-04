import { Add, Flag, Forward } from '@mui/icons-material'
import { Button, Paper } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Bids from './Bids'
import Chat from './Chat'
import MyPosts from './MyPosts'
import './profile.css'
import ProgressBar from './ProgressBar'
//pnpm :(
const Profile = () => {
  const user = useSelector(state => state.auth.user)

  //employee bids
  const [bids, setBids] = useState([])

  useEffect(() => {
    if (user) {
      axios.get(`https://real-rose-millipede-veil.cyclic.app/bid/${user.id}`)
        .then(res => {
          setBids(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }

  }, [])

  const slides = [
    {
      id: 1,
      title: 'Add your skills',
      description: 'Add your skills to your profile to increase your chances of getting hired',
    },
    {
      id: 2,
      title: 'Add your education',
      description: 'Add your education to your profile to increase your chances of getting hired',
    },
    {
      id: 3,
      title: 'Add your experience',
      description: 'Add your experience to your profile to increase your chances of getting hired',
    },
  ];


  const [currentSlide, setCurrentSlide] = useState(0)


  const handleNextClick = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }else if(currentSlide === slides.length - 1){
      setCurrentSlide(0)

    }
  };

  const currentSlideStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,

  };




  const employer = useSelector(state => state.auth.employer)

  return (
    <div className='profile-wrapper'>
      {
        user ? (
          <section className='profile-details'>
        <h2>Account Details</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={((user && user.selectedFile) || (employer && employer.selectedFile)) || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJkC07QFuZvIeLEadibGh6ZkDXshm8PakYYzPMMZywg&s'} alt='profile' />
          <h4 style={{ marginLeft: '5px' }}>{((user && user.name) || (employer && employer.name))}</h4>
        </div>


        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Email</h4>
          <p>{((user && user.email) || (employer && employer.email))}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Phone</h4>
          <p>{((user && user.phone) || (employer && employer.phone)) || 'N/A'}</p>
        </div>

        <section className='profile-complete'>
          <h4>Profile Completeness</h4>
          {/* show progress bar */}
          <div className='progress-bar'>
            <ProgressBar skillLevel={80} />
          </div>

          <div className='add-items'>
            <div className="slider">
              <div className="slider-wrapper" style={currentSlideStyle}>
                {slides.map((slide, index) => (
                  <div key={index} className="slider-slide">
                    <p>{slide.description}</p>
                    <Link>Add to profile</Link>
                  </div>
                ))}
              </div>
              <button
                className="slider-next"
                onClick={handleNextClick}
              >
                <Forward/>
              </button>
            </div>
          </div>

          {/* show balance */}
        </section>

        <section className='profile-balance'>
          <header>
            <h4>Balance</h4>
            <Link to='/' ><Add style={{padding:'2px', border:'1px solid gray', borderRadius:'50%'}}/></Link>

          </header>
          <section className='balance'> 
            <Flag/>           
            <p>0.00</p>
          </section>
          </section>
      </section>
        ):''
      }
      
       <section>
        { employer ? (
          <>
           <MyPosts/>
          </>  
          ):(
            <>
           <h1>My bids</h1>
            {
              bids.map(bid => (
                 <div key={bid.id}>
                  <Paper sx={{position:'relative', padding:'10px', width:{xs: '100%', md:'100%%'}, m:1}} elevation={4}>
                        <h2>{user.name}</h2>
                        <p>job: <span style={{color:'blue'}}>{bid.job}</span></p>
                        <p>{bid.description}</p>
                        {/* <div  className='job-selected'>
                         {bid.isSelected ? <p >selected</p> : <p>Not selected</p>}
                     </div> */}
                     <Chat bid={bid.id} employee={bid.belongToEmployee} />
                  </Paper>
                </div>
              ))
            }
              <h3 style={{height:'50vh', color:'black'}}>Only employers can post jobs<span style={{fontSize:'10px'}}>(Create an employer account to post jobs)</span></h3>
            </>
            )}
        </section>




    </div>
  )
}

export default Profile