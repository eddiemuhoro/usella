
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Help from './components/help/Help';
import PrivacyPolicy from './components/help/PrivacyPolicy';
import Terms from './components/help/Terms';
import Hero from './components/home/Hero';
import Navbar from './components/navbar/Navbar';
import Cart from './components/products/cart/Cart';
import Products from './components/products/Products';
import SingleProduct from './components/products/SingleProduct';
import Post from './components/profile/post/Post';
import Profile from './components/profile/Profile';
import Email from './components/register/Verification/Email';
import Login from './components/register/Login';
import Register from './components/register/Register';
import ProductDisplay from './components/products/ProductDisplay';
import SellerProfile from './components/profile/SellerProfile';
import { ToastContainer } from 'react-toastify';
function App () {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/register" element={<Register />} />
          <Route path='/email' element={<Email />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Hero/>} />
          <Route path='/terms' element={<Terms/>} />
          <Route path='/policy' element={<PrivacyPolicy/>} />
          <Route path='/products' element={<ProductDisplay/>} />
          <Route path='/products/:id' element={<SingleProduct/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/seller/profile' element={<SellerProfile />} />
          <Route path='/profile/post' element={<Post />} />
          <Route path='/cart' element={<Cart />} />
        <Route path='/help' element={<Help />} />
        <Route path='*' element={<>404 - Not found</>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}


export default App;
