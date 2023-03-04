import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
              <Link to='/post'><Button variant='contained'>Post Job</Button></Link>

    </div>
  )
}

export default Navbar