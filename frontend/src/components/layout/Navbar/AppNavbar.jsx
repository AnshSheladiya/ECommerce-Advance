import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AppNavbar.css'; // Import the CSS file for styling
import BottomAppBar from './BottomAppBar'; // Import the provided sample app bar

import { useTheme, useMediaQuery } from '@material-ui/core';

function AppNavbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isMobile ? (
        <BottomAppBar />
      ) : (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
            <Navbar.Collapse id="basic-navbar-nav" className={collapsed ? 'collapse' : ''}>
              <Nav className="mr-auto">
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
              </Nav>
              <Nav className="ml-auto">
                  <>
                    <Link to="/account" className="nav-link">
                      Account
                    </Link>
                    <Link to="/logout" className="nav-link">
                      Logout
                    </Link>
                  </>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default AppNavbar;
