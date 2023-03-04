import { Circle, CircleOutlined, CircleRounded, Work } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/joinas.css'
const Joinas = () => {
    const [client, setClient] = React.useState(false)
    const [freelancer, setFreelancer] = React.useState(false)

    const handleClient = () => {
        setClient(true)
        setFreelancer(false)
    }

    console.log(client, freelancer)

    const handleFreelancer = () => {
        setFreelancer(true)
        setClient(false)
    }
  return (
    <div className='join-container' >
        <div className='join-wrapper'>
            <h1>Join as client or freelancer</h1>
            <div className='join-items'>
                <div onClick={handleClient} className={client ? 'item client': 'item'}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:"flex-start"}}>
                        <Work/>
                       {client? <CircleRounded style={{color:'green'}}/> : <CircleOutlined/>}
                    </div>
                    <p>I'm a client, hiring for a project</p>
                </div>

                <div onClick={handleFreelancer} className={freelancer ? 'item client': 'item'}>
                     <div style={{display:'flex', justifyContent:'space-between', alignItems:"flex-start"}}>
                        <Work/>
                        {freelancer? <CircleRounded style={{color:'green'}}/> : <CircleOutlined/>}
                    </div>
                    <p>I'm a freelancer looking for work</p>
                </div>
            </div>
            <div className='join-btn-wrapper'>
            <div className='join-btn'>
                {client && <Link to='/registerEmployer' >Join as client</Link>}
                {freelancer && <Link to='/register'>Join as freelancer</Link>}

                {!client && !freelancer && <Button variant="outlined" disabled>Create Account</Button>}

            </div>

            <p>Already have an account? <Link style={{color:'green', textDecoration:"underline"}} to='/login'>Login</Link> </p>
            </div>
        
        </div>
    </div>
  )
}

export default Joinas