import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {AiOutlineMenu} from 'react-icons/ai';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../react-redux/features/auth/authSlice";
import {CgProfile } from 'react-icons/cg';
import {FiHelpCircle} from 'react-icons/fi';
import { getCartByUser } from "../../react-redux/features/products/productSlice";
import Cart from "../products/cart/Cart";
function Navbar() {
  const you = useSelector((state) => state.auth.you);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newCheckedValue) => {
    setIsChecked(newCheckedValue);
  };




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
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          uSella
        </NavLink>

        <div className="menu-icon" onClick={handleClick}>
          <AiOutlineMenu />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/products" className="nav-links" onClick={closeMobileMenu}>
              Products
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/help" className="nav-links" onClick={closeMobileMenu}>
              Help<FiHelpCircle style = {{marginLeft:'5px'}}/>
            </NavLink>
          </li>
          
            {
              you ? (
                <li className="nav-item">
              <NavLink to="/cart" className="nav-links" onClick={closeMobileMenu}>
                  <AiOutlineShoppingCart />
                  {loading ? (
                    <span className="badge badge-danger">Loading...</span>
                  ):(
                    <span className="badge badge-danger">{items.length}</span>
                  )}
              </NavLink>
            </li>
              ):(
                ''
              )
            }
            
          {
            you ? (
              <li className="nav-item">
                <NavLink to='/profile' onClick={closeMobileMenu}  className="nav-links" >
                  <CgProfile style={{marginRight:'9px'}} />{you.name}
                </NavLink>
              </li>
            ):
            (
              <li className="nav-item">
                <NavLink to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Login
                </NavLink>
              </li>
            )
          }
          {
            you ? (
              ' '
            ):
            (
              <li className="nav-item">
                <NavLink to="/register" className="nav-links" onClick={closeMobileMenu}>
                  Register
                </NavLink>
              </li>
            )
          }
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
