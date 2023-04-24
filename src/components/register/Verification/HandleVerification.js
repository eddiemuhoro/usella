import React from 'react'
import { Link } from 'react-router-dom';

const HandleVerification = () => {
    
    const google = JSON.parse(localStorage.getItem('google'));

  return (
    <div>
        {
            google ? <p>verify <Link to='/email'>{google.email} </Link>  which is already regestere</p> : ''
        }
    </div>
  )
}

export default HandleVerification