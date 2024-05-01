import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import styles from '../../styles/Login.module.css';


function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        if (error) setError(''); // Clear error when the user updates input
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            navigate('/dashboard', { state: { message: 'Login successful' } });
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Failed to login');
            } else {
                setError('Login service is currently unavailable. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={styles.inputField}
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className={styles.inputField}
                />
                <button type="submit" className={styles.submitButton}>Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}

export default Login;