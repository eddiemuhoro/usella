import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GoVerified } from 'react-icons/go'
import { Link } from 'react-router-dom'
import {BiHelpCircle} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import {useParams } from 'react-router-dom'
const SavedJob = () => {
  const {id} = useParams();
  const user = useSelector(state => state.auth.user)
  console.log(user.id);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonHover = (index) => {
    setActiveButton(index);
  };

  const handleButtonLeave = () => {
    setActiveButton(null);
  };

  //solutiom

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // }
    axios.request(`https://real-rose-millipede-veil.cyclic.app/${user.id}`)
      .then((response) => {
        setJobs(response.data);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false)
      }
      )
  }, [])
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }




  return (
    <>
      {loading ? <h1>Loading...</h1> : jobs.map((job, index) => (
          <div className='job-card'>
            <div className='card-title'>
              <h3>{job.title}</h3>
              <div style={{ display: 'flex' }}>
                
                   <ThumbUpOutlined   style={{ color: '#375d06', border: '1px solid gray', padding: '5px', borderRadius: '50%' }} />
                
                <ThumbDownOutlined style={{ color: '#375d06', border: '1px solid gray', padding: '5px', borderRadius: '50%', marginLeft: "10px" }} />
              </div>
            </div>
            <Link onClick={scrollToTop} to={`/job/${job.id}`} key={job.id}>
            <div className='card-content'>
              <div className='card-content-left'>
                <p>We are seeking a talented React Developer with extensive experience in Typescript and Tailwind CSS to join our development team. The successful candidate will work on an ongoing project to develop new features and maintain existing codebases.</p>
              </div>
            </div>


            <div className='card-skills'>
              {
                job.skills.map((skill) => (
                  <p key={skill}>{skill}</p>
                ))
              }
            </div>

            <div className='payment-verification'>
              <div className='payment'>
                <GoVerified style={{ marginRight: "5px" }} />
                <p> Payment Verified</p>
                <div className="button-container">
                    <p
                      onMouseEnter={() => handleButtonHover(index)}
                      onMouseLeave={handleButtonLeave}
                      className={activeButton === index ? 'active' : ''}
                    >
                      <BiHelpCircle/>
                    </p>
                {activeButton === index && (
                  <div className="tooltip">
                    <p>This client has a verified payment method with Upwork.</p>
                  </div>
                )}
                </div>
              </div>
            </div>
            </Link>
          </div>
      ))
      }

    </>

  )
}

export default SavedJob