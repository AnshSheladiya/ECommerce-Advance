// App.js
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
import Home from './components/pages/Home/Home';
import PrivateRoute from './helpers/PrivateRoute';
import { AuthProvider } from './helpers/AuthProvider';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <AppNavbar />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgat-password" element={<ForgatPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verified" element={<Verified />} />
              <PrivateRoute path="/" element={<Home />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
