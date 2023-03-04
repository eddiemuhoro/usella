import React from 'react'

import './footer.css'

import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Footer = () => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const postJob = ()=>{
    if(!user){
        alert("log in to post job")
        navigate('/login')
        window.location.reload()
    }
}

  
  return (
    <footer>
        <div className='row footer-row'>
            <div className='contact-us'>
                <h3>CONTACT US</h3>
                <ul>
                   <li><Link onClick={postJob}  to='/jobs'>Find Job</Link> </li>

                    <li><a href="tel:+254 791849836">+254 794183313</a></li>

                    <li className="footer-space"><a
                            href="eddiemuho@gmail.com">eddiea@gmail.com</a></li>

</ul>
            </div>
           
            <div className='links'>
                 <h3>QUICK LINKS</h3>
                 <ul>
                    <li><Link to='/aboutus'>About Jobsy</Link></li>

                    <li>Impact Stories</li>

                    <li>Reports</li>

                    <li>Partners</li>

                    <li>Get involved</li>
                </ul>
            </div>
            <div className='social-media'>
              <h3>SOCIAL MEDIA</h3>
             <ul className="social-icons">
                    <li><Facebook/></li>
                    <li><Twitter /></li>
                    <li><LinkedIn/></li>
                    <li><Instagram /></li>
                </ul>

                <ul className="policy-ul">
                    <li><a href="/privacy-policy/">Privacy Policy | </a></li>
                    <li><a href="/terms-and-conditions/"> T&Cs</a></li>
                </ul>
            </div>
        </div>

       
          <a className="copyright">© JobSy 2023</a>
    </footer>
  )
}

export default Footer