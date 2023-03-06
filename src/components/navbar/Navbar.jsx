import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {AiOutlineMenu} from 'react-icons/ai';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../react-redux/features/auth/authSlice";
import {CgProfile } from 'react-icons/cg';
function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const onLogout = ()=>{
    dispatch(logout())
    dispatch(reset())
    alert('You are now logged out')
    navigate('/login')
    window.location.reload()
}

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          MyShop
        </Link>

        <div className="menu-icon" onClick={handleClick}>
          <AiOutlineMenu />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
              <AiOutlineShoppingCart />
            </Link>
          </li>
          {
            user ? (
              <li className="nav-item">
                <Link  className="nav-links" >
                  <CgProfile /><p style={{marginLeft:'9px'}}>{user && user.firstName}</p>
                </Link>
              </li>
            ):''
          }
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
