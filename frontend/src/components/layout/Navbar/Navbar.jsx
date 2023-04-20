import React from 'react';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#"><img src="logo.png" alt="Logo"></img></a>
      </div>
      <div className="search">
        <form>
          <input type="text" placeholder="Search..."/>
          <button type="submit"><FaSearch/></button>
        </form>
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
