// App.js
import React ,{ useEffect } from 'react';
import './styles/global.css';
import { ThemeProvider } from './helpers/ThemeProvider';
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Register/Register.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ForgatPassword from './components/pages/ForgatPassword/ForgatPassword';
import Verified from './components/pages/Verified/Verified';
import AppNavbar from './components/layout/Navbar/Navbar';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
import Home from './components/pages/Home/Home.jsx';
import authHandler from './helpers/AuthHandler';
import Logout from './components/layout/Navbar/Logout';
import Navbar from './components/layout/Navbar/Navbar';


function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('user');

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

function App() {
  useEffect(() => {
    authHandler();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
      <AppNavbar/>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgat-password" element={<ForgatPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verified" element={<Verified />} />
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path="/logout" element={<PrivateRoute component={Logout} />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
