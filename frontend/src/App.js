import React from 'react';
import './styles/global.css';
import { ThemeProvider } from './helpers/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Register/Register.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ForgatPassword from './components/pages/ForgatPassword/ForgatPassword';
import Verified from './components/pages/Verified/Verified';
import AppNavbar from './components/layout/Navbar/Navbar';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
// import ResetPassword from './components/pages/ResetPassword/ResetPassword';
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
        <AppNavbar/>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgat-password" element={<ForgatPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verified" element={<Verified />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
