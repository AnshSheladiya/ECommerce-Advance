import React from 'react';
import './styles/global.css';
import { ThemeProvider } from './helpers/ThemeProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Register from './components/pages/Register/Register.jsx';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
