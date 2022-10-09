import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    try {
      await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            navigate('/');
            console.log(res);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form
            className={styles.form_container}
            onSubmit={handleSubmit}
            method="POST"
            action="http://localhost:5000/api/user/login"
          >
            <h1>Login to Your Account</h1>
            <br />
            <div className={styles.inputDiv}>
              <FaUser className={styles.icn} />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
                required
                className={styles.input}
              />
            </div>
            <br />
            <div className={styles.inputDiv}>
              <FaLock className={styles.icn} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={user.password}
                required
                className={styles.input}
              />
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <br />
          <Link to="/register">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
