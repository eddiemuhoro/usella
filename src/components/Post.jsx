import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createJob } from '../react-redux/features/jobs/jobSlice';
import '../styles/post.css'
import { margin } from '@mui/system';

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


const Post = ({theme}) => {
  const employer = useSelector(state => state.auth.employer)
  console.log(employer.id);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const phone = (employer && employer.phone) || ''
  const [postjob, setpostjob] = useState({
    title: '',
    description: '',
    employerId: '',
    skills: [],
  }
  )

  const [value, setValue] = useState('');
  const [skills, setSkills] = useState([]);

  function handleSkillsChange(newSkills) {
    setSkills(newSkills);
  }


  function handleChange(event) {
    const newValue = event.target.value;
    if (newValue.length >= 30) {
      setValue(newValue);
    } else {
      setValue(newValue);
    }
  }

  const handleClick = async (e) => {


    e.preventDefault();
    const newjob = {
      title: postjob.title,
      description: value,
      employerId: (employer.id),
      skills: skills,
    }

//display skills
    console.log(skills);
    console.log(newjob);

    await axios.post('https://real-rose-millipede-veil.cyclic.app/job',newjob)
    setpostjob({
      title: '',
      description: '',
      employer: '',
      location: '',
      salary:'',

    })
    alert('job posted')

    toast.success('job posted')
    navigate('/myprofile')


  }


  //sdfsf
  return (
    <div className='post-container'>
      <div className='post-wrapper'>
        <section className='top'>
          <h1>Tell us what you need done</h1>
          <p>Contact skilled freelancers within minutes. View profiles, ratings, portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</p>
        </section>

        <section className='form-inputs'>
          <form className={theme === 'white' ? 'form dark' : 'form'} onSubmit={handleClick}>
            <label htmlFor='title'>Choose a name for your project</label> <br />  <br />
            <input type='text' name='title' id='title' placeholder='e.g. Build me a website' value={postjob.title} onChange={(e) => setpostjob({ ...postjob, title: e.target.value })} /><br/> <br/>
            <label htmlFor='description'>Tell us more about your project</label>
            <textarea name='description' id='description' placeholder='Start your project description here' value = {value} onChange={handleChange} />
            {value.length < 30 && (
                <div style={{ color: 'red', margin:'0', textAlign:'right'}}>
                  Please enter at least 30 characters.
                </div>
            )}
            {/* SKILLS REQUIRED */}
            <SkillInput onSkillsChange={handleSkillsChange} />

            <button type='submit' className='post-btn'>Post Job</button>
          </form>
        </section>
      </div>

    </div>
  )
}

export default Post