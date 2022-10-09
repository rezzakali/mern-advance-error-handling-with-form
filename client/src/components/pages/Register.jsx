import { useState } from 'react';
import { FaLock, FaMobile, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cPassword: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cPassword } = user;

    if (password !== cPassword) {
      window.alert('Password mismatched!');
    }
    try {
      await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password, cPassword }),
      })
        .then((res) => {
          if (res.status === 201) {
            navigate('/login');
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <br />
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Login
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            className={styles.form_container}
            onSubmit={handleSubmit}
            method="POST"
            action="http://localhost:5000/api/user/register"
          >
            <h1>Create Account</h1>
            <br />
            <div className={styles.inputDiv}>
              <FaUser className={styles.icn} />
              <input
                type="text"
                placeholder="First Name"
                name="name"
                onChange={handleChange}
                value={user.name}
                required
                className={styles.input}
              />
            </div>
            <br />
            <div className={styles.inputDiv}>
              <FaMobile className={styles.icn} />
              <input
                type="text"
                placeholder="phone"
                name="phone"
                onChange={handleChange}
                value={user.phone}
                required
                className={styles.input}
              />
            </div>
            <br />
            <div className={styles.inputDiv}>
              <MdEmail className={styles.icn} />
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
            <br />
            <div className={styles.inputDiv}>
              <FaLock className={styles.icn} />

              <input
                type="password"
                placeholder="confirm password"
                name="cPassword"
                onChange={handleChange}
                value={user.cPassword}
                required
                className={styles.input}
              />
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
