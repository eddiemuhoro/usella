import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Display = () => {
    const [jobs,setJobs]= useState([])
    useEffect(() => {
        axios.request('https://jobsy.up.railway.app/job')
        .then((response) =>{
            setJobs(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    })
  return (
    <>
    <h1>Contact Details</h1>
        <div className='contact-wrapper'>
            {jobs.map(job => (
                <div className='contact-item'>
                    <h1>{job.title}</h1>
                    <p>{job.description}</p>
                    <p>{job.employer}</p>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <img src={job.imageurl} alt={job.title}/>
                    <button className='delete-btn'>remove</button>
                </div>
            ))}
        </div>
    </>
  )
}

export default Display