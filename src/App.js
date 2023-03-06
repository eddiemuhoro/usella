
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Login from './components/register/Login';
import Register from './components/register/Register';
function App () {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<>Home page here</>} />
        <Route path='/products' element={<Products/>} />
        <Route path='*' element={<>404 - Not found</>} />
      </Routes>
    </div>
  );
}


export default App;
