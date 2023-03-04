import { Button } from '@mui/material';
import { BrowserRouter, Link,  Route, Routes } from 'react-router-dom';import './App.css';
import Display from './components/Display';
import Mui from './components/Mui';
import Navbar from './components/Navbar';
import Post from './components/Post';
import SignUp from './components/authenticatioin/SignUp'
import Login from './components/authenticatioin/login';
import Home from './components/homePage/Home';
import HomeNavBar from './components/homePage/HomeNavBar';
import Footer from './components/Footer/Jfooter';
import AboutUs from './components/about/AboutUs';
import Team from './components/about/Team';
import Spinner from './components/Spinner/Spinner';
import Profile from './components/profile/Profile';
import SocialMedia from './components/SocialMedia/Instagram';
import RegisterEmployer from './components/authenticatioin/RegisterEmployer';
import LoginEmployer from './components/authenticatioin/LoginEmployer';
import Joinas from './components/authenticatioin/Joinas';
import SingleJob from './components/homePage/categories/SingleJob';
import Apply from './components/homePage/categories/Apply';
import { useState } from 'react';



function App() {
  const [theme, setTheme]= useState('white')
  const handleClick = () => {
    theme === 'white' ? setTheme('dark') : setTheme('white');
  }
  return (
    <div className= {theme === 'white' ? 'App' : 'dark'} >
    {/* <Button onClick={handleClick} style={{position:'absolute',zIndex:'999', bottom:"0%", right:'0%', backgroundColor: theme === 'white' ? 'white' : 'black',  color: theme === 'white' ? 'black' : 'white' }}>{theme === 'white'?<WbSunny/>: <ModeNight/>}</Button> */}
        <Routes>
          <Route path='/jobs' element={<><Mui /><Footer/>  </>} />
          <Route path='/post' element={<> <Post /><Footer/>  </>} theme={theme} />
          <Route path='/' element={<><Home /><Footer/> </>} />
          <Route path='/aboutus' element={<><HomeNavBar/><AboutUs/><Footer/>  </>} />
          <Route path='/directors' element={<><HomeNavBar/><Team /><Footer/> </>} />
          <Route path='/myprofile' element={<><HomeNavBar/><Profile /><Footer/> </>} />
          <Route path='/joinas' element={<><Joinas /></>} />
          <Route path='/register' element={<><SignUp /></>} />
          <Route path='/registerEmployer' element={<><RegisterEmployer/></>} />
          <Route path='/loginEmployer' element={<><LoginEmployer /></>} />
          <Route path='/login' element={<><Login /></>} />
          <Route path='aboutus/instagram/jobsydekut' element={<SocialMedia />} />
          <Route path='/job/:id' element={<SingleJob />} />
          <Route path='job/:id/apply' element={<Apply />} />
        </Routes>

  </div>
  );
}

export default App;
