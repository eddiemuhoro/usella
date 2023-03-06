
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar';
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
      </Routes>
    </div>
  );
}


export default App;
