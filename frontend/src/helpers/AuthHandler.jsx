//AuthHandler.jsx
import axios from 'axios';

const authHandler = async () => {
  const user = localStorage.getItem('user');
  if (user) {
    return;
  }

  try {
    const res = await axios.get('/api/user/profile');
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export default authHandler;
