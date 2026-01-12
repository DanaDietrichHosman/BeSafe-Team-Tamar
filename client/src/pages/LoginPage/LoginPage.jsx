import { useState } from 'react';
import { useAnalysis } from '../../context/useAnalysis';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './LoginPage.module.css';
import logo from '../../assets/logo.jpg'; 

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAnalysis();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      if (res.data.success) {
        loginUser(res.data.user);
        onNavigate('home');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="BeSafe Logo" className={styles.bigLogo} />
        </div>
        
        <h2>Welcome Back</h2>
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className={styles.inputField}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className={styles.inputField}
            required 
          />
          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>
        
        <p className={styles.registerPrompt}>
          {/* תיקון השגיאה: שימוש בסימון בטוח עבור הגרש */}
          Don&apos;t have an account?{' '}
          <button 
            type="button" 
            className={styles.linkButton} 
            onClick={() => onNavigate('register')}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  onNavigate: PropTypes.func.isRequired
};

export default LoginPage;