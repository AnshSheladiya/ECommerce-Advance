import React, { useState, useEffect } from 'react';
import authHandler from '../../../helpers/AuthHandler';

const Home = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const storageListener = (event) => {
      if (event.key === 'user') {
        setUser(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', storageListener);

    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, []);

  return (
    <div>
      {user ? <p>Welcome, {user.first_name}!</p> : <p>Please log in.</p>}
    </div>
  );
};

export default Home;
