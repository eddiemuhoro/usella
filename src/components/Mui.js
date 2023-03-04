
import { Button, FormControl, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import HomeNavBar from './homePage/HomeNavBar';

import Popup from 'reactjs-popup';
import {LocationOn, Phone, WhatsApp } from '@mui/icons-material';
import ReactWhatsapp from 'react-whatsapp';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMessage } from '../react-redux/features/jobs/jobSlice';
import { useParams } from 'react-router-dom';
import Greetings from './Greetings';




export default function Mui() {
    const params = useParams()
   

    var token = useSelector(state => state.auth.user.token)
    const dispatch = useDispatch()
    const [postMessage, setpostMessage] = useState({
        description: '',
        name:''
      }
    )

    
    const handleClick= async(id, e, job)=>{
        e.preventDefault();
        const newMessage = {
            description: postMessage.description,
            name: (user.name),
            belongToJob: id,
            employeeId: (user.id),
            job: job
           

        }
      
        dispatch(createMessage(newMessage))
        console.log(newMessage)
        alert('You will know if you have been selected in the next 24 hours')
       
    }
   

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
        axios.request('https://fumbling-amusement-production.up.railway.app/job')
            .then((response) => {
                setJobs(response.data);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false)
            }
        )
    }, [])

 

    const myDate = new Date();
    const hours = myDate.getHours();
    const date = myDate.getDate();
    const myDay = myDate.getDay();
    const myMonth = myDate.getMonth();

    const monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    const month = monthName[myMonth];

    const weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday");
    const day = weekday[myDay];
    if (hours < 12) {
        var greet = 'Good Morning';
    } else if (hours >= 12 && hours <= 17) {
        greet = 'Good Afternoon';
    } else if (hours >= 17 && hours <= 24) {
        greet = 'Good Evening';
    }


    const navigate = useNavigate()


    const user = useSelector(state => state.auth.user)



    return (

        <>
            {user ? (
                <>
                    <HomeNavBar />

                    <Paper style={{ margin: '30px', textAlign: 'left' }}>
                        <Greetings/>
                    </Paper>
                    {loading ? <h1>Loading...</h1> : (
                        <>

                        </>
                    )}
                    <Box
                        sx={{
                            display: 'grid',
                            justifyItems: 'center',
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(1, 1fr)' },
                            color: 'text.primary',
                            '& > :not(style)': {
                                m: 1,
                                width: '70%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            },
                        }}
                    >

                        {jobs.map(job => (
                            <Paper sx={{ position: 'relative', padding: '20px' }} elevation={4}>
                                <div className=''>
                                    <top className='job-title'>
                                        <h1>{job.title}</h1>
                                        <div title='add to favorite'><FavoriteIcon title='fav' /></div>
                                    </top>
                                    <main className='job-description'>
                                        <p>{job.description}</p>
                                    </main>

                                    <div>
                                        <bottom className='job-bottom'>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <LocationOn /><p>{job.location}</p>
                                            </div>
                                            <p>Ksh. {job.salary}</p>
                                        </bottom>
                                        <div className='job-time'>
                                            <div style={{ color: '#1976d2', fontSize: "13px" }}>{moment(job.createdAt).fromNow()}</div>

                                            <Popup trigger={<Button variant='contained'>Bid</Button>} modal>
                                                <div className='bid-popup'>
                                                    <h2>{job.title}</h2>
                                                    
                                             
                                                     <div className='form-input'>
  
                                                        <FormControl component="form" noValidate autoComplete="off"
                                                        sx={{
                                                            border:'1px solid grey',
                                                            borderRadius:'5px',
                                                            padding:'20px',
                                                            '& .MuiTextField-root': { m: 1, width: {md:'50ch', lg:'100%'} , },
                                                        }}>
                                                            <h2>APPLICATION FORM</h2>
                                                            <TextField id="outlined-basic" label="cover letter" value={postMessage.description} variant="filled"
                                                                 onChange={(e) => setpostMessage({ ...postMessage, description: e.target.value })} />
                                                        <Button variant='contained' onClick={(e)=>handleClick(job.id, e, job.title)}>SUBMIT</Button>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </Popup>

                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        ))}
                    </Box>
                </>
            ) : (
                navigate('/login')
            )}

        </>
    );
}