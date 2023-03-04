import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BsFlagFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import HomeNavBar from '../HomeNavBar'
import Footer from '../../Footer/Jfooter'
import { useSelector } from 'react-redux'
const Apply = () => {
    const user = useSelector(state => state.auth.user)
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

   //sending bid description to the backend
   const [bid, setBid] = useState({
    name: '',
    job: '',
    description: '',
    employeeId: '',
    jobId: '',
    })

    const handleClick= (e) => {
        e.preventDefault()
        axios.post('https://real-rose-millipede-veil.cyclic.app/bid', {
            name: user.name,
            job: job.title,
            description: bid.description,
            belongToEmployee: user.id,
            belongToJob: job.id,
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        })
    }

    return (
        <>
            <HomeNavBar />

            <div className='application-container'>
                <h2>Project Details</h2>
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
                                <h4 style={{ margin: "0 0 10px 0" }}>Skills and Expertise</h4>
                                <div className='card-skills'>
                                    <p>HTML</p>
                                    <p>CSS</p>
                                </div>
                            </div>

                        </div>
                    </section>
                    <section className='app-right'>

                        <div className='about-client'>
                            <h4>About Client</h4>
                            <p>Payment method not verified</p>

                            <p style={{ textDecoration: 'underline', cursor: "pointer" }}>4 jobs posted</p>
                            <br></br>
                            <p>Member since 2021</p>
                        </div>
                    </section>
                </div>
                <div className='similar-jobs'>
                    <h4>How long will this project take</h4>
                    {/* SELECTOR */}
                    <select name="cars" id="cars">
                        <option value="more than 6 months">More than 6 months</option>
                        <option value="3 to 6 months">3 to 6 months</option>
                        <option value="Less than 3 months">Less than 3 months</option>
                    </select>
                </div>
            <form className='similar-jobs' onSubmit={handleClick} >
                <div >
                    <h4>Cover Letter</h4>
                    <textarea name="cover-letter" value={bid.description} onChange={(e) => setBid({ ...bid, description: e.target.value })} id="cover-letter" cols="30" rows="10"></textarea>
                </div>

                <button className='apply-btn' >Apply</button>
            </form>
            </div>
            <Footer />
        </>

    )
}

export default Apply