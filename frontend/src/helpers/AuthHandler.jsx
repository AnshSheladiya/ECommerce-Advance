//AuthHandler.jsx
import axios from 'axios';

const authHandler = async () => {
    try {
    localStorage.removeItem("user");
    const res = await axios.get('/api/user/profile');
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data.data));
    }
    const user = localStorage.getItem('user');
  if (user) {
    return;
  }
  } catch (err) {
    console.log(err);
  }
};

export default authHandler;
