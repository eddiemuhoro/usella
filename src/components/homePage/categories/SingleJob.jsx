import React, { useEffect, useState } from 'react'
import HomeNavBar from '../HomeNavBar'
import {AiOutlineHeart} from 'react-icons/ai'
import {BsFlagFill} from 'react-icons/bs'
import Jfooter from '../../Footer/Jfooter'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const SingleJob = () => {
    const user = useSelector(state => state.auth.user)
    // getting a single job
    const [job, setJob] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        setLoading(true)
        axios.get(`https://real-rose-millipede-veil.cyclic.app/job/${id}`)
            .then((response) => {
                setJob(response.data);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false)
            }
            )
    }, [])
    const scrollToTop = () => {
        window.scrollTo(0, 0)
        //reload page 2 seconds after clicking on the button
        setTimeout(() => {
            window.location.reload()
        }
            , 500)
      }

     

const test = job.employerId
    const [employerJobs, setEmployerJobs] = useState([])
    const [loadingJobs, setLoadingJobs] = useState(false)
    useEffect(() => {
        setLoadingJobs(true)
        axios.request(`https://real-rose-millipede-veil.cyclic.app/employer/${test}/jobs`)
            .then((response) => {
                setEmployerJobs(response.data);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoadingJobs(false)
            }
            )
    }, [test])


    const [fav, setFav] = useState({});

  useEffect(() => {
    // Fetch the current job from the backend when the component mounts
    async function fetchData() {
      await axios.get(`https://real-rose-millipede-veil.cyclic.app/job/favorite/${id}`)
        
        .then((response) => {
            setFav(response.data);
            console.log(response.data);
            }
        )
        .catch((error) => {
            console.log(error);
        }
        )
    }

    fetchData();
  }, []);

  async function toggleFavorite() {
    await axios.put(`https://real-rose-millipede-veil.cyclic.app/job/favorite/${id}`, { isFavorite: !fav.isFavorite , byFreelancer: user.id})
    setFav({ ...fav, isFavorite: !fav.isFavorite });
    console.log(fav);

    // try {

    //   const response = await fetch(`http://localhost:8000/job/favorite/${job.id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ isFavorite: !fav.isFavorite })
    //   });

    //   if (!response.ok) {
    //     throw new Error('Error toggling favorite');
    //   }

    //   setFav({ ...fav, isFavorite: !fav.isFavorite });
    //   console.log(fav);
    // } catch (error) {
    //   console.error(error);
    // }
  }
  return (
    <>
     <HomeNavBar/>
        <div className='application-container'>
            
            <div className='application-wrapper'>
                <section className='app-left'>
                    <div className='single-item'>
                        <div className='category'>
                            <h2>{job.title}</h2>
                        
                            <p>{job.description}</p>
                            <p>Time posted</p>
                            <p>Location</p>
                        </div>
                        <div className='description'>
                            <p>ONLY APPLY IF YOU CAN TURN HTML TO SHOPIFY/FUNNELISH/PAGEFLY/WORDPRESS WITHIN 1-2HOURS

                             Hi check my html files in the job turn to live website within 1-2 hours

                                I want a man from india only.
                            </p>
                        </div>
                        <div className='price'>
                            <p><strong>Ksh 500</strong></p>
                            <p>Fixed-price</p>
                        </div>
                        <div className='expertise'>
                            <h4 style={{margin:"0 0 10px 0"}}>Skills and Expertise</h4>
                            <div className='card-skills'>
                                <p>HTML</p>
                                <p>CSS</p>
                            </div>
                        </div>
                    </div>                        
                </section>
                <section className='app-right'>
                    <div className='apply-btns'>
                        <Link t to={`/job/${job.id}/apply`}><button className='btn btn-primary'>Apply Now</button></Link>
                        {
                            fav.isFavorite ? <button onClick={toggleFavorite} className='btn btn-secondary'><AiOutlineHeart/>Saved</button> : <button onClick={toggleFavorite} className='btn btn-secondary'><AiOutlineHeart/>Save Job</button>
                        }
                        <p><BsFlagFill />Flag as inappropriate</p>
                    </div>
                    <div className='about-client'>
                        <h4>About Client</h4>
                        <p>Payment method not verified</p>

                        <p style={{textDecoration:'underline', cursor:"pointer"}}>4 jobs posted</p>
                        <br></br>
                        <p>Member since 2021</p>
                    </div>
                </section>
            </div>

            <div className='similar-jobs'>
                <h2>Other open jobs by this Client (1)</h2>
                <section className='other-jobs'>
                    {
                       loadingJobs ? <h2>Loading...</h2>: (employerJobs.map((ejob) => {
                            return (
                                <Link key={ejob.id} onClick={scrollToTop} to={`/job/${ejob.id}`} style={{textDecoration:'none', color:'black'}}>
                                    <div className='single-job'>
                                        <div className=''>
                                            <h3>{ejob.title}</h3>
                                            <p>{ejob.description}</p>
                                        </div>
                                        <div className='job-price'>
                                            <p><strong>Ksh 500</strong></p>
                                            <p>Fixed-price</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                        )
                    }
                </section>
            </div>
        </div>
        <Jfooter />
    </>
  )
}

export default SingleJob