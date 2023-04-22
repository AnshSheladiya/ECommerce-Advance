import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {loggedIn ? (
          <Link to="/habits" className="navbar-brand">
            Sigma
          </Link>
        ) : (
          <Link to="/login" className="navbar-brand">
            Logo
          </Link>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav" className={collapsed ? 'collapse' : ''}>
          <Nav className="me-auto">
            {loggedIn && (
              <>
                <Link to="/create" className="nav-link">
                  Create Habit
                </Link>
                <Link to="/sleeptracker" className="nav-link">
                  SleepTracker
                </Link>
              </>
            )}
          </Nav>
          <Nav>

                <Link to="/register" className="nav-link">
                  Register
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
