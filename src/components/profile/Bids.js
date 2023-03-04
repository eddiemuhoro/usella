import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import {BsFilterSquare} from 'react-icons/bs'
import './profile.css'
import { Button, Paper } from '@mui/material'
import Chat from './Chat'
const Bids = ({job}) => {
    const [bids, setBids] = React.useState([])
    console.log(`job:${job}`);
        
     useEffect(()=>{
        axios.request(`https://real-rose-millipede-veil.cyclic.app/bid/job/${job}`)
        .then((response) => {
            setBids(response.data);
            console.log(`data:${response.data}`);
        }
        ).catch((error) => {
            console.log(error);
        })
     },[])

  
        const [show, setShow] = React.useState(false)
        const handleShow = () => {
            setShow(!show)
        }

        console.log(show);
 
    
    
  return (
    <div>
        <button onClick={handleShow} style={{backgroundColor:'green', color:'white'}}>{show ? `Close`: `view bids`}</button>
        <div className='filters' style={{display:show ? 'block' : 'none'}}>
            <h3>Filters</h3>
            <ul>
                
                <li>Delivery time</li>
                <li>Rating</li>
                <li>Price</li>


            </ul>
        </div>
        {bids.map((bid) =>  {return (
            <div key={bid.id}>
            <div  style={{display:show ? 'block' : 'none'}}>
                <Paper style={{backgroundColor:"#f5f5f5"}}   sx={{position:'relative', padding:'10px', m:1}} elevation={4} >
                     <div className=''>
                     
                     <header className='bid-header'>
                            <img src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar' className='avatar'/>
                            <div className='bid-header-text'>
                                <h3>{bid.name}</h3>
                                <p>eddie@gmail.com</p>
                            </div>
                     </header>
                     <div>
                     <p>{bid.description}
                            {/* Thank you for taking the time to read our proposal. I have more than 3 years of experience of PHP, Laravel, Node.js, React.js, Vue.js and ASP.NET. I am confident to complete work perfectly. I wanna discuss more for this project via chatting. Desperatly looking forward for your response.
                                Chat
                                Award */}
                            </p>
                     </div>
                     <section style={{display:'flex', justifyContent:'space-between'}}>

                        <div style={{display:'flex', justifyContent:'flex-end'}} >
                            <Button style={{backgroundColor:'green', }} variant='contained' >Award</Button>
                        </div>
                        <Chat bid={bid.id} employee={bid.belongToEmployee}/>
                     </section>
                 </div>
             </Paper>
            </div>
            
            </div>
            

        )})}
       
    </div>
  )
}

export default Bids