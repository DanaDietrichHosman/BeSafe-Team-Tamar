import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './RegisterPage.module.css';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Sending data to your unified server
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      
      if (res.data.success) {
        alert("Registration successful! You can now log in.");
        onNavigate('login'); 
      }
    } catch (err) {
      // Showing the English error message from the controller
      alert(err.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            onChange={handleChange} 
            className={styles.input}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            onChange={handleChange} 
            className={styles.input}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            onChange={handleChange} 
            className={styles.input}
            required 
          />
          <button type="submit" className={styles.btn}>Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <span 
            className={styles.linkText} 
            onClick={() => onNavigate('login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default RegisterPage;