import { Box, Paper } from '@mui/material'
import React from 'react'
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Team = () => {
    const team = [
        {
            id:1,
            name:'Erastus Munyao',
            desc:'Student in Dekut pursuing BSC computer science. He is interested in android develoment using flutter',
             position:'Flutter Developer',
            image:'https://firebasestorage.googleapis.com/v0/b/fir-api-7421d.appspot.com/o/test%2Fras.png?alt=media&token=ffb6c130-088b-4c32-b189-3cadc91c910d'
        },
        {
            id:2,
            name:'Joseph Kinyua',
            desc: 'Student in Dekut pursuing BSC computer science. He is interested in android develoment using kotlin',
            position:'Product Manager',
            image:'https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/Jobsy%2FWhatsApp%20Image%202022-12-14%20at%209.45.34%20PM.jpeg?alt=media&token=2b893e44-5e65-4497-93a0-91bf487926b8'
        },
        {
            id:3,
            name:'Edwin Edward',
            desc: 'Student in Dekut pursuing BSC computer science. He is interested in web development using react.js',
            position:'Web Developer',
            image:''
        },
        {
            id:4,
            name:'Carol Muthoni',
            desc: 'Student in Dekut pursuing BSC computer science. She is interested in machine learning using python',
            position:'Secretary',
            image:'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png'
        },
        {
            id:5,
            name:'Emilio Kariuki',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            position:'BackEnd Developer',
            image:'https://firebasestorage.googleapis.com/v0/b/apt-rite-346310.appspot.com/o/Jobsy%2FWhatsApp%20Image%202022-12-12%20at%209.34.37%20PM.jpeg?alt=media&token=2d700b38-1db0-44d1-9498-6013d2178781'
        },
        //https://lh3.googleusercontent.com/_AnNcc366eInYm95PKWW94lCuCqvXrX23vNmzTHYMumXeIePiK4WWebRwMZ8UZiazldQCtNzD562ufVkclpuHDB0zvAfzIQoJeTTYZTSInJqKeApdxKWSCoL1tcxjERRHlb0KwG9FPRb0yMqYqOyz7rX_VUEL9o500USrGZMb4Nt1kRJUGbqW3LDF6qRbC07wwuRP9Ypu-6veGaDpwquP1bUH8U9_pXOzDRGAluqatBc938Vk3wvb1iE9rqZI8MmyE_ZZyKyOdrZVcC3qld5S5Eb-ieozL_KgcepAVJei95JCjA6v1j_e292Mq2RRW4WLqPyNk0-ijTBRuuQ6Ikdq29zL1DrqmrYmXUD45_qYu1D9QV4i9j0WtVvQSms6yZqHm84Ybh5yREHj6CeQcyO9kBOp5rNtV0J1HoHNMvAYyo0XlgxLObkb1XZP83B2IOwv08H8eZHG_dE4pKc3CaJe6QRl2_7tFoDcHK48ZrWFxK55wP42PUU66iuINTfacBC8oRQ_pGGQckV17kwVJ6bUjYgdgfFdQyW4Gu76CidbM2pyGL-MfPyICxTkz4QU3nGdvNqsv06PmWzmQXzaG1MUjUcDW9Xk8-dFlVwMPVH1z7-fp5lJ0Ovj2DA-rtFI0CostOzXvwbo5vukUzMkjFfqCn_j58K1OtjaKuk0kDRiLemQiBbH37StE9kb-Kq5fQ5FBHuXWU9S8J1BXPa6x0UQnz93ADW4OcPND2dok9pNkGEjOu2M0lbsOnGmLWgb7cqSgCRgVlUPKQC_KqVewFDfcPXEcxfvqpQK44q_2PhQ2gKk2SZJs0pqhdkaASu0zylbOzW-GGMxH_vSaAjJIrlv4z1wcU11UCIsgCtejA0cY9UtwmpnKi3QetydHKogVoB3sLC1Fsn_fGYNULoFxW_wRaAyYtv3d2kTDS51j0-1nk_O53cYOH1F1kKDYvX5SyAmug60oomCZCT3ngYoqIf=w779-h766-no?authuser=0
    ]
  return (
    <div>
        <h1 style={
            {paddingLeft:'20px'}
        }>Our Team</h1>
          <Box
            sx={{
                display: 'grid',
                justifyItems: 'center',
                gridTemplateColumns: {xs:'repeat(1, 1fr)', sm:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(5, 1fr)'},
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'text.primary',
                '& > :not(style)': {
                    m: 1,
                    width: '70%',
                    height: 'auto',
                },
            }}
        >
            
            {team.map(member => (
                <Paper sx={{position:'relative', padding:'10px'}} elevation={4}>
                  <div className='paper-container'>
                    <img src={member.image} alt={member.name} />
                    <h1>{member.name}</h1>
                    <p>{member.desc}</p>
                    <p className='member-position'>{member.position}</p>

                    <ul className="social-icons material-icons">
                        <li><Link to='instagram/jobsydekut'><Facebook/></Link></li>
                        <li><Link to='instagram/jobsydekut'><Twitter /></Link></li>
                        <li><Link to='instagram/jobsydekut'><LinkedIn/></Link></li>
                        <li><Link to='instagram/jobsydekut'><Instagram /></Link></li>
                    </ul>

                  </div>
              </Paper>
            ))}   
        </Box>
    </div>
  )
}

export default Team