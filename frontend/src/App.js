import React from 'react';
import './styles/global.css';
import { ThemeProvider } from './helpers/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Register/Register.jsx';
import 'react-toastify/dist/ReactToastify.css';
import ForgatPassword from './components/pages/ForgatPassword/ForgatPassword';
import Verified from './components/pages/Verified/Verified';
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgat-password" element={<ForgatPassword />} />
            <Route path="/verified" element={<Verified />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
