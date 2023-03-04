import React, { useEffect } from 'react'
import { Email, LocationOn, Phone, WhatsApp } from '@mui/icons-material';
import Popup from 'reactjs-popup';
import { Button } from '@mui/material';
import ReactWhatsapp from 'react-whatsapp';
import axios from 'axios';

const BidPopup = () => {
    const [employer, setEmployer] = React.useState('')
    useEffect(()=>{
        axios.request('http://localhost:4000/employers')
        .then((response) => {
            setEmployer(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

            


  return (
    <div>
       
          <Popup trigger={<Button variant='contained'>Bid</Button> } modal>
          {employer && employer.map((employer)=>(
                                 <div className='bid-popup'>
                                    
                                     <h3>Connect with {employer.name}</h3>
                                     <div className='social-icon'>
                                     <Phone /><a href="tel:+254 791849836"> <span>Call</span></a> 
                                        
                                         <p>{employer.phone}</p>
                                         <ReactWhatsapp number={`+254${employer.phone}`} message={`Hello ${employer.name}`}>
                                             <WhatsApp />
                                         </ReactWhatsapp><span>WhatsApp</span>
                                     </div>
                                     </div>
                                    ))}
                             </Popup>
    </div>
  )
}

export default BidPopup