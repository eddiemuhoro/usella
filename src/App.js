
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Hero from './components/home/Hero';
import Navbar from './components/navbar/Navbar';
import Cart from './components/products/cart/Cart';
import Products from './components/products/Products';
import Post from './components/profile/post/Post';
import Profile from './components/profile/Profile';
import Login from './components/register/Login';
import Register from './components/register/Register';
function App () {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Hero/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post' element={<Post />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<>404 - Not found</>} />
      </Routes>
    </div>
  );
}


export default App;
