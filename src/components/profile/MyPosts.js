import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteGoal } from '../../react-redux/features/jobs/jobSlice'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {BsThreeDotsVertical} from 'react-icons/bs'
import {IoCloseOutline} from 'react-icons/io5'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { LocationOn } from '@mui/icons-material'
import Popup from 'reactjs-popup'
import TextField from '@mui/material/TextField';
import { Button, FormControl } from '@mui/material';
import Bids from './Bids'
import './profile.css'


const MyPosts = () => {
    const { id }= useParams()
    const [jobs, setJobs] = useState([])
    const [bids , setBids]= useState([])
    const employer = useSelector(state => state.auth.employer)
   
    useEffect(() => {
     
        axios.request(`https://real-rose-millipede-veil.cyclic.app/job/employer/${employer.id}`)
            .then((response) => {
                setJobs(response.data);
                console.log(response.data)
            
            }).catch((error) => {
                console.log(error);
            })
            
    }, [])

 

    const dispatch = useDispatch()
    const navigate = useNavigate()
//DELETE JOB
   
        var deleteJob=(e, id)=>{
            e.preventDefault();
            if(window.confirm('Are you sure you want to delete this job?')){
                dispatch(deleteGoal(id))
                navigate('/myprofile')
             }
        }


    


    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [employerId, setEmployerId] = useState('')
    const [skills, setSkills] = useState([])
 


    const updateTitle =async (e, id)=>{
        e.preventDefault();
        if(!newTitle || !newDescription || !employerId  || !skills){
            return alert('Please fill all fields')
        }
        //
      await axios.put(`https://real-rose-millipede-veil.cyclic.app/job/${id}`, {title: newTitle, description:newDescription, employerId:(employer.id), skills: skills, id:id})
      //set values to empty
        setNewTitle('')
        setNewDescription('')
        setEmployerId('')
        setSkills([])
        //navigate to myprofile
        navigate('/myprofile')

        .then((response)=>{
            console.log(response)
            alert('Job updated')
        }
        ).catch((error)=>{
            console.log(error)
        }
    )
  
 }

 const [showMenu, setShowMenu] = useState(false);


  return (
    <div>
        <>
        <h1>My Posts</h1>
        {jobs.length === 0 && <div style={{height:'60vh'}}><h1>No jobs posted</h1></div>}
        {jobs.map((job, index) => (
                 <Paper key={job.id} sx={{position:'relative', padding:'10px',  width:{xs:'90%', md:'60%'}, m:1}} elevation={4}>
                <div className=''>
                    {showMenu === index && (
                        <div className="menu" style={{position:'absolute', right:'8%', top:'-10px'}}>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <button onClick={(e, id)=> deleteJob(e, job.id)}  className="delete">Delete</button>
                                <Popup trigger={<button >Update</button> } modal>
                                 <div className='bid-popup'>


                                 <FormControl component="form" noValidate autoComplete="off"
                                        sx={{
                                        border:'1px solid grey',
                                        borderRadius:'5px',
                                        padding:'20px',
                                        '& .MuiTextField-root': { m: 1, width: {md:'50ch', lg:'auto'}},
                                        }}>
                                        <h2>JOB POSTING FORM</h2>
                                        <TextField id="outlined-basic" label="job title"  value={newTitle}  onChange={(e)=>{setNewTitle(e.target.value)}} />
                                        <TextField id="filled-basic" label="description" value={newDescription}  onChange={(e)=>{setNewDescription(e.target.value)}} />
                                        <TextField id="filled-basic" label="location"  value={employerId}  onChange={(e)=>{setEmployerId(e.target.value)}} />
                                        <SkillInput onSkillsChange={setSkills} />
                                        <Button variant='contained' onClick={(e)=> updateTitle(e,job.id)}>SUBMIT</Button>
                             </FormControl>

                                 </div>
                             
                             </Popup>

                            </div>
                        </div>
                    )}
                     <div className='job-title'>
                         <h1>{job.title}</h1>
                         {
                                showMenu === index ? ( <p onClick={() => setShowMenu (false)} className="menu-btn"><IoCloseOutline/></p>)
                                : ( <p onClick={() => setShowMenu (index)} className="menu-btn"><BsThreeDotsVertical/></p>)
                         }
                         
                     </div>
                     <main className='job-description'>
                         <p>You will download the template on your server to build the website. You will work with a member of our team that will give you images, text, copy, and add them to the shopify template</p>
                     </main>
                 </div>
                 <Bids job={job.id} />
                 </Paper>
             ))}
        </>
    </div>
  )
}

function SkillInput({ onSkillsChange }) {
    const [skills, setSkills] = useState([]);
  
    function handleChange(event) {
      const newValue = event.target.value;
      const newSkills = newValue.split(',').map(skill => skill.trim());
      setSkills(newSkills);
      onSkillsChange(newSkills);
    }
  
    return (
      <div>
        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="skills"
          placeholder='e.g. "HTML, CSS, JavaScript"'
          value={skills.join(', ')}
          onChange={handleChange}
        />
      </div>
    );
  }

export default MyPosts